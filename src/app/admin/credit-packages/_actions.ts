"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";

type Result = { ok: true } | { ok: false; error: string };

const Input = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(80),
  credits: z.coerce.number().int().min(1).max(1_000_000),
  amount: z.coerce.number().min(1),
  active: z.coerce.boolean().default(true),
  featured: z.coerce.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
});

export async function savePackage(form: FormData): Promise<Result> {
  await requireRole(["ADMIN"], "/");
  const parsed = Input.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const d = parsed.data;

  try {
    if (d.id) {
      await prisma.creditPackage.update({ where: { id: d.id }, data: d });
    } else {
      const { id, ...rest } = d;
      await prisma.creditPackage.create({ data: rest });
    }
  } catch (err) {
    console.error("savePackage", err);
    return { ok: false, error: "Could not save package." };
  }
  revalidatePath("/admin/credit-packages");
  revalidatePath("/vote");
  return { ok: true };
}

export async function deletePackage(id: string): Promise<Result> {
  await requireRole(["ADMIN"], "/");
  await prisma.creditPackage.delete({ where: { id } });
  revalidatePath("/admin/credit-packages");
  revalidatePath("/vote");
  return { ok: true };
}

export async function togglePackageActive(id: string, active: boolean): Promise<Result> {
  await requireRole(["ADMIN"], "/");
  await prisma.creditPackage.update({ where: { id }, data: { active } });
  revalidatePath("/admin/credit-packages");
  revalidatePath("/vote");
  return { ok: true };
}