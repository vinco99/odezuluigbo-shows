import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { TicketsManager } from "./_components/TicketsManager";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EventTicketsPage({
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
        ticketPackages: {
                select:{
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    perks: true,
                    maxQuantity: true,
                    active: true,
                    eventId: true,
                    createdAt: true,
                    _count: {
                        select: {
                            tickets: {
                                where: {
                                    status: {
                                    in: ["VALID", "CHECKED_IN"],
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!event) notFound();

    const ticketsWithSold = event.ticketPackages.map((ticketPackage) => ({
        id: ticketPackage.id,
        name: ticketPackage.name,
        description: ticketPackage.description ?? "",
        price: ticketPackage.price,
        perks: ticketPackage.perks,
        maxQuantity: ticketPackage.maxQuantity,
        active: ticketPackage.active,
        eventId: ticketPackage.eventId,
        createdAt: ticketPackage.createdAt,
        sold: ticketPackage._count.tickets,
    }));


  return (
    <main className="page active">
      <div className="section-header">
        <span className="section-badge">Tickets Panel</span>
        <h1 className="section-title">{event.title} — Tickets</h1>
        <p className="section-sub">
          Tickets shown on the public event page. Only admins can add or edit them.
        </p>
      </div>
      <Link href={`/admin/events/${id}`} className="btn btn-outline">Back to Event Admin</Link>
      <TicketsManager eventId={event.id} ticketPackages={ticketsWithSold} />
    </main>
  );
}