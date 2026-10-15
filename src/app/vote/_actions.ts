"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import {
  getActiveSession,
  getSessionCreditCap,
  getSessionCreditsSpent,
} from "@/lib/voting";
import { VOTE_PRICE_NAIRA,
  DEFAULT_VOTING_FEE_NAIRA,} from "@/lib/voting-config";

// ---------- Schemas ------------------------------------------------------

const CreditVoteInput = z.object({
  contestantId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(10_000),
});

const MoneyVoteInput = z.object({
  contestantId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(100_000),
});

const ClaimInput = z.object({ taskId: z.string().min(1) });

type ActionResult<T = unknown> =
  | ({ ok: true } & T)
  | { ok: false; error: string };

// ---------- Helpers ------------------------------------------------------

/**
 * Serializable transaction with retry on write-conflict.
 * Needed for claimTask, where two parallel claims would otherwise both
 * pass the cooldown / max-completions reads.
 */
async function withSerializable<T>(
  fn: (tx: Prisma.TransactionClient) => Promise<T>,
): Promise<T> {
  const MAX = 3;
  let lastErr: unknown;
  for (let i = 0; i < MAX; i++) {
    try {
      return await prisma.$transaction(fn, { isolationLevel: "Serializable" });
    } catch (err) {
      lastErr = err;
      // P2034: write conflict / deadlock — safe to retry.
      if ((err as { code?: string })?.code === "P2034") continue;
      throw err;
    }
  }
  throw lastErr;
}

// ---------- castCreditVote ----------------------------------------------

export async function castCreditVote(
  form: FormData,
): Promise<ActionResult<{ newBalance: number }>> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, error: "Please sign in to vote." };
  }

  const parsed = CreditVoteInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { ok: false, error: "Invalid vote quantity." };
  }

  const { contestantId, quantity } = parsed.data;
  const userId = session.user.id;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Contestant + event must be open for voting.
      const contestant = await tx.contestant.findUniqueOrThrow({
        where: { id: contestantId },
        select: {
          id: true,
          name: true,
          eventId: true,
          event: { select: { status: true, isVotingOpen: true } },
        },
      });
      if (
        contestant.event.status !== "LIVE" ||
        !contestant.event.isVotingOpen
      ) {
        throw new Error("VOTING_CLOSED");
      }

      // 2. Session credit cap — checked before we touch the balance.
      const activeSession = await getActiveSession(contestant.eventId);
      const cap = await getSessionCreditCap(
        contestant.eventId,
        activeSession?.id ?? null,
      );
      if (cap != null) {
        if (!activeSession) throw new Error("SESSION_MISCONFIGURED");
        const spent = await getSessionCreditsSpent(
          userId,
          contestant.eventId,
          activeSession.id,
        );
        if (spent + quantity > cap) {
          throw new Error(`SESSION_CAP:${Math.max(0, cap - spent)}`);
        }
      }

      // 3. Atomic check + deduct (single decrement).
      const claim = await tx.user.updateMany({
        where: { id: userId, creditBalance: { gte: quantity } },
        data: { creditBalance: { decrement: quantity } },
      });
      if (claim.count === 0) throw new Error("INSUFFICIENT_CREDITS");

      // 4. Read back the new balance for the return value.
      const updated = await tx.user.findUniqueOrThrow({
        where: { id: userId },
        select: { creditBalance: true },
      });

      // 5. Vote row.
      const vote = await tx.vote.create({
        data: {
          voterId: userId,
          contestantId: contestant.id,
          eventId: contestant.eventId,
          quantity,
          amount: 0,
          creditsUsed: quantity,
          reference: `VOTE-C-${nanoid(12)}`,
          status: "PAID",
          sessionId: activeSession?.id ?? null,
        },
      });

      // 6. Ledger entry.
      await tx.creditTransaction.create({
        data: {
          userId,
          amount: -quantity,
          type: "SPEND_VOTE",
          title: `Voted for ${contestant.name}`,
          detail: `${quantity} vote${quantity === 1 ? "" : "s"}${
            activeSession ? ` · ${activeSession.name}` : ""
          }`,
          reference: vote.reference,
          status: "COMPLETED",
        },
      });

      return { newBalance: updated.creditBalance };
    });

    revalidatePath("/vote");
    revalidatePath("/dashboard");
    return { ok: true, newBalance: result.newBalance };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";

    if (msg === "VOTING_CLOSED") {
      return { ok: false, error: "Voting for this event has closed." };
    }
    if (msg === "INSUFFICIENT_CREDITS") {
      return { ok: false, error: "You don't have enough credits for that." };
    }
    if (msg === "SESSION_MISCONFIGURED") {
      console.error("castCreditVote: cap set without active session", {
        userId,
        contestantId,
      });
      return { ok: false, error: "Voting is temporarily unavailable." };
    }
    if (msg.startsWith("SESSION_CAP:")) {
      const remaining = msg.split(":")[1];
      return {
        ok: false,
        error: `Session limit reached. You can spend ${remaining} more credit${
          remaining === "1" ? "" : "s"
        } this session.`,
      };
    }

    console.error("castCreditVote", err);
    return { ok: false, error: "Could not record your vote. Try again." };
  }
}

