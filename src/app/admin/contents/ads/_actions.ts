"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { AD_PLACEMENT_KEYS } from "@/lib/ad-placements";

type Result = { ok: true } | { ok: false; error: string };

const AdInput = z
  .object({
    id: z.string().optional(),
    placementKey: z.enum(AD_PLACEMENT_KEYS as [string, ...string[]]),
    title: z.string().min(1).max(120),
    type: z.enum(["IMAGE", "HTML", "ADSENSE"]),
    imageUrl: z.string().url().optional().or(z.literal("")).nullable(),
    imagePublicId: z.string().optional().nullable(),
    linkUrl: z.string().url().optional().or(z.literal("")).nullable(),
    htmlCode: z.string().max(20_000).optional().nullable(),
    sponsorId: z.string().optional().nullable(),
    startAt: z.string().optional().nullable(),
    endAt: z.string().optional().nullable(),
    active: z.coerce.boolean().default(true),
    sortOrder: z.coerce.number().int().default(0),
  })
  .refine(
    (d) => d.type !== "IMAGE" || (d.imageUrl && d.imageUrl.length > 0),
    { message: "Image ads require an image URL", path: ["imageUrl"] },
  )
  .refine(
    (d) => d.type === "IMAGE" || (d.htmlCode && d.htmlCode.length > 0),
    { message: "HTML and AdSense ads require HTML code", path: ["htmlCode"] },
  );

export async function saveAd(form: FormData): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  const parsed = AdInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const d = parsed.data;

  const payload = {
    placementKey: d.placementKey,
    title: d.title,
    type: d.type,
    imageUrl: d.imageUrl || null,
    imagePublicId: d.imagePublicId || null,
    linkUrl: d.linkUrl || null,
    htmlCode: d.htmlCode || null,
    sponsorId: d.sponsorId || null,
    startAt: d.startAt ? new Date(d.startAt) : null,
    endAt: d.endAt ? new Date(d.endAt) : null,
    active: d.active,
    sortOrder: d.sortOrder,
  };

  try {
    if (d.id) {
      await prisma.ad.update({ where: { id: d.id }, data: payload });
    } else {
      await prisma.ad.create({ data: payload });
    }
  } catch (err) {
    console.error("saveAd", err);
    return { ok: false, error: "Could not save ad." };
  }

  revalidatePath("/admin/ads");
  revalidatePath(`/admin/ads/${d.placementKey}`);
  // Revalidate the public pages that render this slot
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/vote");
  return { ok: true };
}

export async function deleteAd(id: string, placementKey: string): Promise<Result> {
  await requireRole(["ADMIN"], "/");
  await prisma.ad.delete({ where: { id } });
  revalidatePath("/admin/ads");
  revalidatePath(`/admin/ads/${placementKey}`);
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/vote");
  return { ok: true };
}

export async function toggleAdActive(id: string, active: boolean, placementKey: string): Promise<Result> {
  await requireRole(["ADMIN"], "/");
  await prisma.ad.update({ where: { id }, data: { active } });
  revalidatePath("/admin/ads");
  revalidatePath(`/admin/ads/${placementKey}`);
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/vote");
  return { ok: true };
}