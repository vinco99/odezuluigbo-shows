import "server-only";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

/**
 * Full refunds for Paystack deposits.
 *
 * Order of operations (money safety first):
 *   1. In one DB transaction: claim the payment (one Refund row per payment)
 *      and take back what the payment bought — credits, ticket, vote,
 *      contestant slot. If that can't be done (credits already spent,
 *      ticket already used) nothing is refunded.
 *   2. Ask Paystack to refund the transaction.
 *   3. Paystack said yes → payment REFUNDED, refund PENDING/PROCESSED.
 *      Paystack said no  → put everything back, refund FAILED (retryable).
 *      No clear answer   → leave PROCESSING; the refund.* webhook settles it.
 */

type Tx = Prisma.TransactionClient;

export type Reversal =
    | { kind: "CREDITS"; userId: string; credits: number }
    | { kind: "TICKET"; ticketId: string; previousStatus: string }
    | { kind: "VOTE"; voteId: string; previousStatus: string }
    | { kind: "CONTESTANT"; contestantId: string; previousStatus: string }
    | { kind: "NONE" };

export class RefundBlocked extends Error {}

const paymentForRefund = {
    include: {
        refund: true,
        ticket: { select: { id: true, status: true } },
        contestant: { select: { id: true, applicationStatus: true } },
        user: { select: { id: true, name: true, email: true, creditBalance: true } },
    },
} satisfies Prisma.PaymentDefaultArgs;

type PaymentForRefund = Prisma.PaymentGetPayload<typeof paymentForRefund>;

async function creditsBought(db: Tx | typeof prisma, reference: string) {
    const tx = await db.creditTransaction.findFirst({
        where: { reference, type: "PURCHASE", status: "COMPLETED" },
        select: { amount: true },
    });
    return tx?.amount ?? null;
}

/**
 * Read-only check used before an OTP is sent, so the admin isn't emailed a
 * code for a refund that can't go through.
 */
export async function checkRefundable(paymentId: string) {
    const payment = await prisma.payment.findUnique({ where: { id: paymentId }, ...paymentForRefund });
    if (!payment) throw new RefundBlocked("Payment not found.");
    assertRefundableStatus(payment);

    if (payment.type === "CREDIT_PURCHASE") {
        const credits = await creditsBought(prisma, payment.reference);
        if (credits == null) throw new RefundBlocked("Couldn't find the credits this payment bought.");
        const balance = payment.user?.creditBalance ?? 0;
        if (balance < credits) {
            throw new RefundBlocked(
                `The user has already spent some of these credits (bought ${credits}, balance ${balance}). Refund blocked.`,
            );
        }
    }
    if (payment.type === "EVENT_TICKET" && payment.ticket?.status === "CHECKED_IN") {
        throw new RefundBlocked("This ticket has already been used at check-in.");
    }
    return payment;
}

function assertRefundableStatus(payment: PaymentForRefund) {
    if (payment.status !== "PAID") {
        throw new RefundBlocked(`Only paid deposits can be refunded (this one is ${payment.status.toLowerCase()}).`);
    }
    if (payment.refund && payment.refund.status !== "FAILED") {
        throw new RefundBlocked(`A refund already exists for this payment (${payment.refund.status.toLowerCase()}).`);
    }
    if (Number(payment.amount) <= 0) throw new RefundBlocked("Nothing to refund on a zero-amount payment.");
}

/** Take back what the payment bought. Throws RefundBlocked if it can't. */
async function reverse(db: Tx, payment: PaymentForRefund): Promise<Reversal> {
    switch (payment.type) {
        case "CREDIT_PURCHASE": {
            if (!payment.userId) throw new RefundBlocked("Payment has no user.");
            const credits = await creditsBought(db, payment.reference);
            if (credits == null) throw new RefundBlocked("Couldn't find the credits this payment bought.");
            const taken = await db.user.updateMany({
                where: { id: payment.userId, creditBalance: { gte: credits } },
                data: { creditBalance: { decrement: credits } },
            });
            if (taken.count === 0) {
                throw new RefundBlocked("The user has already spent some of these credits. Refund blocked.");
            }
            await db.creditTransaction.create({
                data: {
                    userId: payment.userId,
                    amount: -credits,
                    type: "REFUND",
                    title: `Refunded ${credits} vote credit${credits === 1 ? "" : "s"}`,
                    detail: `₦${Number(payment.amount).toLocaleString()} returned · ref ${payment.reference}`,
                    reference: payment.reference,
                    status: "COMPLETED",
                },
            });
            return { kind: "CREDITS", userId: payment.userId, credits };
        }
        case "EVENT_TICKET": {
            const ticket = payment.ticket;
            if (!ticket) return { kind: "NONE" };
            if (ticket.status === "CHECKED_IN") throw new RefundBlocked("This ticket has already been used at check-in.");
            await db.ticket.update({ where: { id: ticket.id }, data: { status: "REFUNDED" } });
            return { kind: "TICKET", ticketId: ticket.id, previousStatus: ticket.status };
        }
        case "VOTE": {
            const vote = await db.vote.findUnique({ where: { reference: payment.reference }, select: { id: true, status: true } });
            if (!vote) return { kind: "NONE" };
            await db.vote.update({ where: { id: vote.id }, data: { status: "REFUNDED" } });
            return { kind: "VOTE", voteId: vote.id, previousStatus: vote.status };
        }
        case "CONTESTANT_REGISTRATION": {
            const c = payment.contestant;
            if (!c) return { kind: "NONE" };
            await db.contestant.update({ where: { id: c.id }, data: { applicationStatus: "REJECTED" } });
            return { kind: "CONTESTANT", contestantId: c.id, previousStatus: c.applicationStatus };
        }
        default:
            return { kind: "NONE" };
    }
}

