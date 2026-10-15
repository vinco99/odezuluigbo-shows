// src/lib/ads.ts
"use server" // Mark this file explicitly as a Server Action module

import { prisma } from "./prisma";

export async function getActiveAd(placementKey: string) {
  const now = new Date();

  return prisma.ad.findFirst({
    where: {
      placementKey,
      active: true,
      AND: [
        { OR: [{ startAt: null }, { startAt: { lte: now } }] },
        { OR: [{ endAt: null }, { endAt: { gte: now } }] },
      ],
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      type: true,
      title: true,
      imageUrl: true,
      linkUrl: true,
      htmlCode: true,
      impressions: true,
    },
  });
}
