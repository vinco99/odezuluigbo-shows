import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import Footer from "@/components/Footer";
import Link from "next/link";
import { VoteButton } from "@/components/vote/VoteButton";
import { DEFAULT_VOTING_FEE_NAIRA, } from "@/lib/voting-config";
import { VoteProvider } from "@/components/vote/VoteProvider";
import { auth } from "@/lib/auth";
import { EventVideoPlayer } from "@/components/events/EventVideoPlayer";
import { getVoteContextForEvents } from "@/lib/voting-server";
import { ShareButton } from "../vote/_components/ShareButton";

const REALITY_SELECT = {
  id: true,
  slug: true,
  title: true,
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
  creditLimitPerSession: true,
  contestants: {
    where: { applicationStatus: "APPROVED" },
    select: {
      id: true,
      name: true,
      portrait: true,
      state: true,
      city: true,
      votes: {
        where: { status: "PAID" },
        select: { quantity: true },
      },
    },
  },
  videos: {
    where: { active: true },
    orderBy: [
      { isPrimary: "desc" },
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
    select: { id: true, youtubeId: true, title: true, description: true, kind: true },
  },
  judges: {
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true, name: true, title: true, image: true },
  },
  sponsors: {
    where: { active: true },
    orderBy: [{ tier: "asc" }, { sortOrder: "asc" }],
    select: { id: true, name: true, logo: true, website: true, tier: true },
  },
  voteSessions: {
    orderBy: { startsAt: "asc" },
  },
} satisfies Prisma.EventSelect;


function TrophyIcon({ size = 28}: { size?: number }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
            <path d="M4 22h16"/>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
        </svg>
    );
}


// The Page component for the Reality TV Show page
export const dynamic = "force-dynamic";

