"use server" // This forces it to be safely executed on the server only

import { prisma } from "@/lib/prisma";

export async function getAdData(slotId: string) {
  return await prisma.ad.findUnique({ where: { id: slotId } });
}
