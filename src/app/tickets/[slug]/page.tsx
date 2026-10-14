import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { TicketPackage } from "./TicketPackage";

export default async function SelectTicket({ params, }: { params: Promise<{ slug: string }>; }) {

    const { slug } = await params;

    const event = await prisma.event.findUnique({
        where: { slug },
        include: { ticketPackages: { where: { active: true } } },
    });

    if (!event) notFound();

    if (event.status !== "LIVE") {
        return (
        <div id="ticketStep2">
            <Link href="/tickets" className="btn btn-outline btn-sm" style={{ marginBottom: 24 }}>
            ← Back to Events
            </Link>
            <div className="section-header">
            <span className="section-badge">Not Available</span>
            <h2 className="section-title">Tickets aren’t on sale yet</h2>
            </div>
            <p style={{ color: "var(--w70)" }}>
            {event.title} is currently <strong>{event.status.toLowerCase()}</strong>.
            </p>
        </div>
        );
    }

    return (
        <div id="ticketStep2">
            <Link href="/tickets" className="btn btn-outline btn-sm" style={{ marginBottom: 24 }}>
                ← Back to Events
            </Link>
            <div className="section-header">
                <span className="section-badge">Step 2 of 3</span>
                <h2 className="section-title" id="ticketStep2Title">
                Choose Your Ticket — {event.title}
                </h2>
            </div>
            <div
                className="events-grid"
                id="ticketPackageGrid"
                style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}
            >
                {event.ticketPackages.length === 0 ? (
                    <p style={{ color: "var(--w70)" }}>No ticket packages available for this event yet.</p>
                ) : (
                    event.ticketPackages.map((pkg) => (
                        <TicketPackage key={pkg.id} pkg={pkg} slug={slug} />
                    ))
                )}
            </div>
        </div>
    );
}