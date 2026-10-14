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
  title: z.string().max(120).optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  image: z.string().url().optional().or(z.literal("")).nullable(),
  imagePublicId: z.string().optional().nullable(),
  sortOrder: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(true),
});

export async function saveJudge(form: FormData): Promise<Result> {
    await requireRole(["ADMIN"], "/");
    
    const parsed = Input.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
        return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }
    const d = parsed.data;

    const payload = {
        eventId: d.eventId,
        name: d.name,
        title: d.title || null,
        bio: d.bio || null,
        image: d.image || null,
        imagePublicId: d.imagePublicId || null,
        sortOrder: d.sortOrder,
        active: d.active,
    };

    try {
        if (d.id) {
            await prisma.judge.update({ where: { id: d.id }, data: payload });
        } else {
            await prisma.judge.create({ data: payload });
        }
    } catch (err) {
        console.error("saveJudge", err);
        return { ok: false, error: "Could not save judge." };
    }
    revalidatePath(`/admin/events/${d.eventId}/judges`);
    revalidatePath(`/events/${d.eventId}`);
    return { ok: true };
}

export async function deleteJudge(id: string, eventId: string): Promise<Result> {
    await requireRole(["ADMIN"], "/");
    await prisma.judge.delete({ where: { id } });
    revalidatePath(`/admin/events/${eventId}/judges`);
    revalidatePath(`/events/${eventId}`);
    return { ok: true };
}

export async function toggleJudgeActive(id: string, active: boolean, eventId: string): Promise<Result> {
    await requireRole(["ADMIN"], "/");
    await prisma.judge.update({ where: { id }, data: { active } });
    revalidatePath(`/admin/events/${eventId}/judges`);
    revalidatePath(`/events/${eventId}`);
    return { ok: true };
}