export default async function RealityPage() {

    const session = await auth();

    const [liveReality, approvedReality] = await Promise.all([
        prisma.event.findFirst({
        where: { type: "REALITY_SHOW", status: "LIVE" },
        orderBy: { createdAt: "asc" },
        select: REALITY_SELECT,
        }),
        prisma.event.findFirst({
        where: { type: "REALITY_SHOW", status: "APPROVED" },
        orderBy: { createdAt: "asc" },
        select: REALITY_SELECT,
        }),
    ]);

    const eventOrNull = liveReality ?? approvedReality;

    if (!eventOrNull) {
        return (
        <div className="page active" id="page-reality">
            <div className="page-hero">
            <div className="container">
                <h1>Reality TV Show</h1>
                <p>Our next show is being prepared. Check back soon.</p>
            </div>
            </div>
            <Footer />
        </div>
        );
    }

    const event = eventOrNull;  

    const { walletBalance, sessionInfoByEvent } = await getVoteContextForEvents(session?.user?.id, [event.id],);

    const totalVotes = event.contestants.reduce(
        (sum, c) => sum + c.votes.reduce((s, v) => s + v.quantity, 0),
        0,
    );

    const totalPrizePool =
    (event.prize1st ?? 0) + (event.prize2nd ?? 0) + (event.prize3rd ?? 0);

    const contestantCount = event.contestants.length;
    const sessionCount = event.voteSessions.length;

    return (
        <VoteProvider walletBalance={walletBalance} sessionInfoByEvent={sessionInfoByEvent} isLoggedIn={!!session?.user.id} >
        <div className="page active" id="page-reality">
            <div className="page-hero" style={{background: "linear-gradient(135deg,#000510,#001020,#000510)"}}>
                <div className="container">
                    <div style={{display: "inline-block",
                            background: "linear-gradient(135deg,var(--red),var(--red-light))",
                            color: "var(--white)",
                            fontSize: ".68rem",
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            padding: "6px 16px", 
                            borderRadius:"30px",
                            marginBottom: "16px",
                            fontWeight: "700",
                            animation: "pulse-red 2s infinite"
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink: 0}}>
                        <circle cx="12" cy="12" r="10"/>
                        </svg> LIVE STREAMING 24/7
                    </div>
                    <h1>ODENIGWE</h1>
                    <p>
                        Odezuluigbo Reality TV Show — 40 contestants · 10 weeks · 
                        24-hour live streaming · ₦5,000,000 grand prize
                    </p>
                    <div className="tv-show-stats">
                        <div className="tv-stat">
                            <span className="tv-val">{contestantCount}</span>
                            <small>Contestants</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">{sessionCount || 10}</span>
                            <small>Weeks</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">24/7</span>
                            <small>Live</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">
                            {totalPrizePool > 0 ? `₦${(totalPrizePool / 1_000_000).toFixed(1).replace(/\.0$/, "")}M` : "—"}
                            </span>
                            <small>Prizes</small>
                        </div>
                    </div>
                    <div style={{marginTop:"32px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap"}}>
                        <Link href={`/events/${event.id}`} className="btn btn-gold">Vote for Favourite</Link>
                        <Link href={`/events/${event.id}/apply`} className="btn btn-outline">Apply as Contestant</Link>
                    </div>
                </div>
            </div>

            {event.videos.length > 0 ? (
                <section className="section">
                    <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Watch</span>
                        <h2 className="section-title">Promo Reel</h2>
                    </div>
                    <EventVideoPlayer
                        primary={event.videos[0]}
                        others={event.videos.slice(1)}
                    />
                    </div>
                </section>
            ) : null}

            <section className="section" style={{background: "var(--dark-2)", borderTop: "1px solid var(--w10)", borderBottom: "1px solid var(--w10)"}}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Rewards</span>
                        <h2 className="section-title">Prizes & Awards</h2>
                    </div>
                    <div className="prizes-grid">
                        {event.prize1st != null && (
                            <div className="prize-card" style={{ borderColor: "var(--gold)" }}>
                            <div className="prize-icon">
                                <TrophyIcon size={28} />
                            </div>
                            <h3>Grand Prize</h3>
                            <div className="prize-amt">₦{event.prize1st.toLocaleString()}</div>
                            </div>
                        )}

                        {event.prize2nd != null && (
                            <div className="prize-card">
                            <div className="prize-icon"><TrophyIcon size={28} /></div>
                            <h3>Runner-Up</h3>
                            <div className="prize-amt">₦{event.prize2nd.toLocaleString()}</div>
                            </div>
                        )}

                        {event.prize3rd != null && (
                            <div className="prize-card">
                            <div className="prize-icon"><TrophyIcon size={28} /></div>
                            <h3>Second Runner-Up</h3>
                            <div className="prize-amt">₦{event.prize3rd.toLocaleString()}</div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Contestants</span>
                        <h2 className="section-title">Meet the Contestants</h2>
                        <p className="section-sub">
                            40 incredible Igbo talents competing for the grand prize
                        </p>
                    </div>

                    
                    <div id="tv-contestants" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>

                        {event.contestants.map((c) => {
                            const votes = c.votes.reduce((s, v) => s + v.quantity, 0);
                            const percent =
                                totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);

                            return (
                                
                                <div className="contestant-card" key={c.id}>
                                <img
                                    className="c-img"
                                    src={c.portrait ?? "/placeholder.png"}
                                    alt={c.name}
                                    style={{ width: "100%", height: 235, objectFit: "cover", objectPosition: "top center" }}
                                />
                                <div className="c-info">
                                    <h4>{c.name}</h4>
                                    <span className="c-sub">{c.state ?? c.city ?? "Contestant"}</span>

                                    <div className="vote-bar">
                                    <div className="vote-fill" style={{ width: `${percent}%` }} />
                                    </div>

                                    <small>
                                    {percent}% · {votes.toLocaleString()} votes
                                    </small>

                                    <VoteButton
                                        contestantId={c.id}
                                        contestantName={c.name}
                                        eventId={event.id}
                                        eventTitle={event.title}
                                        isRealityShow
                                        votingFee={event.votingFee > 0 ? event.votingFee : DEFAULT_VOTING_FEE_NAIRA}
                                    />

                                    <ShareButton contestantName={c.name} contestantId={c.id} />
                                </div>
                                </div>
                                
                            );
                        })}
                    </div>
                    <div className="section-cta">
                        <p style={{color:"var(--w70)",marginBottom:"14px"}}>Showing 10 of 40 contestants</p>
                        <Link className="btn btn-gold" href="/vote">View All & Vote →</Link>
                    </div>
                </div>
            </section>

            <section className="section" style={{background: "var(--dark-2)", borderTop: "1px solid var(--w10)"}}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Schedule</span>
                        <h2 className="section-title">Show Timeline</h2>
                        <p className="section-sub">10 weeks of live Igbo entertainment</p>
                    </div>
                    <div className="timeline-steps">
                        <div className="tl-step">
                            <div className="tl-dot">1</div>
                            <div className="tl-content">
                                <h4>Week 1–2: Introductions & Challenges</h4>
                                <p>Contestants move into the house. Cultural challenges, talent showcases begin. Public voting opens.</p>
                            </div>
                        </div>
                        <div className="tl-step">
                            <div className="tl-dot">2</div>
                            <div className="tl-content">
                                <h4>Week 3–4: Cultural Immersion Tasks</h4>
                                <p>Traditional cooking, Igbo language challenges, craft competitions, and storytelling sessions.</p>
                            </div>
                        </div>
                        <div className="tl-step">
                            <div className="tl-dot">3</div>
                            <div className="tl-content">
                                <h4>Week 5–6: Talent Showcase</h4>
                                <p>Each contestant performs before judges and a live audience. Elimination voting intensifies.</p>
                            </div>
                        </div>
                        <div className="tl-step">
                            <div className="tl-dot">4</div>
                            <div className="tl-content">
                                <h4>Week 7–8: Drama & Strategy</h4>
                                <p>Alliances form, strategies unfold, key evictions happen. The most dramatic weeks of the show.</p>
                            </div>
                        </div>
                        <div className="tl-step">
                            <div className="tl-dot">5</div>
                            <div className="tl-content">
                                <h4>Week 9: Semi-Finals</h4>
                                <p>Top 5 compete in final challenges. Public vote determines who advances to the grand finale.</p>
                            </div>
                        </div>
                        <div className="tl-step">
                            <div className="tl-dot">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                                </svg>
                            </div>
                            <div className="tl-content">
                                <h4>Week 10: Grand Finale</h4>
                                <p>ODENIGWE (₦5M + car) and ODENIKUKU (₦1M social media winner) are crowned live.</p>
                            </div>
                        </div>
                    </div>

                    <div className="section-cta">
                        <Link href="/vote" className="btn btn-gold" >Start Voting Now →</Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
        </VoteProvider>
    )
}
