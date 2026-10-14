"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";

type ActionResult = { ok: true } | { ok: false; error: string };

const TaskInput = z.object({
  id: z.string().optional(),
  title: z.string().min(2).max(120),
  description: z.string().max(500).optional().nullable(),
  reward: z.coerce.number().int().min(1).max(100_000),
  kind: z.enum(["VIDEO", "SOCIAL", "SURVEY", "CUSTOM"]),
  verification: z.enum(["AUTO", "TIMED", "MANUAL"]),
  actionUrl: z.string().url().optional().or(z.literal("")).nullable(),
  minSeconds: z.coerce.number().int().min(1).max(3600).optional().nullable(),
  cooldownHours: z.coerce.number().int().min(1).max(24 * 30).optional().nullable(),
  maxCompletions: z.coerce.number().int().min(1).max(1000).optional().nullable(),
  eventId: z.string().optional().nullable(),
  active: z.coerce.boolean().default(true),
});

export async function saveTask(form: FormData): Promise<ActionResult> {
  const session = await requireRole(["ADMIN"], "/");

  const parsed = TaskInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const data = parsed.data;

  // Guard: TIMED needs minSeconds, MANUAL shouldn't have one
  if (data.verification === "TIMED" && !data.minSeconds) {
    return { ok: false, error: "Timed tasks require a minimum duration." };
  }

  const payload = {
    title: data.title,
    description: data.description ?? null,
    reward: data.reward,
    kind: data.kind,
    verification: data.verification,
    actionUrl: data.actionUrl || null,
    minSeconds: data.verification === "TIMED" ? data.minSeconds! : null,
    cooldownHours: data.cooldownHours ?? null,
    maxCompletions: data.maxCompletions ?? null,
    eventId: data.eventId || null,
    active: data.active,
  };

  try {
    if (data.id) {
      await prisma.task.update({ where: { id: data.id }, data: payload });
    } else {
      await prisma.task.create({
        data: { ...payload, createdById: session.user.id },
      });
    }
  } catch (err) {
    console.error("saveTask", err);
    return { ok: false, error: "Could not save task." };
  }

  revalidatePath("/admin/tasks");
  revalidatePath("/vote");
  return { ok: true };
}

export async function toggleTaskActive(id: string, active: boolean): Promise<ActionResult> {
  await requireRole(["ADMIN"], "/");
  await prisma.task.update({ where: { id }, data: { active } });
  revalidatePath("/admin/tasks");
  revalidatePath("/vote");
  return { ok: true };
}

export async function deleteTask(id: string): Promise<ActionResult> {
  await requireRole(["ADMIN"], "/");
  await prisma.task.delete({ where: { id } });
  revalidatePath("/admin/tasks");
  revalidatePath("/vote");
  return { ok: true };
}

export async function reviewTaskCompletion(
  completionId: string,
  decision: "APPROVED" | "REJECTED",
  note?: string,
): Promise<ActionResult> {
  const session = await requireRole(["ADMIN"], "/");

  const completion = await prisma.userTaskCompletion.findUnique({
    where: { id: completionId },
    include: { task: true },
  });
  if (!completion) return { ok: false, error: "Completion not found." };
  if (completion.status !== "PENDING") {
    return { ok: false, error: "Already reviewed." };
  }

  if (decision === "REJECTED") {
    await prisma.userTaskCompletion.update({
      where: { id: completionId },
      data: {
        status: "REJECTED",
        reviewedAt: new Date(),
        reviewedById: session.user.id,
        reviewNote: note ?? null,
      },
    });
    revalidatePath("/admin/tasks");
    return { ok: true };
  }

  // Approve → credit the wallet + log the transaction, all in one tx
  await prisma.$transaction(async (tx) => {
    const creditTx = await tx.creditTransaction.create({
      data: {
        userId: completion.userId,
        amount: completion.rewardAmount,
        type: "BONUS",
        title: completion.task.title,
        detail: `Task reward · ${completion.task.kind}`,
        status: "COMPLETED",
      },
    });

    await tx.user.update({
      where: { id: completion.userId },
      data: { creditBalance: { increment: completion.rewardAmount } },
    });

    await tx.userTaskCompletion.update({
      where: { id: completionId },
      data: {
        status: "APPROVED",
        creditTxId: creditTx.id,
        reviewedAt: new Date(),
        reviewedById: session.user.id,
        reviewNote: note ?? null,
      },
    });
  });

  revalidatePath("/admin/tasks");
  revalidatePath("/dashboard");
  return { ok: true };
}