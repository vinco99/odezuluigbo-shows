import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { GalleriesManager } from "./_components/GalleriesManager";

export const dynamic = "force-dynamic";

export default async function EventGalleriesPage({
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
      galleries: {
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  if (!event) notFound();

  return (
    <main className="page active">
      <div className="section-header">
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span className="section-badge">Gallery</span>
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
          Photos shown in the gallery section on the public event page.
        </p>
      </div>

      <GalleriesManager eventId={event.id} images={event.galleries} />
    </main>
  );
}