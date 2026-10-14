"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";

export async function toggleUserSuspension(userId: string, suspend: boolean) {
  await requireRole(["ADMIN"], "/");

  // Optional but recommended: don't let an admin suspend themselves
  // (fetch session inside requireRole and compare)

  await prisma.user.update({
    where: { id: userId },
    data: {
      suspended: suspend,
      suspendedAt: suspend ? new Date() : null,
    },
  });

  revalidatePath("/admin/users");
}