import { prisma } from "./prisma";

export type AdPlacement = {
  key: string;
  name: string;
  description: string;
  width: number;
  height: number;
};

export const AD_PLACEMENTS: AdPlacement[] = [
  {
    key: "homepage-banner",
    name: "Homepage Banner",
    description: "Leaderboard below the hero on the homepage",
    width: 728,
    height: 90,
  },
  {
    key: "blog-banner",
    name: "Blog Page Banner",
    description: "Leaderboard at the top of the blog listing and posts",
    width: 728,
    height: 90,
  },
  {
    key: "vote-banner",
    name: "Voting Page Banner",
    description: "Leaderboard above the vote tabs",
    width: 728,
    height: 90,
  },
  {
    key: "sitewide-popup",
    name: "Sitewide Popup Ad",
    description: "Modal popup shown once per session across the site",
    width: 400,
    height: 280,
  },
];

export const AD_PLACEMENT_KEYS = AD_PLACEMENTS.map((p) => p.key);
export type AdPlacementKey = (typeof AD_PLACEMENTS)[number]["key"];

export function getPlacement(key: string): AdPlacement | undefined {
  return AD_PLACEMENTS.find((p) => p.key === key);
}

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