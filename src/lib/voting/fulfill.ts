import { prisma } from "@/lib/prisma";

type PaystackVerify = {
  status: boolean;
  data?: {
    status: string;
    amount: number;   // kobo
    reference: string;
    metadata?: Record<string, unknown>;
  };
};

/**
 * Verify a Paystack reference and complete a vote-related purchase.
 * Handles kind = "money_vote" | "credit_purchase".
 * Safe to call repeatedly with the same reference.
 */
export async function fulfillVotePayment(reference: string) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    console.error("fulfillVotePayment: PAYSTACK_SECRET_KEY missing");
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
      console.warn("fulfillVotePayment: paystack HTTP error", {
        reference,
        status: res.status,
      });
      return null;
    }
    payload = (await res.json()) as PaystackVerify;
  } catch (err) {
    console.error("fulfillVotePayment: paystack fetch threw", err);
    return null;
  }

  if (!payload.status || payload.data?.status !== "success") {
    console.warn("fulfillVotePayment: payment not successful", {
      reference,
      status: payload.data?.status,
    });
    return null;
  }

  const tx = payload.data;
  const meta = (tx.metadata ?? {}) as Record<string, unknown>;
  const kind = typeof meta.kind === "string" ? meta.kind : null;

  if (kind !== "money_vote" && kind !== "credit_purchase") {
    console.warn("fulfillVotePayment: wrong payment kind", {
      reference,
      kind,
    });
    return null;
  }

  // ---- 2. Idempotency: already fulfilled? -------------------------------
  const existing = await prisma.payment.findUnique({
    where: { reference },
    select: { id: true, status: true, userId: true },
  });
  if (existing?.status === "PAID") {
    return { ok: true as const, paymentId: existing.id, kind };
  }
  if (!existing) {
    // Payment row should exist (we created it at init). Missing = tampered ref.
    console.warn("fulfillVotePayment: no Payment row for reference", {
      reference,
    });
    return null;
  }

  // ---- 3. Reload canonical amounts from DB ------------------------------
  const paidAmount = tx.amount / 100;

  try {
    if (kind === "money_vote") {
      return await prisma.$transaction(async (db) => {
        const vote = await db.vote.findUniqueOrThrow({
          where: { reference },
          select: {
            id: true,
            contestantId: true,
            eventId: true,
            quantity: true,
            amount: true,
            status: true,
            contestant: {
              select: {
                name: true,
                event: { select: { status: true, isVotingOpen: true } },
              },
            },
          },
        });

        if (vote.status === "PAID") {
          return { ok: true as const, paymentId: existing.id, kind };
        }

        // Contestant's event must still be open.
        if (
          vote.contestant.event.status !== "LIVE" ||
          !vote.contestant.event.isVotingOpen
        ) {
          throw new Error("VOTING_CLOSED");
        }

        // Amount must match what we promised at init.
        if (Math.abs(paidAmount - Number(vote.amount)) > 0.01) {
          throw new Error("AMOUNT_MISMATCH");
        }

        await db.payment.update({
          where: { reference },
          data: { status: "PAID" },
        });

        await db.vote.update({
          where: { reference },
          data: { status: "PAID" },
        });

        return { ok: true as const, paymentId: existing.id, kind };
      });
    }

    // kind === "credit_purchase"
    const creditsRaw = meta.credits;
    const credits =
      typeof creditsRaw === "number"
        ? creditsRaw
        : typeof creditsRaw === "string"
          ? Number(creditsRaw)
          : NaN;

    if (!Number.isInteger(credits) || credits <= 0) {
      throw new Error("INVALID_CREDITS");
    }

    return await prisma.$transaction(async (db) => {
      // Amount check: credits × current unit price must equal paid amount.
      const { VOTE_PRICE_NAIRA } = await import("@/lib/voting");
      const expected = credits * VOTE_PRICE_NAIRA;
      if (Math.abs(paidAmount - expected) > 0.01) {
        throw new Error("AMOUNT_MISMATCH");
      }

      await db.payment.update({
        where: { reference },
        data: { status: "PAID" },
      });

      await db.user.update({
        where: { id: existing.userId ?? undefined },
        data: { creditBalance: { increment: credits } },
      });

      await db.creditTransaction.create({
        data: {
          userId: existing.userId!,
          amount: credits,
          type: "PURCHASE",
          title: `Purchased ${credits} vote credit${credits === 1 ? "" : "s"}`,
          detail: `₦${paidAmount.toLocaleString()} · ref ${reference}`,
          reference,
          status: "COMPLETED",
        },
      });

      return { ok: true as const, paymentId: existing.id, kind };
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (msg === "VOTING_CLOSED" || msg === "AMOUNT_MISMATCH" || msg === "INVALID_CREDITS") {
      console.warn("fulfillVotePayment: rejected", { reference, msg });
    } else {
      console.error("fulfillVotePayment: transaction failed", err);
    }
    return null;
  }
}