"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";

type Result = { ok: true } | { ok: false; error: string };

const SongInput = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(160),
  artist: z.string().min(1).max(160),
  streamingUrl: z.string().url("Must be a valid URL"),
  platform: z
    .enum(["youtube-music", "spotify", "apple-music", "audiomack", "boomplay", "other"])
    .default("youtube-music"),
  coverImage: z.string().url().optional().or(z.literal("")).nullable(),
  active: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export async function saveSong(form: FormData): Promise<Result> {
  await requireRole(["ADMIN"], "/");
  const parsed = SongInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const d = parsed.data;

  const payload = {
    title: d.title,
    artist: d.artist,
    streamingUrl: d.streamingUrl,
    platform: d.platform,
    coverImage: d.coverImage || null,
    active: d.active,
    sortOrder: d.sortOrder,
  };

  try {
    if (d.id) {
      await prisma.song.update({ where: { id: d.id }, data: payload });
    } else {
      await prisma.song.create({ data: payload });
    }
  } catch (err) {
    console.error("saveSong", err);
    return { ok: false, error: "Could not save song." };
  }
  revalidatePath("/admin/songs");
  revalidatePath("/"); // homepage
  return { ok: true };
}

export async function deleteSong(id: string): Promise<Result> {
  await requireRole(["ADMIN"], "/");
  await prisma.song.delete({ where: { id } });
  revalidatePath("/admin/songs");
  revalidatePath("/");
  return { ok: true };
}

export async function toggleSongActive(id: string, active: boolean): Promise<Result> {
  await requireRole(["ADMIN"], "/");
  await prisma.song.update({ where: { id }, data: { active } });
  revalidatePath("/admin/songs");
  revalidatePath("/");
  return { ok: true };
}