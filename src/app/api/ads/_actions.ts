"use server";

import { prisma } from "@/lib/prisma";

export async function trackAdImpression(adId: string) {
  try {
    await prisma.ad.update({
      where: { id: adId },
      data: { impressions: { increment: 1 } },
    });
  } catch {
    // swallow — analytics shouldn't break the page
  }
}

export async function trackAdClick(adId: string) {
  try {
    await prisma.ad.update({
      where: { id: adId },
      data: { clicks: { increment: 1 } },
    });
  } catch {
    // swallow — analytics should never block the user
  }
}