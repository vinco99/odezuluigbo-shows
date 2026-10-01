import Link from "next/link";
import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export default async function OrganizerEvents() {
    const session = await requireRole(["ADMIN", "ORGANIZER"]);

    const events = await prisma.event.findMany(
        { 
            where: session.user.role === "ADMIN" ? {} : { organizerId: session.user.id }, 
            include: { _count: { select: { contestants: true, judges: true, sponsors: true } } }, 
            orderBy: { createdAt: "desc" } 
        }
    );
    return (
        <main className="page active">
            <section className="page-hero">
                <div className="container">
                    <span className="section-badge">Workspace</span>
                    <h1>Events</h1>
                    <p>Update schedules, review applications, and manage your event teams.</p>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="flex justify-between items-center gap-4 flex-wrap mb-8">
                        <h2 className="section-title">Manage Events</h2>
                        <Link href="/organizer/events/create" className="btn btn-gold">Create Event</Link>
                    </div>
                    <div className="all-events-grid" style={{marginTop: "20px"}}>
                        {events.map((event) => 
                            <article className="blog-card" key={event.id}>
                                {event.banner ? <img className="b-img" src={event.banner} alt={event.title} /> : <div className="b-img img-placeholder" />}
                                <div className="b-body">
                                    <div className="b-cat">{event.status}</div>
                                    <h4>{event.title}</h4>
                                    <p>{event.type}</p>
                                    <p>{event.description}</p>
                                    <p className="section-sub">
                                        {event._count.contestants} contestants · {event._count.judges} judges · {event._count.sponsors} sponsors
                                    </p>
                                    <Link href={`/organizer/events/${event.id}`} className="btn btn-outline btn-sm">Edit Event</Link>
                                </div>
                            </article>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
