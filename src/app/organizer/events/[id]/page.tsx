import Link from "next/link";
import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditEventForm from "./EditEventForm";
import PeopleForm from "./PeopleForm";

export default async function ManageEventPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await requireRole(["ADMIN", "ORGANIZER"]);
    const { id } = await params;
    const event = await prisma.event.findUnique(
        { 
            where: { id }, 
            include: { 
                contestants: true, 
                judges: true, 
                sponsors: true, 
                payments: true, 
                votePackages: { where: { active: true } } 
            } 
        }
    );
    if (!event || (session.user.role === "ORGANIZER" && event.organizerId !== session.user.id)) 
        notFound();
    const paidVotes = event.payments.filter(
        (payment) => payment.status === "PAID" &&
         payment.type === "VOTE").reduce((total, payment) => total + payment.amount, 0
    );
    const paidRegistrations = event.payments.filter(
        (payment) => payment.status === "PAID" &&
         payment.type === "CONTESTANT_REGISTRATION").reduce((total, payment) => total + payment.amount, 0
    );
    
    return (
        <main className="page active">
            <section className="page-hero">
                <div className="container">
                    <Link href="/organizer/events" className="btn btn-ghost btn-sm" style={{float: "left"}}>← All Events</Link>
                    <span className="section-badge" style={{ marginTop: "18px" }}>
                        {event.status}
                    </span>
                    <h1>{event.title}</h1>
                    <p>{event.description}</p>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="tv-show-stats" style={{ marginBottom: "40px" }}>
                        <div className="tv-stat">
                            <span className="tv-val">{event.contestants.length}</span>
                            <small>Contestants</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">₦{paidRegistrations.toLocaleString()}</span>
                            <small>Registration Revenue</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">₦{paidVotes.toLocaleString()}</span>
                            <small>Vote Revenue</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">{event.isVotingOpen ? "Open" : "Closed"}</span>
                            <small>Voting</small>
                        </div>
                    </div>
                    <EditEventForm 
                        event={
                            { ...event, 
                                registrationStart: event.registrationStart?.toISOString() ?? null, 
                                registrationEnd: event.registrationEnd?.toISOString() ?? null, 
                                eventDate: event.eventDate?.toISOString() ?? null 
                            }
                        } 
                    />
                    <PeopleForm eventId={event.id} />
                </div>
            </section>

            <footer className="footer">
            <div className="container">
                <div className="footer-bottom"><p>© 2025 Odezuluigbo Global Ltd. All Rights Reserved.</p></div>
            </div>
            </footer>
        </main>
    );
}
