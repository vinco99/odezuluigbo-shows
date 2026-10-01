import Link from "next/link";
import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export default async function OrganizerDashboard() {
    const session = await requireRole(["ADMIN", "ORGANIZER"]);

    const events = await prisma.event.findMany(
        { 
            where: session.user.role === "ADMIN" ? {} : { organizerId: session.user.id }, 
            include: { payments: true, 
            contestants: { select: { id: true } } }, 
            orderBy: { createdAt: "desc" } 
        }
    );
    
    const paidPayments = events.flatMap((event) => event.payments.filter((payment) => payment.status === "PAID"));
    const registrationRevenue = paidPayments.filter((payment) => payment.type === "CONTESTANT_REGISTRATION").reduce((total, payment) => total + payment.amount, 0);
    const voteRevenue = paidPayments.filter((payment) => payment.type === "VOTE").reduce((total, payment) => total + payment.amount, 0);

    return (
        <main className="page active">
            <section className="page-hero">
                <div className="container">
                    <span className="section-badge">Organizer Portal</span>
                    <h1>Manage Your Events</h1>
                    <p>Build events, review performance, and keep every registration and vote in view.</p>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="tv-show-stats" style={{ marginBottom: "36px" }}>
                        <div className="tv-stat">
                            <span className="tv-val">{events.length}</span>
                            <small>Events</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">{events.reduce((total, event) => total + event.contestants.length, 0)}</span>
                            <small>Contestants</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">₦{registrationRevenue.toLocaleString()}</span>
                            <small>Registration Revenue</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">₦{voteRevenue.toLocaleString()}</span>
                            <small>Vote Revenue</small>
                        </div>
                    </div>

                    
                    <div className="Section-header" style={{marginBottom: "40px", textAlign: "center"}}>
                        <span className="section-badge">Workspace</span>
                        <h2 className="section-title">Your Events</h2>
                    </div>
                    
                    <div style={{textAlign: "right", marginBottom: "36px"}}>
                        <Link href="/organizer/events/create" className="btn btn-gold">+ Create New Event</Link>
                    </div>

                    <div className="form-box" style={{overflowX: "auto"}}>
                        <table style={{width: "100%", borderCollapse: "collapse",fontSize: ".85rem", minWidth: "520px"}}>
                            <thead>
                                <tr style={{borderBottom: "1px solid var(--w10)", textAlign: "left", color: "var(--gold)", fontFamily: "var(--fd)", fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase"}}>
                                    <th style={{padding: "10px"}}>Event Name</th>
                                    <th style={{padding: "10px"}}>Category</th>
                                    <th style={{padding: "10px"}}>Registrations</th>
                                    <th style={{padding: "10px"}}>Revenue</th>
                                    <th style={{padding: "10px"}}>Status</th>
                                    <th style={{padding: "10px"}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.length === 0 ?
                                    <tr style={{borderBottom: "1px solid var(--w10)"}}>
                                        <td style={{padding: "10px"}}>Your Events Will Appear Here</td>
                                        <td style={{padding: "10px"}}>—</td>
                                        <td style={{padding: "10px"}}>—</td>
                                        <td style={{padding: "10px"}}>—</td>
                                        <td style={{padding: "10px"}}>
                                            <span style={{background: "var(--g10)", color: "var(--gold)", padding: "4px 12px", borderRadius: "20px", fontSize: ".72rem"}}>Awaiting Approval</span>
                                        </td>
                                        <td>
                                            <button className="btn btn-outline btn-xs" disabled>Manage</button>
                                        </td>
                                    </tr> :
                                    events.map((event) => {
                                        const revenue = event.payments.filter((payment) => payment.status === "PAID").reduce((total, payment) => total + payment.amount, 0);
                                        return (
                                            <tr key={event.id} style={{borderBottom: "1px solid var(--w10)"}}>
                                                <td style={{padding: "10px"}}>{event.title}</td>
                                                <td style={{padding: "10px"}} className="lowercase first-letter:uppercase">{event.type.replaceAll("_", " ")}</td>
                                                <td style={{padding: "10px"}}>{event.contestants.length}</td>
                                                <td style={{padding: "10px"}}>₦{revenue.toLocaleString()}</td>
                                                <td style={{padding: "10px"}}>
                                                    <span className={`status-badge ${event.status.toLowerCase()}`}>{event.status.toLocaleLowerCase()}</span>
                                                </td>
                                                <td>
                                                    <Link href={`/organizer/events/${event.id}`} className="btn btn-outline btn-xs">Manage Event</Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
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
