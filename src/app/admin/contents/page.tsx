import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { AD_PLACEMENTS } from "@/lib/ad-placements";
import { PlacementsOverview } from "./_components/ads/PlacementsOverview";
import { BlogTable } from "./_components/blog/BlogTable";
import { SongsManager } from "./_components/song/SongsManager";


export const dynamic = "force-dynamic";


export default async function AdminContentPage () {
    await requireRole(["ADMIN"], "/");

    const songs = await prisma.song.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    const now = new Date();
    const allAds = await prisma.ad.findMany({
        orderBy: [{ placementKey: "asc" }, { sortOrder: "asc" }],
    });

    // Group ads by placement for the UI
    const byPlacement: Record<string, typeof allAds> = {};
    for (const p of AD_PLACEMENTS) byPlacement[p.key] = [];
    for (const ad of allAds) byPlacement[ad.placementKey]?.push(ad);

    return (
        <div className="admin-tab-content active" id="admin-tab-content">

            <div className="section-header">
                <span className="section-badge">Advertisements</span>
                <h1 className="section-title">Ad Placements</h1>
                <p className="section-sub">
                    Every banner slot on the site, with its currently live ad.
                </p>
            </div>

            <PlacementsOverview placements={AD_PLACEMENTS} adsByPlacement={byPlacement} now={now} />

            <div className="section-header">
                <span className="section-badge">Now Streaming</span>
                <h1 className="section-title">Homepage Song Promo</h1>
                <p className="section-sub">
                The "Now Streaming" cards on the homepage. The two most recent active songs appear.
                </p>
            </div>

            <SongsManager songs={songs} />

            <BlogTable />    
        </div>
    );
}