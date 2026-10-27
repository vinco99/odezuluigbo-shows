import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { EventStats } from "./_components/EventStats";
import { VotingSessionsPanel } from "./_components/VotingSessionsPanel";
import { JudgesPanel } from "./_components/JudgesPanel";
import { SponsorsPanel } from "./_components/SponsorsPanel";
import { EventActions } from "./_components/EventActions";
import { PrizePoolPanel } from "./_components/PrizePoolPanel";
import { VideosPanel } from "./_components/VideosPanel";
import { TicktesPanel } from "./_components/TicketsPanel";

export const dynamic = "force-dynamic";

export default async function AdminEventDetailPage({ params, }: { params: Promise<{ id: string }>; }) {
    await requireRole(["ADMIN"], "/");
    const { id } = await params;

    const event = await prisma.event.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            status: true,
            eventDate: true,
            isVotingOpen: true,
            creditLimitPerSession: true,
            state: true,
            country: true,
            prize1st: true,
            prize2nd: true,
            prize3rd: true,
            organizer: {
                select: { 
                    id: true, name: true, email: true, image: true,},
            },
            _count: {
                select: {
                contestants: { where: { applicationStatus: "APPROVED" } },
                },
            },
            judges: {
                where: { active: true },
                orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
                select: { id: true, name: true, title: true, image: true },
            },
            sponsors: {
                where: { active: true },
                orderBy: [{ tier: "asc" }, { sortOrder: "asc" }],
                select: { id: true, name: true, logo: true, website: true, tier: true },
            },
            voteSessions: {
                orderBy: { startsAt: "asc" },
            },
            videos: {
                orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
            },
            galleries: {
                where: { active: true },
                orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
                take: 6,
                select: { id: true, image: true, caption: true },
            },
            ticketPackages: {
                orderBy: { createdAt: "asc"}
            }
        },
    });

    if (!event) notFound();

    // Aggregate paid votes + revenue for this event
    const [totalVotes, revenue] = await Promise.all([
        prisma.vote.aggregate({
        where: {
            status: "PAID",
            contestant: { eventId: event.id },
        },
        _sum: { quantity: true },
        }),
        prisma.payment.aggregate({
        where: {
            eventId: event.id,
            status: "PAID",
        },
        _sum: { amount: true },
        }),
    ]);

    const isRealityShow = event.type === "REALITY_SHOW";

    return (
        <main className="admin-tab-content active">
        {/* Header */}
        <div className="section-header">
            <div>
            <span className="section-badge">{event.type.replaceAll("_", " ")}</span>
            <span
                className="section-badge"
                style={{
                background:
                    event.status === "LIVE"
                    ? "rgba(46,139,46,.15)"
                    : event.status === "PENDING"
                    ? "rgba(201,168,76,.15)"
                    : "var(--w10)",
                color:
                    event.status === "LIVE"
                    ? "#2e8b2e"
                    : event.status === "PENDING"
                    ? "var(--gold)"
                    : "var(--w30)",
                }}
            >
                {event.status}
            </span>
            </div>
            <h1 className="section-title">{event.title}</h1>
            <p className="section-sub">
            {event.eventDate
                ? new Date(event.eventDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
                : "Date not set"}
            {event.state && ` · ${event.state}`}
            {event.country && `, ${event.country}`}
            </p>
                
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>

                <EventActions id={event.id} status={event.status} />

                <span style={{ width: 1, height: 24, background: "var(--w10)" }} />

                <Link href={`/events/${event.slug}`} className="btn btn-outline btn-sm">
                    View Public Page
                </Link>
                <Link href={`/admin/events/${event.id}/tickets`} className="btn btn-gold btn-sm">
                    Manage Tickets
                </Link>
                <Link href={`/admin/events/${event.id}/judges`} className="btn btn-outline btn-sm">
                    Manage Judges
                </Link>
                <Link href={`/admin/events/${event.id}/sponsors`} className="btn btn-outline btn-sm">
                    Manage Sponsors
                </Link>
                <Link href={`/admin/events/${event.id}/galleries`} className="btn btn-outline btn-sm">
                    Manage Gallery
                </Link>
                <Link href={`/admin/events/${event.id}/videos`} className="btn btn-outline btn-sm">
                    Upload Event Video Link
                </Link>
                {isRealityShow && (
                    <Link href={`/admin/events/${event.id}/sessions`} className="btn btn-outline btn-sm">
                        Manage  Voting Sessions For Reality Events
                    </Link>
                )}
            </div>
        </div>

        {/* Organizer */}
        <section className="form-box" style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <div
                    style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--w10)",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold)",
                    fontFamily: "var(--fh)",
                    fontSize: "1.2rem",
                    flexShrink: 0,
                    }}
                >
                    {event.organizer.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={event.organizer.image}
                        alt={event.organizer.name ?? "Organizer"}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    ) : (
                    (event.organizer.name?.[0] ?? "?").toUpperCase()
                    )}
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={eyebrow}>Organized by</p>
                    <p style={{ margin: "4px 0 2px", color: "var(--white)", fontWeight: 600 }}>
                    {event.organizer.name ?? "Unnamed organizer"}
                    </p>
                    <p style={{ margin: 0, color: "var(--w30)", fontSize: ".82rem" }}>
                    {event.organizer.email}
                    </p>
                </div>
            </div>
        </section>
        {event.galleries.length > 0 && (
            <section style={{ marginBottom: 32 }}>
                <div className="section-header">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
                    <span className="section-badge">Gallery</span>
                    <h2 className="section-title" style={{ fontSize: "1.3rem" }}>Photos</h2>
                </div>
                <Link href={`/admin/events/${event.id}/galleries`} className="btn btn-outline btn-sm">
                    Manage Gallery
                </Link>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                    {event.galleries.map((g) => (
                    <div key={g.id} style={{ aspectRatio: "4 / 3", background: "var(--w10)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={g.image} alt={g.caption ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    ))}
                </div>
            </section>
        )}
            

        {/* Stats */}
        <EventStats
            votes={totalVotes._sum.quantity ?? 0}
            revenue={Number(revenue._sum.amount ?? 0)}
            contestants={event._count.contestants}
        />

        <PrizePoolPanel 
            eventId={event.id} 
            prize1st={event.prize1st} 
            prize2nd={event.prize2nd} 
            prize3rd={event.prize3rd} 
        />
        
        <TicktesPanel ticketPackages={event.ticketPackages}  />

        <VideosPanel eventId={event.id} videos={event.videos} />

        {/* Voting sessions (reality show only) */}
        {isRealityShow && (
            <VotingSessionsPanel
            eventId={event.id}
            sessions={event.voteSessions}
            eventCap={event.creditLimitPerSession}
            />
        )}

        {/* Judges */}
        <JudgesPanel eventId={event.id} judges={event.judges} />

        {/* Sponsors */}
        <SponsorsPanel sponsors={event.sponsors} />
        </main>
    );
}

const eyebrow: React.CSSProperties = {
  fontSize: ".7rem",
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--w30)",
  margin: 0,
};