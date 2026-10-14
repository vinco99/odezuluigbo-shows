import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { SponsorsManager } from "./_components/SponsorsManager";

export const dynamic = "force-dynamic";

export default async function EventSponsorsPage({
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
      sponsors: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
    },
  });

  if (!event) notFound();

  return (
    <main className="page active">
      <div className="section-header">
        <span className="section-badge">Sponsoring Panel</span>
        <h1 className="section-title">{event.title} — Sponsors</h1>
        <p className="section-sub">
          Sponsors shown on the public event page. Only admins can add or edit them.
        </p>
      </div>
      <SponsorsManager eventId={event.id} sponsors={event.sponsors} />
    </main>
  );
}