// ---------- initMoneyVote -----------------------------------------------

export async function initMoneyVote(
  form: FormData,
): Promise<ActionResult<{ authorizationUrl: string }>> {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return { ok: false, error: "Please sign in to vote." };
  }

  const parsed = MoneyVoteInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { ok: false, error: "Invalid vote quantity." };
  }

  const { contestantId, quantity } = parsed.data;

  const contestant = await prisma.contestant.findUniqueOrThrow({
    where: { id: contestantId },
    select: {
      id: true,
      name: true,
      eventId: true,
      event: {
        select: {
          id: true,
          title: true,
          status: true,
          isVotingOpen: true,
          votingFee: true,
        },
      },
    },
  });

  if (contestant.event.status !== "LIVE" || !contestant.event.isVotingOpen) {
    return { ok: false, error: "Voting for this event has closed." };
  }

  const perVote =
    contestant.event.votingFee > 0
      ? contestant.event.votingFee
      : DEFAULT_VOTING_FEE_NAIRA;

  if (perVote <= 0) {
    return { ok: false, error: "This event uses credits only." };
  }

  const totalAmount = quantity * perVote;
  const amountKobo = Math.round(totalAmount * 100);
  const reference = `VOTE-M-${nanoid(12)}`;

  // Persist PENDING payment + vote rows.
  await prisma.$transaction(async (tx) => {
    await tx.payment.create({
      data: {
        reference,
        amount: totalAmount,
        type: "VOTE",
        status: "PENDING",
        userId: session.user.id,
        eventId: contestant.eventId,
      },
    });

    await tx.vote.create({
      data: {
        voterId: session.user.id,
        contestantId: contestant.id,
        eventId: contestant.eventId,
        quantity,
        amount: totalAmount,
        creditsUsed: 0,
        reference,
        status: "PENDING",
        sessionId: null,
      },
    });
  });

  let payload: any = null;
  try {
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        amount: amountKobo,
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/vote/callback`,
        metadata: {
          kind: "money_vote",
          contestantId: contestant.id,
          quantity,
          userId: session.user.id,
          votingFee: perVote,
        },
      }),
    });
    payload = await res.json();
  } catch (err) {
    console.error("initMoneyVote: paystack fetch threw", err);
  }

  if (!payload?.status) {
    // Init never succeeded → no URL was ever handed to the user, so no one
    // can pay against this reference. Safe to remove the PENDING rows.
    await prisma
      .$transaction([
        prisma.vote.deleteMany({ where: { reference } }),
        prisma.payment.deleteMany({ where: { reference, status: "PENDING" } }),
      ])
      .catch((cleanupErr) =>
        console.error("initMoneyVote: cleanup failed", { reference, cleanupErr }),
      );

    return { ok: false, error: payload?.message ?? "Payment init failed." };
  }

  return { ok: true, authorizationUrl: payload.data.authorization_url };
}

// ---------- initCreditPurchase ------------------------------------------

export async function initCreditPurchase(
  form: FormData,
): Promise<ActionResult<{ authorizationUrl: string }>> {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return { ok: false, error: "Please sign in." };
  }

  const quantity = Number(form.get("quantity"));
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10_000) {
    return { ok: false, error: "Invalid credit quantity." };
  }

  const reference = `CRED-${nanoid(12)}`;
  const amount = quantity * VOTE_PRICE_NAIRA;

  await prisma.payment.create({
    data: {
      reference,
      amount,
      type: "CREDIT_PURCHASE",
      status: "PENDING",
      userId: session.user.id,
    },
  });

  let payload: any = null;
  try {
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        amount: amount * 100,
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/vote/callback`,
        metadata: {
          kind: "credit_purchase",
          credits: quantity,
          userId: session.user.id,
        },
      }),
    });
    payload = await res.json();
  } catch (err) {
    console.error("initCreditPurchase: paystack fetch threw", err);
  }

  if (!payload?.status) {
    await prisma.payment
      .deleteMany({ where: { reference, status: "PENDING" } })
      .catch((cleanupErr) =>
        console.error("initCreditPurchase: cleanup failed", {
          reference,
          cleanupErr,
        }),
      );

    return { ok: false, error: payload?.message ?? "Payment init failed." };
  }

  return { ok: true, authorizationUrl: payload.data.authorization_url };
}

