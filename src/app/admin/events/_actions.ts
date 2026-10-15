"use server";

import { prisma } from "@/lib/prisma";
import { parseYouTubeId } from "@/lib/youtube";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/permissions";
import z from "zod";

type Result = { ok: true } | { ok: false; error: string };

const PrizeInput = z.object({
  eventId: z.string().min(1),
  prize1st: z.coerce.number().min(0).nullable().optional(),
  prize2nd: z.coerce.number().min(0).nullable().optional(),
  prize3rd: z.coerce.number().min(0).nullable().optional(),
});

export async function saveEventPrizes(form: FormData): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  const parsed = PrizeInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid prize values" };
  }
  const d = parsed.data;

  // Empty string coerces to NaN; treat that as null
  const clean = (v: unknown) =>
    typeof v === "number" && !Number.isNaN(v) ? v : null;

  try {
    await prisma.event.update({
      where: { id: d.eventId },
      data: {
        prize1st: clean(d.prize1st),
        prize2nd: clean(d.prize2nd),
        prize3rd: clean(d.prize3rd),
      },
    });
  } catch (err) {
    console.error("saveEventPrizes", err);
    return { ok: false, error: "Could not save prizes." };
  }

  revalidatePath(`/admin/events/${d.eventId}`);
  revalidatePath("/admin/events");
  revalidatePath("/");
  return { ok: true };
}


const VideoInput = z.object({
  id: z.string().optional(),
  eventId: z.string().min(1),
  youtubeUrl: z.string().min(1).max(500),     // raw URL from the form
  title: z.string().min(1).max(120),
  description: z.string().max(500).optional().nullable(),
  kind: z.enum(["LIVE", "UPCOMING", "REPLAY", "HIGHLIGHT", "OTHER"]).default("OTHER"),
  isPrimary: z.coerce.boolean().default(false),
  active: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export async function saveEventVideo(form: FormData): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  const parsed = VideoInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const d = parsed.data;

  const youtubeId = parseYouTubeId(d.youtubeUrl);
  if (!youtubeId) {
    return { ok: false, error: "That doesn't look like a YouTube link or video ID." };
  }

  const payload = {
    eventId: d.eventId,
    youtubeId,
    title: d.title,
    description: d.description || null,
    kind: d.kind,
    isPrimary: d.isPrimary,
    active: d.active,
    sortOrder: d.sortOrder,
  };

  try {
    await prisma.$transaction(async (tx) => {
      // If this video is becoming primary, unset every other primary on the event
      if (d.isPrimary) {
        await tx.eventVideo.updateMany({
          where: {
            eventId: d.eventId,
            isPrimary: true,
            ...(d.id ? { id: { not: d.id } } : {}),
          },
          data: { isPrimary: false },
        });
      }

      if (d.id) {
        await tx.eventVideo.update({ where: { id: d.id }, data: payload });
      } else {
        await tx.eventVideo.create({ data: payload });
      }
    });
  } catch (err) {
    console.error("saveEventVideo", err);
    return { ok: false, error: "Could not save video." };
  }

  revalidatePath(`/admin/events/${d.eventId}`);
  revalidatePath(`/admin/events/${d.eventId}/videos`);
  revalidatePath("/");
  return { ok: true };
}

export async function deleteEventVideo(id: string, eventId: string): Promise<Result> {
  await requireRole(["ADMIN"], "/");
  await prisma.eventVideo.delete({ where: { id } });
  revalidatePath(`/admin/events/${eventId}`);
  revalidatePath(`/admin/events/${eventId}/videos`);
  revalidatePath("/");
  return { ok: true };
}

export async function toggleEventVideoActive(
  id: string,
  active: boolean,
  eventId: string,
): Promise<Result> {
  await requireRole(["ADMIN"], "/");
  await prisma.eventVideo.update({ where: { id }, data: { active } });
  revalidatePath(`/admin/events/${eventId}`);
  revalidatePath(`/admin/events/${eventId}/videos`);
  revalidatePath("/");
  return { ok: true };
}

export async function setPrimaryVideo(id: string, eventId: string): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  await prisma.$transaction([
    prisma.eventVideo.updateMany({
      where: { eventId, isPrimary: true, id: { not: id } },
      data: { isPrimary: false },
    }),
    prisma.eventVideo.update({
      where: { id },
      data: { isPrimary: true, active: true },  // can't be primary and hidden
    }),
  ]);

  revalidatePath(`/admin/events/${eventId}`);
  revalidatePath(`/admin/events/${eventId}/videos`);
  revalidatePath("/");
  return { ok: true };
}