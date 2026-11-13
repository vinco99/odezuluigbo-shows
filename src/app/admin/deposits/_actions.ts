"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { z } from "zod";
import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { checkRefundable, processRefund, RefundBlocked } from "@/lib/refunds";

const OTP_TTL_MS = 10 * 60 * 1000;   // code valid for 10 minutes
const OTP_RESEND_MS = 60 * 1000;     // at most one code per minute per payment
const OTP_MAX_ATTEMPTS = 5;
const FROM = "Odezuluigbo <security@notifications.odezuluigbo.com>";

type Result<T = object> = ({ ok: true } & T) | { ok: false; error: string };

function hashCode(otpId: string, code: string) {
    return crypto
        .createHmac("sha256", process.env.AUTH_SECRET ?? "refund-otp")
        .update(`${otpId}:${code}`)
        .digest("hex");
}

function maskEmail(email: string) {
    const [name, domain] = email.split("@");
    return `${name.slice(0, 2)}${"*".repeat(Math.max(1, name.length - 2))}@${domain}`;
}

const RequestInput = z.object({
    paymentId: z.string().min(1),
    reason: z.string().trim().min(5, "Give a reason of at least 5 characters.").max(300),
});

/** Step 1: check the deposit can be refunded, then email the admin a 6-digit code. */
export async function requestRefundOtp(paymentId: string, reason: string): Promise<Result<{ sentTo: string }>> {
    const session = await requireRole(["ADMIN"], "/");
    const parsed = RequestInput.safeParse({ paymentId, reason });
    if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };

    const admin = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, email: true, role: true, suspended: true },
    });
    if (!admin || admin.role !== "ADMIN" || admin.suspended) return { ok: false, error: "Not allowed." };

    let payment;
    try {
        payment = await checkRefundable(parsed.data.paymentId);
    } catch (err) {
        if (err instanceof RefundBlocked) return { ok: false, error: err.message };
        throw err;
    }

    const recent = await prisma.refundOtp.findFirst({
        where: { adminId: admin.id, paymentId: payment.id, createdAt: { gt: new Date(Date.now() - OTP_RESEND_MS) } },
        select: { id: true },
    });
    if (recent) return { ok: false, error: "A code was just sent. Wait a minute before asking for another." };

    // Only the newest code for this admin + payment is valid.
    await prisma.refundOtp.updateMany({
        where: { adminId: admin.id, paymentId: payment.id, usedAt: null },
        data: { usedAt: new Date() },
    });

    const code = crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
    const otp = await prisma.refundOtp.create({
        data: {
            adminId: admin.id,
            paymentId: payment.id,
            codeHash: "",
            reason: parsed.data.reason,
            expiresAt: new Date(Date.now() + OTP_TTL_MS),
        },
    });
    await prisma.refundOtp.update({ where: { id: otp.id }, data: { codeHash: hashCode(otp.id, code) } });

    const amount = `₦${Number(payment.amount).toLocaleString()}`;
    const customer = payment.user?.name || payment.user?.email || "a customer";
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
        from: FROM,
        to: admin.email,
        subject: `Refund confirmation code: ${amount}`,
        html: `
          <div style="font-family:sans-serif;max-width:440px;margin:0 auto">
            <h2>Confirm refund</h2>
            <p>You asked to refund <strong>${amount}</strong> to ${escapeHtml(customer)}
               (${payment.type.replaceAll("_", " ").toLowerCase()}, ref <code>${escapeHtml(payment.reference)}</code>).</p>
            <p>Reason: ${escapeHtml(parsed.data.reason)}</p>
            <p>Your confirmation code is:</p>
            <h1 style="background:#f4f4f4;padding:10px;text-align:center;letter-spacing:6px">${code}</h1>
            <p>It expires in 10 minutes. If you didn't ask for this refund, don't share the code. Someone may be using your admin account.</p>
          </div>`,
    });
    if (error) {
        console.error("requestRefundOtp: email failed", error);
        await prisma.refundOtp.update({ where: { id: otp.id }, data: { usedAt: new Date() } });
        return { ok: false, error: "Couldn't send the confirmation email. Try again." };
    }

    return { ok: true, sentTo: maskEmail(admin.email) };
}

const ConfirmInput = z.object({
    paymentId: z.string().min(1),
    code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code."),
});

/** Step 2: check the code, then run the refund. */
export async function confirmRefund(paymentId: string, code: string): Promise<Result<{ message: string }>> {
    const session = await requireRole(["ADMIN"], "/");
    const parsed = ConfirmInput.safeParse({ paymentId, code });
    if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };

    const otp = await prisma.refundOtp.findFirst({
        where: { adminId: session.user.id, paymentId: parsed.data.paymentId, usedAt: null },
        orderBy: { createdAt: "desc" },
    });
    if (!otp || otp.expiresAt < new Date()) {
        return { ok: false, error: "This code has expired. Request a new one." };
    }
    if (otp.attempts >= OTP_MAX_ATTEMPTS) {
        return { ok: false, error: "Too many wrong attempts. Request a new code." };
    }

    const expected = Buffer.from(otp.codeHash, "hex");
    const given = Buffer.from(hashCode(otp.id, parsed.data.code), "hex");
    if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) {
        const updated = await prisma.refundOtp.update({
            where: { id: otp.id },
            data: { attempts: { increment: 1 } },
            select: { attempts: true },
        });
        const left = OTP_MAX_ATTEMPTS - updated.attempts;
        return { ok: false, error: left > 0 ? `Wrong code. ${left} attempt${left === 1 ? "" : "s"} left.` : "Too many wrong attempts. Request a new code." };
    }

    // Burn the code exactly once (guards against double-submit).
    const burned = await prisma.refundOtp.updateMany({
        where: { id: otp.id, usedAt: null },
        data: { usedAt: new Date() },
    });
    if (burned.count !== 1) return { ok: false, error: "This code was already used." };

    const outcome = await processRefund({
        paymentId: parsed.data.paymentId,
        adminId: session.user.id,
        reason: otp.reason,
    });

    revalidatePath("/admin/deposits");
    revalidatePath("/admin/payments");
    return outcome.ok ? { ok: true, message: outcome.message } : { ok: false, error: outcome.error };
}

function escapeHtml(s: string) {
    return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