// ---------- claimTask ---------------------------------------------------

export async function claimTask(form: FormData): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "Please sign in." };

  const parsed = ClaimInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { ok: false, error: "Invalid task." };

  const userId = session.user.id;
  const { taskId } = parsed.data;

  try {
    await withSerializable(async (tx) => {
      const task = await tx.task.findUnique({ where: { id: taskId } });
      if (!task || !task.active) throw new Error("TASK_UNAVAILABLE");

      // TIMED requires a server-side startedAt record. Until we store one,
      // refuse — otherwise the claim is trivially exploitable.
      if (task.verification === "TIMED") {
        throw new Error("TASK_UNAVAILABLE");
      }

      // Cooldown: last APPROVED completion for this user+task.
      if (task.cooldownHours) {
        const last = await tx.userTaskCompletion.findFirst({
          where: { userId, taskId: task.id, status: "APPROVED" },
          orderBy: { createdAt: "desc" },
          select: { createdAt: true },
        });
        if (last) {
          const ready = new Date(
            last.createdAt.getTime() + task.cooldownHours * 3600_000,
          );
          if (ready > new Date()) {
            const seconds = Math.ceil((ready.getTime() - Date.now()) / 1000);
            throw new Error(`COOLDOWN:${seconds}`);
          }
        }
      }

      // Max completions.
      if (task.maxCompletions != null) {
        const count = await tx.userTaskCompletion.count({
          where: { userId, taskId: task.id, status: "APPROVED" },
        });
        if (count >= task.maxCompletions) throw new Error("MAX_COMPLETIONS");
      }

      // MANUAL → queue for admin review.
      if (task.verification === "MANUAL") {
        await tx.userTaskCompletion.create({
          data: {
            userId,
            taskId: task.id,
            status: "PENDING",
            rewardAmount: task.reward,
          },
        });
        return;
      }

      // AUTO → grant immediately.
      const creditTx = await tx.creditTransaction.create({
        data: {
          userId,
          amount: task.reward,
          type: "BONUS",
          title: task.title,
          detail: `Task reward · ${task.kind}`,
          status: "COMPLETED",
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: { creditBalance: { increment: task.reward } },
      });

      await tx.userTaskCompletion.create({
        data: {
          userId,
          taskId: task.id,
          status: "APPROVED",
          rewardAmount: task.reward,
          creditTxId: creditTx.id,
          completedAt: new Date(),
        },
      });
    });

    revalidatePath("/vote");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";

    if (msg === "TASK_UNAVAILABLE") {
      return { ok: false, error: "Task not available." };
    }
    if (msg === "MAX_COMPLETIONS") {
      return {
        ok: false,
        error: "You've completed this task the maximum number of times.",
      };
    }
    if (msg.startsWith("COOLDOWN:")) {
      const seconds = Number(msg.split(":")[1]);
      const mins = Math.ceil(seconds / 60);
      if (mins < 60) {
        return {
          ok: false,
          error: `Try again in ${mins} minute${mins === 1 ? "" : "s"}.`,
        };
      }
      const hours = Math.ceil(mins / 60);
      return {
        ok: false,
        error: `Try again in ${hours} hour${hours === 1 ? "" : "s"}.`,
      };
    }

    console.error("claimTask", err);
    return { ok: false, error: "Could not claim this task. Try again." };
  }
}