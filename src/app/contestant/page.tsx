import Link from "next/link";
import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export default async function ContestantPage() {
    const session = await requireRole(["ADMIN", "CONTESTANT", "USER"]);
    const contestants = await prisma.contestant.findMany(
        { 
            where: { userId: session.user.id }, 
            include: { event: true, votes: { where: { status: "PAID" } }, payment: true }, 
            orderBy: { createdAt: "desc" } 
        }
    );
    const totalVotes = contestants.reduce((total, contestant) => total + contestant.votes.reduce((sum, vote) => sum + vote.quantity, 0), 0);
    return (
        <main className="page active">
            <section className="page-hero">
                <div className="container">
                    <span className="section-badge">Contestant Portal</span>
                    <h1>Your Competitions</h1>
                    <p>Track applications, live events, and votes received.</p>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="tv-show-stats" style={{ marginBottom: "36px" }}>
                        <div className="tv-stat">
                            <span className="tv-val">{contestants.length}</span>
                            <small>Events Entered</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">{totalVotes}</span>
                            <small>Votes Received</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">{contestants.filter((contestant) => contestant.applicationStatus === "APPROVED").length}</span>
                            <small>Approved Entries</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">{contestants.filter((contestant) => contestant.event.status === "APPROVED").length}</span>
                            <small>Running Events</small>
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-4 flex-wrap mb-6"><div>
                        <span className="section-badge">Participation</span>
                        <h2 className="section-title">Your Events</h2>
                    </div>
                    <Link href="/events" className="btn btn-gold btn-sm">Find an Event</Link>
                </div>
                    {contestants.length === 0 ? 
                        <div className="form-box">
                            <h3>No contestant entries yet</h3>
                            <p className="section-sub">Browse approved events and apply to participate.</p>
                            <Link href="/events" className="btn btn-gold btn-sm">Browse Events</Link>
                        </div> : 
                        <div className="all-events-grid">
                            {contestants.map((contestant) => { const votes = contestant.votes.reduce((total, vote) => total + vote.quantity, 0); 
                                return (
                                    <article className="event-card" key={contestant.id}>
                                        <div className="ev-body">
                                            <div className="ev-meta">
                                                <span>{contestant.applicationStatus}</span>
                                                <span>{contestant.event.status}</span>
                                            </div>
                                            <h3>{contestant.event.title}</h3>
                                            <p>{contestant.event.description}</p>
                                            <div className="ev-prize">
                                                <span>{votes} paid votes</span>
                                                <strong>{contestant.event.eventDate?.toLocaleDateString() ?? "Date TBA"}</strong>
                                            </div>
                                            <Link href={`/events/${contestant.event.id}`} className="btn btn-outline btn-sm">View Event</Link>
                                        </div>
                                    </article>
                                ); 
                            })}
                        </div>
                    }
                </div>
            </section>
        </main>
    );
}
