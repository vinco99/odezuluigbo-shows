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

  if (kind !== "money_vote" && kind !== "credit_purchase" && kind !== "credit_package_purchase") {
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


    // Kind is credit_package_purchase
    if (kind === "credit_package_purchase") {
      const packageId = typeof meta.packageId === "string" ? meta.packageId : null;

      const creditsRaw = meta.credits;
      const credits =
        typeof creditsRaw === "number"
          ? creditsRaw
          : typeof creditsRaw === "string"
            ? Number(creditsRaw)
            : NaN;

      if (!packageId) {
        throw new Error("INVALID_PACKAGE_ID");
      }

      if (!Number.isInteger(credits) || credits <= 0) {
        throw new Error("INVALID_CREDITS");
      }

      if (!existing.userId) {
        throw new Error("MISSING_PAYMENT_USER");
      }

      const pkg = await prisma.creditPackage.findUnique({
        where: { id: packageId  },
        select: {
          id: true,
          credits: true,
          amount: true,
        },
      });

      if (!pkg) {
        throw new Error("PACKAGE_NOT_FOUND");
      }

      if (pkg.credits !== credits) {
        throw new Error("PACKAGE_CREDITS_MISMATCH");
      }

      // Payment.amount is stored in naira; Paystack reports kobo.
      if (Math.round(paidAmount * 100) !== Math.round(pkg.amount * 100)) {
        throw new Error("AMOUNT_MISMATCH");
      }

      return await prisma.$transaction(async (db) => {
        // Only the request that changes PENDING to PAID can award credits.
        const updated = await db.payment.updateMany({
          where: {
            id: existing.id,
            status: "PENDING",
          },
          data: {
            status: "PAID",
          },
        });

        if (updated.count !== 1) {
          const current = await db.payment.findUnique({
            where: { id: existing.id },
            select: { status: true },
          });

          if (current?.status === "PAID") {
            return {
              ok: true as const,
              paymentId: existing.id,
              kind,
            };
          }

          throw new Error("PAYMENT_STATUS_CHANGED");
        }

        await db.user.update({
          where: { id: existing.userId! },
          data: {
            creditBalance: {
              increment: pkg.credits,
            },
          },
        });

        await db.creditTransaction.create({
          data: {
            userId: existing.userId!,
            amount: pkg.credits,
            type: "PURCHASE",
            title: `Purchased ${pkg.credits.toLocaleString()} vote credits — ${packageId}`,
            detail: `Credit package · ₦${pkg.amount.toLocaleString()} · ref ${reference}`,
            reference,
            status: "COMPLETED",
          },
        });

        return {
          ok: true as const,
          paymentId: existing.id,
          kind,
        };

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
      const { VOTE_PRICE_NAIRA } = await import("@/lib/voting-config");
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
    if (
      [
        "VOTING_CLOSED",
        "AMOUNT_MISMATCH",
        "INVALID_CREDITS",
        "INVALID_PACKAGE_ID",
        "PACKAGE_NOT_FOUND",
        "PACKAGE_CREDITS_MISMATCH",
        "MISSING_PAYMENT_USER",
        "PAYMENT_STATUS_CHANGED",
      ].includes(msg)
    ) {
      console.warn("fulfillVotePayment: rejected", {
        reference,
        msg,
      });
    } else {
      console.error("fulfillVotePayment: transaction failed", err);
    }

    return null;

  }
}