/** Undo `reverse` after Paystack refused or failed the refund. */
async function restore(db: Tx, reversal: Reversal, reference: string) {
    switch (reversal.kind) {
        case "CREDITS":
            await db.user.update({
                where: { id: reversal.userId },
                data: { creditBalance: { increment: reversal.credits } },
            });
            await db.creditTransaction.create({
                data: {
                    userId: reversal.userId,
                    amount: reversal.credits,
                    type: "ADJUSTMENT",
                    title: `Refund failed — ${reversal.credits} credit${reversal.credits === 1 ? "" : "s"} returned`,
                    detail: `ref ${reference}`,
                    reference,
                    status: "COMPLETED",
                },
            });
            return;
        case "TICKET":
            await db.ticket.update({
                where: { id: reversal.ticketId },
                data: { status: reversal.previousStatus as "PENDING" | "VALID" },
            });
            return;
        case "VOTE":
            await db.vote.update({
                where: { id: reversal.voteId },
                data: { status: reversal.previousStatus as "PAID" },
            });
            return;
        case "CONTESTANT":
            await db.contestant.update({
                where: { id: reversal.contestantId },
                data: { applicationStatus: reversal.previousStatus as "PENDING" | "APPROVED" | "REJECTED" },
            });
            return;
    }
}

type PaystackRefundResult =
    | { outcome: "accepted"; refundId: string | null; status: string | null }
    | { outcome: "rejected"; message: string }
    | { outcome: "unknown"; message: string };

async function paystackRefund(reference: string, amountNaira: number, note: string): Promise<PaystackRefundResult> {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) return { outcome: "rejected", message: "PAYSTACK_SECRET_KEY is not configured." };

    let res: Response;
    try {
        res = await fetch("https://api.paystack.co/refund", {
            method: "POST",
            headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                transaction: reference,
                amount: Math.round(amountNaira * 100), // kobo
                merchant_note: note.slice(0, 200),
            }),
            cache: "no-store",
            signal: AbortSignal.timeout(20_000),
        });
    } catch (err) {
        console.error("paystackRefund: request failed", { reference, err });
        return { outcome: "unknown", message: "Couldn't reach Paystack. Check the Paystack dashboard before retrying." };
    }

    const body = (await res.json().catch(() => null)) as
        | { status?: boolean; message?: string; data?: { id?: number | string; status?: string } }
        | null;

    if (res.ok && body?.status) {
        const id = body.data?.id;
        return { outcome: "accepted", refundId: id != null ? String(id) : null, status: body.data?.status ?? null };
    }
    if (res.status >= 500 || !body) {
        return { outcome: "unknown", message: body?.message ?? `Paystack returned HTTP ${res.status}.` };
    }
    return { outcome: "rejected", message: body.message ?? `Paystack refused the refund (HTTP ${res.status}).` };
}

export type RefundOutcome =
    | { ok: true; status: "PENDING" | "PROCESSED" | "PROCESSING"; message: string }
    | { ok: false; error: string };

