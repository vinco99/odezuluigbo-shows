"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";

type Result = { ok: true } | { ok: false; error: string };

const Input = z.object({
  id: z.string().optional(),
  eventId: z.string().min(1),
  name: z.string().min(1).max(120),
  tier: z.enum(["PLATINUM", "GOLD", "SILVER", "BRONZE", "PARTNER"]).default("PARTNER"),
  website: z.string().url().optional().or(z.literal("")).nullable(),
  logo: z.string().url().optional().or(z.literal("")).nullable(),
  logoPublicId: z.string().optional().nullable(),
  sortOrder: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(true),
});


export async function saveSponsor(form: FormData): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  const parsed = Input.safeParse(Object.fromEntries(form));

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const d = parsed.data;

  const payload = {
    eventId: d.eventId,
    name: d.name,
    tier: d.tier,
    website: d.website || null,
    logo: d.logo || null,
    logoPublicId: d.logoPublicId || null,
    sortOrder: d.sortOrder,
    active: d.active,
  };

  try {
    if (d.id) {
      await prisma.sponsor.update({ where: { id: d.id }, data: payload });
    } else {
      await prisma.sponsor.create({ data: payload });
    }
  } catch (err) {
    console.error("saveSponsor", err);
    return { ok: false, error: "Could not save Sponsor." };
  }
  revalidatePath(`/admin/events/${d.eventId}/sponsors`);
  revalidatePath(`/events/${d.eventId}`);
  return { ok: true };
}

export async function deleteSponsor(id: string, eventId: string): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  await prisma.sponsor.delete({ where: { id } });

  revalidatePath(`/admin/events/${eventId}/sponsors`);
  revalidatePath(`/events/${eventId}`);
  return { ok: true };
}

export async function toggleSponsorActive(id: string, active: boolean, eventId: string): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  await prisma.sponsor.update({ where: { id }, data: { active } });

  revalidatePath(`/admin/events/${eventId}/judges`);
  revalidatePath(`/events/${eventId}`);
  return { ok: true };
}