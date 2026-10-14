"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

type Result = { ok: true } | { ok: false; error: string };

const GalleryInput = z.object({
  id: z.string().optional(),
  eventId: z.string().min(1),
  image: z.string().url("Image is required"),
  imagePublicId: z.string().optional().nullable(),
  caption: z.string().max(200).optional().nullable(),
  sortOrder: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(true),
});

export async function saveGalleryImage(form: FormData): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  const parsed = GalleryInput.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const d = parsed.data;

  const payload = {
    eventId: d.eventId,
    image: d.image,
    imagePublicId: d.imagePublicId || null,
    caption: d.caption || null,
    sortOrder: d.sortOrder,
    active: d.active,
  };

  try {
    if (d.id) {
      await prisma.gallery.update({ where: { id: d.id }, data: payload });
    } else {
      await prisma.gallery.create({ data: payload });
    }
  } catch (err) {
    console.error("saveGalleryImage", err);
    return { ok: false, error: "Could not save image." };
  }

  revalidatePath(`/admin/events/${d.eventId}/galleries`);
  revalidatePath(`/admin/events/${d.eventId}`);
  revalidatePath("/");
  return { ok: true };
}

export async function deleteGalleryImage(
  id: string,
  eventId: string,
): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  const row = await prisma.gallery.findUnique({
    where: { id },
    select: { imagePublicId: true },
  });

  await prisma.gallery.delete({ where: { id } });

  // Best-effort cleanup — don't block on Cloudinary failure
  if (row?.imagePublicId) {
    await deleteCloudinaryAsset(row.imagePublicId);
  }

  revalidatePath(`/admin/events/${eventId}/galleries`);
  revalidatePath(`/admin/events/${eventId}`);
  revalidatePath("/");
  return { ok: true };
}

export async function toggleGalleryActive(
  id: string,
  active: boolean,
  eventId: string,
): Promise<Result> {
  await requireRole(["ADMIN"], "/");
  await prisma.gallery.update({ where: { id }, data: { active } });
  revalidatePath(`/admin/events/${eventId}/galleries`);
  revalidatePath(`/admin/events/${eventId}`);
  revalidatePath("/");
  return { ok: true };
}

export async function reorderGallery(
  eventId: string,
  orderedIds: string[],
): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.gallery.update({ where: { id }, data: { sortOrder: index } }),
    ),
  );

  revalidatePath(`/admin/events/${eventId}/galleries`);
  revalidatePath(`/admin/events/${eventId}`);
  revalidatePath("/");
  return { ok: true };
}