export async function processRefund(input: { paymentId: string; adminId: string; reason: string }): Promise<RefundOutcome> {
    // ---- 1. Claim + reverse locally --------------------------------------
    let claimed: { refundId: string; reference: string; amount: number; reversal: Reversal };
    try {
        claimed = await prisma.$transaction(
            async (db) => {
                const payment = await db.payment.findUnique({ where: { id: input.paymentId }, ...paymentForRefund });
                if (!payment) throw new RefundBlocked("Payment not found.");
                assertRefundableStatus(payment);

                const reversal = await reverse(db, payment);
                const data = {
                    amount: payment.amount,
                    reason: input.reason,
                    status: "PROCESSING" as const,
                    requestedById: input.adminId,
                    reversal: reversal as Prisma.InputJsonValue,
                    failureReason: null,
                    paystackRefundId: null,
                    processedAt: null,
                };

                let refundId: string;
                if (payment.refund) {
                    // Retry after a failed attempt — only if it's still FAILED.
                    const retried = await db.refund.updateMany({
                        where: { id: payment.refund.id, status: "FAILED" },
                        data,
                    });
                    if (retried.count !== 1) throw new RefundBlocked("Another refund for this payment is already in progress.");
                    refundId = payment.refund.id;
                } else {
                    // paymentId is unique, so a concurrent second claim fails here.
                    refundId = (await db.refund.create({ data: { ...data, paymentId: payment.id } })).id;
                }
                return { refundId, reference: payment.reference, amount: Number(payment.amount), reversal };
            },
            { isolationLevel: "Serializable" },
        );
    } catch (err) {
        if (err instanceof RefundBlocked) return { ok: false, error: err.message };
        const code = (err as { code?: string })?.code;
        if (code === "P2002" || code === "P2034") {
            return { ok: false, error: "Another refund for this payment is already in progress." };
        }
        console.error("processRefund: claim failed", err);
        return { ok: false, error: "Couldn't start the refund. Nothing was changed." };
    }

    // ---- 2. Paystack ------------------------------------------------------
    const result = await paystackRefund(claimed.reference, claimed.amount, input.reason);

    // ---- 3. Settle ----------------------------------------------------------
    if (result.outcome === "accepted") {
        const status = result.status === "processed" ? "PROCESSED" : "PENDING";
        await prisma.$transaction([
            prisma.payment.update({ where: { id: input.paymentId }, data: { status: "REFUNDED" } }),
            prisma.refund.update({
                where: { id: claimed.refundId },
                data: {
                    status,
                    paystackRefundId: result.refundId,
                    processedAt: status === "PROCESSED" ? new Date() : null,
                },
            }),
        ]);
        return {
            ok: true,
            status,
            message:
                status === "PROCESSED"
                    ? "Refund completed."
                    : "Paystack accepted the refund. The money usually reaches the customer within a few working days.",
        };
    }

    if (result.outcome === "rejected") {
        await prisma.$transaction(async (db) => {
            await restore(db, claimed.reversal, claimed.reference);
            await db.refund.update({
                where: { id: claimed.refundId },
                data: { status: "FAILED", failureReason: result.message },
            });
        });
        return { ok: false, error: `Paystack refused the refund: ${result.message} Nothing was changed for the user.` };
    }

    // Unknown: Paystack may or may not have queued it. Don't undo anything
    // and don't allow a retry until the webhook (or a human) settles it.
    await prisma.refund.update({
        where: { id: claimed.refundId },
        data: { failureReason: result.message },
    });
    return {
        ok: true,
        status: "PROCESSING",
        message: `${result.message} The refund is marked as processing and will update when Paystack reports back.`,
    };
}

/**
 * Handle Paystack `refund.*` webhooks. Matches the refund by Paystack's
 * refund id, falling back to the original transaction reference.
 */
export async function applyRefundWebhook(event: string, data: Record<string, unknown>) {
    const refundIdRaw = data.id ?? data.refund_reference;
    const paystackRefundId = refundIdRaw != null ? String(refundIdRaw) : null;
    const txn = data.transaction as { reference?: string } | undefined;
    const reference =
        (typeof data.transaction_reference === "string" && data.transaction_reference) ||
        (typeof txn?.reference === "string" && txn.reference) ||
        null;

    const refund = await prisma.refund.findFirst({
        where: {
            OR: [
                ...(paystackRefundId ? [{ paystackRefundId }] : []),
                ...(reference ? [{ payment: { reference } }] : []),
            ],
        },
        include: { payment: { select: { id: true, reference: true } } },
    });
    if (!refund) {
        console.warn("applyRefundWebhook: no matching refund", { event, paystackRefundId, reference });
        return;
    }

    if (event === "refund.processed") {
        if (refund.status === "PROCESSED") return;
        await prisma.$transaction([
            prisma.payment.update({ where: { id: refund.paymentId }, data: { status: "REFUNDED" } }),
            prisma.refund.update({
                where: { id: refund.id },
                data: {
                    status: "PROCESSED",
                    processedAt: new Date(),
                    failureReason: null,
                    paystackRefundId: refund.paystackRefundId ?? paystackRefundId,
                },
            }),
        ]);
        return;
    }

    if (event === "refund.failed") {
        if (refund.status === "FAILED" || refund.status === "PROCESSED") return;
        await prisma.$transaction(async (db) => {
            // Only restore once: flip to FAILED first, guarded on the current status.
            const flipped = await db.refund.updateMany({
                where: { id: refund.id, status: { in: ["PROCESSING", "PENDING"] } },
                data: { status: "FAILED", failureReason: "Paystack reported the refund as failed." },
            });
            if (flipped.count !== 1) return;
            if (refund.reversal) await restore(db, refund.reversal as Reversal, refund.payment.reference);
            await db.payment.update({ where: { id: refund.paymentId }, data: { status: "PAID" } });
        });
        return;
    }

    // refund.pending / refund.processing: record Paystack's id and that it was accepted.
    if (refund.status === "PROCESSING") {
        await prisma.$transaction([
            prisma.payment.update({ where: { id: refund.paymentId }, data: { status: "REFUNDED" } }),
            prisma.refund.update({
                where: { id: refund.id },
                data: { status: "PENDING", failureReason: null, paystackRefundId: refund.paystackRefundId ?? paystackRefundId },
            }),
        ]);
    }
}
