import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

type PaystackVerify = {
  status: boolean;
  message?: string;
  data?: {
    status: string;   // "success" | "failed" | "abandoned"
    amount: number;   // kobo
    reference: string;
    metadata?: Record<string, unknown>;
  };
};

/**
 * Verify a Paystack reference and, if valid, create the ticket.
 * Safe to call multiple times with the same reference.
 */
export async function fulfillTicket(reference: string) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    console.error("fulfillTicket: PAYSTACK_SECRET_KEY missing");
    return null;
  }

  // ---- 1. Verify with Paystack ------------------------------------------
  let payload: PaystackVerify;
  try {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${secret}` },
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.warn("fulfillTicket: paystack HTTP error", {
        reference,
        status: res.status,
      });
      return null;
    }
    payload = (await res.json()) as PaystackVerify;
  } catch (err) {
    console.error("fulfillTicket: paystack fetch threw", err);
    return null;
  }

  if (!payload.status || payload.data?.status !== "success") {
    console.warn("fulfillTicket: payment not successful", {
      reference,
      status: payload.data?.status,
    });
    return null;
  }

  const tx = payload.data;
  const meta = (tx.metadata ?? {}) as Record<string, unknown>;

  if (meta.type !== "EVENT_TICKET") {
    console.warn("fulfillTicket: wrong payment kind", {
      reference,
      type: meta.type,
    });
    return null;
  }

  const packageId   = typeof meta.packageId   === "string" ? meta.packageId   : null;
  const eventId     = typeof meta.eventId     === "string" ? meta.eventId     : null;
  const holderName  = typeof meta.holderName  === "string" ? meta.holderName  : null;
  const holderEmail = typeof meta.holderEmail === "string" ? meta.holderEmail : null;
  const holderPhone = typeof meta.holderPhone === "string" ? meta.holderPhone : null;
  const buyerId     = typeof meta.buyerId     === "string" ? meta.buyerId     : null;

  if (!packageId || !eventId || !holderName || !holderEmail || !holderPhone) {
    console.warn("fulfillTicket: incomplete metadata", { reference, meta });
    return null;
  }

  // ---- 2. Idempotency: already created? ---------------------------------
  const existing = await prisma.payment.findUnique({
    where: { reference },
    include: { ticket: true },
  });
  if (existing?.ticket) return existing.ticket;

  // ---- 3. Reload package + event from DB --------------------------------
  const pkg = await prisma.ticketPackage.findUnique({
    where: { id: packageId },
    include: { event: { select: { id: true, status: true } } },
  });

  if (!pkg || pkg.eventId !== eventId) {
    console.warn("fulfillTicket: package/event mismatch", {
      reference,
      packageId,
      eventId,
    });
    return null;
  }
  if (!pkg.active) {
    console.warn("fulfillTicket: package inactive", { reference, packageId });
    return null;
  }
  if (pkg.event.status !== "LIVE") {
    console.warn("fulfillTicket: event not LIVE", {
      reference,
      status: pkg.event.status,
    });
    return null;
  }

  // ---- 4. Amount check --------------------------------------------------
  const paidAmount = tx.amount / 100;
  if (Math.abs(paidAmount - Number(pkg.price)) > 0.01) {
    console.warn("fulfillTicket: amount mismatch", {
      reference,
      paid: paidAmount,
      expected: Number(pkg.price),
    });
    return null;
  }

  // ---- 5. Atomic create with capacity re-check --------------------------
  try {
    return await prisma.$transaction(async (db) => {
      if (pkg.maxQuantity !== null) {
        const sold = await db.ticket.count({
          where: {
            packageId: pkg.id,
            status: { in: ["VALID", "CHECKED_IN"] },
          },
        });
        if (sold >= pkg.maxQuantity) {
          throw new Error("SOLD_OUT");
        }
      }

      const buyerId =
        typeof meta.buyerId === "string" && meta.buyerId.length > 0
          ? meta.buyerId
          : undefined;

      const payment = await db.payment.create({
        data: {
          reference,
          amount: paidAmount,
          type: "EVENT_TICKET",
          status: "PAID",
          userId: buyerId,
          eventId,
        },
      });

      return db.ticket.create({
        data: {
          code: randomBytes(16).toString("hex"),
          holderName,
          holderEmail,
          holderPhone,
          packageId: pkg.id,
          eventId,
          paymentId: payment.id,
          buyerId,
          status: "VALID",
        },
      });
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    const code = (err as { code?: string })?.code;

    if (msg === "SOLD_OUT") {
      console.warn("fulfillTicket: sold out", { reference });
      return null;
    }

    // Parallel callback/webhook already created it.
    if (code === "P2002") {
      const won = await prisma.payment.findUnique({
        where: { reference },
        include: { ticket: true },
      });
      return won?.ticket ?? null;
    }

    throw err;
  }
}