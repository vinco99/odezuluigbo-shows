import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { getPlacement } from "@/lib/ad-placements";
import { AdsEditor } from "./_components/AdsEditor";

export const dynamic = "force-dynamic";

export default async function PlacementAdsPage({
  params,
}: {
  params: Promise<{ placementKey: string }>;
}) {
  await requireRole(["ADMIN"], "/");
  const { placementKey } = await params;

  const placement = getPlacement(placementKey);
  if (!placement) notFound();

  const ads = await prisma.ad.findMany({
    where: { placementKey },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <main className="page active">
      <div className="section-header">
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span className="section-badge">Advertisements</span>
          <Link href="/admin/ads" className="btn btn-ghost btn-xs" style={{ padding: "4px 10px" }}>
            ← All placements
          </Link>
        </div>
        <h1 className="section-title">{placement.name}</h1>
        <p className="section-sub">
          {placement.description} · {placement.width}×{placement.height}
        </p>
      </div>

      <AdsEditor placement={placement} ads={ads} />
    </main>
  );
}