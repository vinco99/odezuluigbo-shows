"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";

type Result = { ok: true } | { ok: false; error: string };

const SessionInput = z.object({
  id: z.string().optional(),
  eventId: z.string().min(1),
  name: z.string().min(1).max(80),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date(),
  creditLimitPerUser: z
    .union([z.coerce.number().int().min(0).max(1_000_000), z.literal("")])
    .optional()
    .transform((v) => (v === "" || v === undefined ? null : v)),
});

export async function saveSession(form: FormData): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  const parsed = SessionInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const d = parsed.data;

  if (d.endsAt <= d.startsAt) {
    return { ok: false, error: "End time must be after start time." };
  }

  // Guard: prevent overlapping sessions on the same event
  const overlap = await prisma.voteSession.findFirst({
    where: {
      eventId: d.eventId,
      id: d.id ? { not: d.id } : undefined,
      OR: [
        { startsAt: { lt: d.endsAt }, endsAt: { gt: d.startsAt } },
      ],
    },
    select: { id: true, name: true },
  });
  if (overlap) {
    return {
      ok: false,
      error: `Overlaps with "${overlap.name}". Sessions must not share a time window.`,
    };
  }

  const payload = {
    eventId: d.eventId,
    name: d.name,
    startsAt: d.startsAt,
    endsAt: d.endsAt,
    creditLimitPerUser: d.creditLimitPerUser,
  };

  try {
    if (d.id) {
      await prisma.voteSession.update({ where: { id: d.id }, data: payload });
    } else {
      await prisma.voteSession.create({ data: payload });
    }
  } catch (err) {
    console.error("saveSession", err);
    return { ok: false, error: "Could not save session." };
  }

  revalidatePath(`/admin/events/${d.eventId}/sessions`);
  revalidatePath(`/admin/events/${d.eventId}`);
  revalidatePath("/vote");
  return { ok: true };
}

export async function deleteSession(id: string): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  const session = await prisma.voteSession.findUnique({
    where: { id },
    select: { id: true, eventId: true, _count: { select: { votes: true } } },
  });
  if (!session) return { ok: false, error: "Session not found." };

  if (session._count.votes > 0) {
    return {
      ok: false,
      error: `Cannot delete — this session already has ${session._count.votes} vote${
        session._count.votes === 1 ? "" : "s"
      } recorded against it. Rename or shorten its window instead.`,
    };
  }

  await prisma.voteSession.delete({ where: { id } });

  revalidatePath(`/admin/events/${session.eventId}/sessions`);
  revalidatePath(`/admin/events/${session.eventId}`);
  revalidatePath("/vote");
  return { ok: true };
}

const EventCapInput = z.object({
  eventId: z.string().min(1),
  creditLimitPerSession: z.coerce.number().int().min(0).max(1_000_000),
});

export async function updateEventCap(form: FormData): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  const parsed = EventCapInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { ok: false, error: "Invalid cap value." };
  }
  const d = parsed.data;

  await prisma.event.update({
    where: { id: d.eventId },
    data: { creditLimitPerSession: d.creditLimitPerSession },
  });

  revalidatePath(`/admin/events/${d.eventId}/sessions`);
  revalidatePath(`/admin/events/${d.eventId}`);
  revalidatePath("/vote");
  return { ok: true };
}