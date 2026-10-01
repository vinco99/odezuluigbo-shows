import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { StatusBage } from "./_components/StatusBage";
import { showToast } from "@/components/Toast";
import EventCountdown from "@/components/EventCountdown";
import VotePackageSelector from "@/components/VotePackageSelector";


export default async function EventDetailsPage({params}:{params: Promise<{id:string}>}){

    const {id} = await params;

    const event = await prisma.event.findUnique({
        where:{id},
        include:{
            organizer: true,
            contestants: { 
                where: { applicationStatus: "APPROVED" }, 
                include: { votes: { where: { status: "PAID" }}} 
            },
            judges: { where: { status: "APPROVED" }},
            sponsors: { where: { status: "APPROVED" }},
            votePackages: { where: { active: true }}
        }
    });


    if (!event) {
        notFound();
    }

    if (event.status !== "APPROVED") 
        notFound();

    const totalVotes = event.contestants.reduce((total, contestant) => total + contestant.votes.reduce((sum, vote) => sum + vote.quantity, 0), 0);


    return (
        <div className="page active">
            <section className="page-hero">
                <div className="container">
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                        <span className="section-badge mb-0">
                            {event.type.replaceAll("_", " ")}
                        </span>
                        <StatusBage />
                    </div>
                    <h1>{event.title}</h1>
                </div>
            </section>

            {/* ============ EVENT DETAILS STRIP ============ */}
            <div className="pgnt-detail-strip">
                <div className="container">
                    <div className="pgnt-detail-row">
                        <div className="pgnt-detail">
                            <span>Event Date</span>
                            <strong>{event.eventDate?.toLocaleDateString() ?? "To be announced"}</strong>
                            
                            <small className="block text-[0.68rem] text-w70 mt-1">
                                {event.eventDate?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) ?? "Event time TBA"}
                            </small>
                    
                        </div>
                        <div className="pgnt-detail">
                            <span>Location</span>
                            <strong>{event.venue ?? event.state ?? event.country ?? "Location TBA"}</strong>
                            
                            <small className="block text-[0.68rem] text-w70 mt-1">
                                Event location
                            </small>

                        </div>
                        <div className="pgnt-detail">
                            <span>Winner Prize</span>
                            <strong>{event.type.replaceAll("_", " ")}</strong>
                        </div>
                        <div className="pgnt-detail">
                            <span>Voting Fee</span>
                            <strong>₦{event.votingFee} / vote</strong>
                        </div>
                        <div className="pgnt-detail">
                            <span>Registration Fee</span>
                            <strong>₦{event.registrationFee.toLocaleString()}</strong>
                        </div>
                        <div className="pgnt-detail">
                            <span>Event countdown</span>
                            <EventCountdown target={event.eventDate?.toISOString() ?? null} />
                        </div>
                        <div className="pgnt-detail">
                            <span>Organizer</span>
                            <strong>{event.organizer.name}</strong>
                        
                            <small className="block text-[0.68rem] text-gold mt-1">
                            ✓ Verified
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============ ABOUT / DESCRIPTION ============ */}
            <section className="section">
                <div className="container">
                <div className="about-grid" style={{ marginBottom: "60px" }}>
                    <div className="about-text">
                        <span className="section-badge">About This Event</span>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>

                        <div className="flex flex-wrap gap-3 mt-7">
                            <a href={`/events/${event.id}/apply`} className="btn btn-gold">
                                Apply to Participate →
                            </a>
                            <a href="/vote" className="btn btn-outline">
                                Vote Now
                            </a>
                        </div>

                        <p className="text-[0.78rem] text-w70 mt-4">
                            ⏳ Application Deadline:{" "}
                            <strong className="text-gold">{event.registrationEnd?.toLocaleDateString() ?? "No deadline set"}</strong>
                        </p>
                    </div>

                    <div>
                    
                        {event.banner || event.logo ? 
                            <img className="about-visual-img" src={event.banner ?? event.logo ?? ""} alt={event.title} /> : 
                            <div className="img-placeholder about-visual-img" data-desc={`${event.title} — event banner image pending upload`}>
                                <span className="ph-icon">🎭</span>
                                <span className="ph-txt">{event.title}</span>
                            </div>
                        }
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="tv-show-stats" style={{ marginBottom: "60px" }}>
                    <div className="tv-stat">
                        <span className="tv-val">
                            {event.contestants.length}
                        </span>
                        <small>Contestants</small>
                    </div>
                    <div className="tv-stat">
                        <span className="tv-val">
                            {totalVotes}
                        </span>
                        <small>Total Votes</small>
                    </div>
                    <div className="tv-stat">
                        <span className="tv-val">{event.registrationFee.toLocaleString()}</span>
                        <small>Registration Fee</small>
                    </div>
                    <div className="tv-stat">
                        <span className="tv-val">{event.judges.length}</span>
                        <small>Judges</small>
                    </div>
                    <div className="tv-stat">
                        <span className="tv-val">{event.sponsors.length}</span>
                        <small>Sponsors</small>
                    </div>
                </div>

                {/* Prizes */}
                <div className="section-header">
                    <span className="section-badge">Rewards</span>
                    <h2 className="section-title">Prize Breakdown</h2>
                </div>
                <div className="prizes-grid" style={{ marginBottom: "60px" }}>
                    <div className="prize-card" style={{ borderColor: "var(--gold)" }}>
                        <div className="prize-icon">👑</div>
                        <h3>Winner</h3>
                        <div className="prize-amt">See event details</div>
                    </div>

                    {/* Runner Up*/}
                    <div className="prize-card">
                        <div className="prize-icon">🥈</div>
                        <h3>1st Runner Up</h3>
                        <div className="prize-amt">See event details</div>
                    </div>

                    {/*Second runner up*/}
                    <div className="prize-card">
                        <div className="prize-icon">🥉</div>
                        <h3>2nd Runner Up</h3>
                        <div className="prize-amt">See event details</div>
                    </div>

                </div>

                {/* ============ CONTESTANTS ============ */}
                <div className="section-header">
                    <span className="section-badge">Vote</span>
                    <h2 className="section-title">Meet the Contestants</h2>
                    <p className="section-sub">
                        Vote for your favourite — 1 credit = 1 vote · ₦{event.votingFee} per vote
                    </p>
                </div>

                <div className="contestants-grid" style={{ marginBottom: "24px" }}>
                    {event.contestants.map((c, index) => (
                    <div
                        key={c.id}
                        className="contestant-card"
                        data-aos
                        style={{ transitionDelay: `${index * 80}ms` }}
                    >
                        <div className="img-placeholder c-img" data-desc={`Contestant #`}>
                        
                            {c.photo ? (
                                <img
                                    src={c.photo}
                                    alt={c.name}
                                    className="w-full h-full object-cover"
                                />

                                ) : (
                                <>
                                    <span className="ph-icon">👤</span>
                                    <span className="ph-txt">
                                        {c.name}
                                        <br />
                                        #1
                                    </span>
                                </>)
                            }
                        </div>
                        <div className="c-info">
                            <h4>{c.name}</h4>
                            <span className="c-sub">
                                #2
                            </span>
                            {c.bio && (
                                <p className="text-[0.75rem] text-w70 mb-3 leading-normal">
                                {c.bio}
                                </p>
                            )}
                            <div className="vote-bar">
                                <div className="vote-fill" style={{ width: `${c.votes}%` }}/>
                            </div>
                            <small>
                                {c.votes.reduce((total, vote) => total + vote.quantity, 0)} votes
                            </small>
                            <div className="flex gap-2 justify-center mt-3 flex-wrap">
                                <button className="btn btn-gold btn-xs">
                                    Vote
                                </button>
                                {event.isVotingOpen && <VotePackageSelector contestantId={c.id} packages={event.votePackages} />}
                                <button
                                    className="btn btn-outline btn-xs share-btn"
                                    title={`Share ${c.name}'s voting link`}
                                >
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="section-cta">
                    <a href="/vote" className="btn btn-gold">
                    View All Contestants & Vote →
                    </a>
                </div>

                {/* ============ JUDGES ============ */}
                <div className="section-header" style={{ marginTop: "72px" }}>
                    <span className="section-badge">Panel</span>
                    <h2 className="section-title">Meet the Judges</h2>
                    <p className="section-sub">
                    Distinguished experts scoring beauty, intelligence, culture & talent
                    </p>
                </div>
                <div className="judges-grid" style={{ marginBottom: "60px" }}>
                    {event.judges.map((j) => (
                    <div key={j.id} className="judge-card">
                        <div className="img-placeholder judge-img" data-desc={`${j.name} — ${j.title}`}>
                        {j.image ? (
                            <img
                            src={j.image}
                            alt={j.name}
                            className="w-full h-full object-cover"
                            />
                        ) : (
                            <>
                            <span className="ph-icon">👨‍⚖️</span>
                            <span className="ph-txt">{j.name}</span>
                            </>
                        )}
                        </div>
                        <div className="judge-info">
                            <h4>{j.name}</h4>
                            <span>{j.title}</span>
                            <small className="block text-[0.7rem] text-w70 mt-1">
                                {/*event.category*/}
                                event category
                            </small>
                        </div>
                    </div>
                    ))}
                </div>

                {/* ============ SPONSORS ============ */}
                <div className="section-header">
                    <span className="section-badge">Partners</span>
                    <h2 className="section-title">Our Sponsors</h2>
                    <p className="section-sub">
                    Brands and institutions making this event possible
                    </p>
                </div>
                <div className="sponsors-flex" style={{ marginBottom: "24px" }}>
                    {event.sponsors.map((s) => (
                    <div key={s.id} className="sponsor-logo">
                        <div
                            className="img-placeholder sponsor-img"
                            data-desc={`${s.name}`}
                        >
                        {s.logo ? (
                            <img
                            src={s.logo}
                            alt={s.name}
                            className="w-full h-full object-contain"
                            />
                        ) : (
                            <>
                            <span className="ph-txt">{s.name}</span>
                                <span className="text-[0.55rem] text-gold uppercase tracking-widest mt-1">
                                    close sponsor
                                </span>
                            </>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
                <div className="section-cta">
                    <a href="/contact" className="btn btn-outline">
                        Become a Sponsor →
                    </a>
                </div>
                </div>
            </section>
        </div>
    );
}