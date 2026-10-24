
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";

type Result = { ok: true } | { ok: false; error: string };

const Input = z.object({
  id: z.string().optional(),
  eventId: z.string().min(1, "Event is required"),
  name: z.string().trim().min(1, "Ticket name is required").max(120),
  description: z.string().optional().default(""),
  price: z.coerce.number().finite().min(0, "Price cannot be negative"),
  perks: z
    .string()
    .optional()
    .default("")
    .transform((value) =>
      value.split(",").map((perk) => perk.trim()).filter(Boolean)
    ),
  maxQuantity: z.preprocess(
    (value) => value === "" || value == null ? null : value,
    z.coerce.number().int().positive().nullable()
  ),
  active: z.preprocess(
    (value) => value === "on" || value === "true" || value === true,
    z.boolean()
  ),
});

export async function saveTicket(form: FormData): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  const parsed = Input.safeParse(Object.fromEntries(form));

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const {
    id,
    eventId,
    name,
    description,
    price,
    perks,
    maxQuantity,
    active,
  } = parsed.data;

  try {
    if (id) {
      // Ensure the package belongs to this event.
      const existing = await prisma.ticketPackage.findFirst({
        where: { id, eventId },
        select: { id: true },
      });

      if (!existing) {
        return { ok: false, error: "Ticket package not found." };
      }

      await prisma.ticketPackage.update({
        where: { id: existing.id },
        data: {
          name,
          description,
          price,
          perks,
          maxQuantity,
          active,
        },
      });
    } else {
      await prisma.ticketPackage.create({
        data: {
          eventId,
          name,
          description,
          price,
          perks,
          maxQuantity,
          active,
        },
      });
    }

    revalidatePath(`/admin/events/${eventId}/tickets`);
    revalidatePath(`/events/${eventId}`);

    return { ok: true };
  } catch (error) {
    console.error("saveTicket failed:", error);
    return {
      ok: false,
      error: "Could not save ticket package. Please try again.",
    };
  }
}

export async function deleteTicket(
  id: string,
  eventId: string
): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  const ticketPackage = await prisma.ticketPackage.findFirst({
    where: { id, eventId },
    select: {
      id: true,
      _count: { select: { tickets: true } },
    },
  });

  if (!ticketPackage) {
    return { ok: false, error: "Ticket package not found." };
  }

  // Preserve purchase history and avoid breaking ticket relations.
  if (ticketPackage._count.tickets > 0) {
    return {
      ok: false,
      error: "This package has issued tickets. Hide it instead of deleting it.",
    };
  }

  await prisma.ticketPackage.delete({
    where: { id: ticketPackage.id },
  });

  revalidatePath(`/admin/events/${eventId}/tickets`);
  revalidatePath(`/events/${eventId}`);

  return { ok: true };
}

export async function toggleTicketActive(
  id: string,
  active: boolean,
  eventId: string
): Promise<Result> {
  await requireRole(["ADMIN"], "/");

  const ticketPackage = await prisma.ticketPackage.findFirst({
    where: { id, eventId },
    select: { id: true },
  });

  if (!ticketPackage) {
    return { ok: false, error: "Ticket package not found." };
  }

  await prisma.ticketPackage.update({
    where: { id: ticketPackage.id },
    data: { active },
  });

  revalidatePath(`/admin/events/${eventId}/tickets`);
  revalidatePath(`/events/${eventId}`);

  return { ok: true };
}
