import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { JudgesManager } from "./_components/JudgesManager";

export const dynamic = "force-dynamic";

export default async function EventJudgesPage({
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
      judges: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
    },
  });

  if (!event) notFound();

  return (
    <main className="page active">
      <div className="section-header">
        <span className="section-badge">Judging Panel</span>
        <h1 className="section-title">{event.title} — Judges</h1>
        <p className="section-sub">
          Judges shown on the public event page. Only admins can add or edit them.
        </p>
      </div>
      <JudgesManager eventId={event.id} judges={event.judges} />
    </main>
  );
}