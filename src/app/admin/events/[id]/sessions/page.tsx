import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { SessionsManager } from "./_components/SessionsManager";

export const dynamic = "force-dynamic";

export default async function EventSessionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole(["ADMIN"], "/");
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      type: true,
      status: true,
      creditLimitPerSession: true,
      voteSessions: {
        orderBy: { startsAt: "asc" },
      },
    },
  });

  if (!event) notFound();

  const isRealityShow = event.type === "REALITY_SHOW";

  return (
    <main className="page active">
      <div className="section-header">
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span className="section-badge">Voting Schedule</span>
          <Link
            href={`/admin/events/${event.id}`}
            className="btn btn-ghost btn-xs"
            style={{ padding: "4px 10px" }}
          >
            ← Back to event
          </Link>
        </div>
        <h1 className="section-title">{event.title}</h1>
        <p className="section-sub">
          Sessions limit when credits can be spent and how many per user. Money votes bypass
          all session limits.
        </p>
      </div>

      {!isRealityShow ? (
        <div className="form-box">
          <h3 style={{ fontFamily: "var(--fh)", fontSize: "1.05rem", marginBottom: 8 }}>
            Sessions are for reality shows only
          </h3>
          <p className="section-sub" style={{ margin: 0 }}>
            This event is a <strong>{event.type.replaceAll("_", " ")}</strong>. Voting on
            pageants and other event types isn&apos;t session-restricted. If you need a
            platform-wide credit cap, set it below.
          </p>
        </div>
      ) : (
        <SessionsManager
          eventId={event.id}
          eventCap={event.creditLimitPerSession}
          sessions={event.voteSessions}
        />
      )}
    </main>
  );
}