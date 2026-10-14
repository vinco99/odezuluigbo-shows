import FAQ from "./_components/FAQ";
import ApplyButton from "./_components/ApplyButton";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";
import EventTimelineCountdown from "./_components/EventTimelineCountdown";


export const dynamic = "force-dynamic";

export default async function PageantPage() {
    const SELECT = {
        id: true,
        slug: true,
        title: true,
        banner: true,
        description: true,
        eventDate: true,
        registrationStart: true,
        registrationEnd: true,
        registrationFee: true,
        votingFee: true,
        venue: true,
        state: true,
        country: true,
        status: true,
        isVotingOpen: true,
        prize1st: true,
        prize2nd: true,
        prize3rd: true,
        judges: {
        where: { active: true },
        orderBy: [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }],
        select: { id: true, name: true, title: true, image: true, bio: true },
        },
        sponsors: {
        where: { active: true },
        orderBy: [{ tier: "asc" as const }, { sortOrder: "asc" as const }],
        select: { id: true, name: true, logo: true, website: true, tier: true },
        },
        galleries: {
        select: { id: true, image: true, caption: true },
        take: 6,
        },
    } satisfies Prisma.EventSelect;

    // Prefer the oldest LIVE pageant; else the oldest APPROVED one
    const [livePageant, approvedPageant] = await Promise.all([
        prisma.event.findFirst({
            where: { type: "PAGEANT", status: "LIVE" },
            orderBy: { createdAt: "asc" },
            select: SELECT,
        }),
        prisma.event.findFirst({
            where: { type: "PAGEANT", status: "APPROVED" },
            orderBy: { createdAt: "asc" },
            select: SELECT,
        }),
    ]);

    const event = livePageant ?? approvedPageant;

    if (!event) {
        return (
        <div className="page active" id="page-pageant">
            <div className="page-hero">
            <div className="container">
                <span className="section-badge">Beauty · Intelligence · Elegance</span>
                <h1>Beauty Pageantry</h1>
                <p>Our next pageant is being prepared. Check back soon.</p>
            </div>
            </div>
            <Footer />
        </div>
        );
    }

    const statusBadge = event.status === "LIVE" ? "Live Now" : "Upcoming";
    const statusColor = event.status === "LIVE" ? "#2e8b2e" : "var(--gold)";
    const statusBg = event.status === "LIVE" ? "rgba(46,139,46,.15)" : "rgba(201,168,76,.15)";

    return (
        <div className="page active" id="page-pageant">
            <div className="page-hero" style={{background: "linearGradient(135deg,#0a0000,#1a0808,#0a0000)"}}>
                <div className="container">
                    <span className="section-badge">Beauty · Intelligence · Elegance</span>
                    <h1>{event.slug}<br/>Beauty Pageantry</h1>
                    <p>{event.description ?? "Celebrating the beauty, intelligence, elegance and excellence of the Igbo woman"}</p>
                </div>
            </div>
            <div className="pgnt-detail-strip">
                <div className="container">
                    <div className="pgnt-detail-row">

                        {event.eventDate && (
                            <div className="pgnt-detail">
                            <span>Event Date</span>
                            <strong>
                                {new Date(event.eventDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                })}
                            </strong>
                            </div>
                        )}

                        {(event.venue || event.state) && (
                            <div className="pgnt-detail">
                            <span>Location</span>
                            <strong>
                                {[event.venue, event.state, event.country].filter(Boolean).join(", ")}
                            </strong>
                            </div>
                        )}

                        {event.prize1st != null && (
                            <div className="pgnt-detail">
                            <span>Grand Prize</span>
                            <strong>₦{event.prize1st.toLocaleString()}</strong>
                            </div>
                        )}

                        {event.registrationFee > 0 && (
                            <div className="pgnt-detail">
                            <span>Registration Fee</span>
                            <strong>₦{event.registrationFee.toLocaleString()}</strong>
                            </div>
                        )}

                        {event.votingFee > 0 && (
                            <div className="pgnt-detail">
                            <span>Voting Fee</span>
                            <strong>₦{event.votingFee.toLocaleString()}</strong>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <section className="section">
                <div className="container">

                    <EventTimelineCountdown
                        registrationStart={event.registrationStart?.toISOString() ?? null}
                        registrationEnd={event.registrationEnd?.toISOString() ?? null}
                        eventDate={event.eventDate?.toISOString() ?? null}
                    />

                    <div className="about-grid" style={{marginBottom: "60px"}}>
                        <div className="about-text">
                            <span className="section-badge">About</span>
                            <h2>What is {event.slug}</h2>
                            <p>{event.description}</p>
                            <ApplyButton eventId={event.id} />
                        </div>
                        <div>
                            <img src={`${event.banner}`} className="about-visual-img"  style={{ width: '100%', borderRadius: 'var(--radius)', objectFit: 'cover' }} />
                        </div>
                    </div>

                    <div className="section-header">
                        <span className="section-badge">Requirements</span>
                        <h2 className="section-title">Eligibility Criteria</h2>
                    </div>
                    <div className="eligibility-grid" style={{marginBottom: "60px"}}>
                        <div className="elig-item"><span className="elig-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/><path d="M9 3.5v0"/><path d="M15 3.5v0"/><line x1="12" y1="11" x2="12" y2="21"/></svg></span><div><h4>Age: 16–30 Years</h4><p>You must be between 16 and 30 years old when the event takes place.</p></div></div>
                        <div className="elig-item"><span className="elig-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.82.488 3.53 1.342 5C5.204 21.5 8.3 22 12 22z"/><path d="M2 12h4"/><path d="M8 8l4 4"/><path d="M22 12c-2-3-5-5-8-5-3 0-5 2-5 5"/></svg></span><div><h4>Igbo Heritage</h4><p>You must be of Igbo descent — whether from the five Igbo-speaking states or from the diaspora.</p></div></div>
                        <div className="elig-item"><span className="elig-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span><div><h4>Education: SSCE+</h4><p>Must have minimum SSCE/WAEC or be enrolled in a tertiary institution.</p></div></div>
                        <div className="elig-item"><span className="elig-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg></span><div><h4>Single & Unmarried</h4><p>Must be single, never married, and without children at time of application.</p></div></div>
                        <div className="elig-item"><span className="elig-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/></svg></span><div><h4>Height: 5'5" Minimum</h4><p>Minimum height of 165cm. Must be in good health and physical fitness.</p></div></div>
                        <div className="elig-item"><span className="elig-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span><div><h4>Nigerian Citizen</h4><p>Must be a Nigerian citizen. Diaspora Igbos with valid Nigerian docs are welcome.</p></div></div>
                    </div>

                    {event.galleries.length > 0 && (
                    <>
                        <div className="section-header">
                        <span className="section-badge">Gallery</span>
                        <h2 className="section-title">Photo Gallery</h2>
                        </div>
                        <div className="gallery-grid" style={{ marginBottom: "60px" }}>
                        {event.galleries.map((g) => (
                            <div key={g.id} className="gallery-img">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={g.image}
                                alt={g.caption ?? "Pageant photo"}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                loading="lazy"
                            />
                            </div>
                        ))}
                        </div>
                    </>
                    )}

                    {event.judges.length > 0 && (
                    <>
                        <div className="section-header">
                        <span className="section-badge">Judges</span>
                        <h2 className="section-title">Meet the Judges</h2>
                        </div>
                        <div className="judges-grid" style={{ marginBottom: "60px" }}>
                        {event.judges.map((j) => (
                            <article className="judge-card" key={j.id}>
                            <div className="img-placeholder judge-img">
                                {j.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={j.image}
                                    alt={j.name}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                ) : (
                                <>
                                    <span className="ph-icon">👩‍⚖️</span>
                                    <span className="ph-txt">{j.name}</span>
                                </>
                                )}
                            </div>
                            <div className="judge-info">
                                <h4>{j.name}</h4>
                                {j.title && <span>{j.title}</span>}
                            </div>
                            </article>
                        ))}
                        </div>
                    </>
                    )}

                    <div className="section-cta">
                        <Link href={`/events/${event.id}/apply`} className="btn btn-outline">
                            Become a Contestant →
                        </Link>
                    </div>

                    <div className="section-header" style={{marginTop: "72px"}}>
                        <span className="section-badge">FAQ</span>
                        <h2 className="section-title">Frequently Asked Questions</h2>
                    </div>
                    <FAQ />

                </div>
            </section>
            
            <Footer />
        </div>
    )
}