import Link from "next/link";
import Footer from "@/components/Footer";

const contestants = [
    {
        name: "Chukwudi",
        state: "Enugu",
        percentage: 68,
        image: "https://oss-macaron-user.macaron.im/photo/5d40de06-352e-46c0-a2d2-1992d5b5e993.png",
    },
    {
        name: "Adaeze",
        state: "Anambra",
        percentage: 82,
        image: "https://oss-macaron-user.macaron.im/photo/a2d925f4-f143-424b-b149-d688d4423efc.jpeg",
    },
    {
        name: "Emeka",
        state: "Imo",
        percentage: 54,
        image: "https://oss-macaron-user.macaron.im/photo/aa93cb00-3a6a-4502-8fbb-e4a98441d4c0.png",
    },
    {
        name: "Ngozi",
        state: "Abia",
        percentage: 45,
        image: "https://oss-macaron-user.macaron.im/photo/62a97ba9-558b-4c98-bfec-f3508a8319bc.jpeg",
    },
    {
        name: "Ikenna",
        state: "Ebonyi",
        percentage: 37,
        image: "https://oss-macaron-user.macaron.im/photo/d77650f5-ba53-4ce8-bc9f-81d07c8576f1.png",
    },
    {
        name: "Chioma",
        state: "Diaspora",
        percentage: 72,
        image: "https://oss-macaron-user.macaron.im/photo/59ede876-e139-48df-a0a8-f15e1dab3977.png",
    },
    {
        name: "Uchenna",
        state: "Enugu",
        percentage: 60,
        image: "https://oss-macaron-user.macaron.im/photo/bc0d26e7-02b5-47ae-baf7-3f29f4f510ad.jpeg",
    },
    {
        name: "Ifeoma",
        state: "Imo",
        percentage: 49,
        image: "https://oss-macaron-user.macaron.im/photo/9993e375-a5f0-486e-bfd9-fefcce7ecd7d.png",
    },
    {
        name: "Obinna",
        state: "Anambra",
        percentage: 55,
        image: "https://oss-macaron-user.macaron.im/photo/75f91bb6-3a48-4127-8c38-b5db13be1b2c.jpeg",
    },
    {
        name: "Amaka",
        state: "Abia",
        percentage: 76,
        image: "https://oss-macaron-user.macaron.im/photo/220f8db2-f9ac-4c81-b6cc-725c6f9c0a0d.jpeg",
    },
];

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

function ShareIcon(){
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
    );
}

function ContestantCard({
    contestant,
}: {
    contestant: (typeof contestants)[number];
}) {
    return(
        <div className="contestant-card">
            <img
                className="c-img"
                src={contestant.image}
                alt={`${contestant.name} — contestant photo`}
                style={{width: "100%", height: "235px", objectFit: "cover", objectPosition: "top center",}}
            />
            <div className="c-info">
                <h4>{contestant.name}</h4>
                <span className="c-sub">{contestant.state}</span>
                <div className="vote-bar">
                    <div className="vote-fill" style={{width: `${contestant.percentage}%`}}></div>
                </div>
                <small>{contestant.percentage}%</small>$
                <button  className="btn btn-gold btn-xs">
                    Vote
                </button>
                <button 
                    className="btn btn-outline btn-xs share-btn"  
                    title={`Share ${contestant.name}'s voting link`} 
                    aria-label={`Share ${contestant.name}`}
                >
                    <ShareIcon />
                </button>
            </div>
        </div>
    );
}


// The Page component for the Reality TV Show page
export default function RealityPage(){

    return (
        <div className="page" id="page-reality">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        </svg> {" "}
                        LIVE STREAMING 24/7
                    </div>
                    <h1>ODENIGWE</h1>
                    <p>
                        Odezuluigbo Reality TV Show — 40 contestants · 10 weeks · 
                        24-hour live streaming · ₦5,000,000 grand prize
                    </p>
                    <div className="tv-show-stats">
                        <div className="tv-stat">
                            <span className="tv-val">40</span>
                            <small>Contestants</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">10</span>
                            <small>Weeks</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">24/7</span>
                            <small>Live</small>
                        </div>
                        <div className="tv-stat">
                            <span className="tv-val">₦6M+</span>
                            <small>Prizes</small>
                        </div>
                    </div>
                    <div style={{marginTop:"32px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap"}}>
                        <Link href="/vote" className="btn btn-gold">Vote for Favourite</Link>
                        <Link href="/contestant/apply" className="btn btn-outline">Apply as Contestant</Link>
                    </div>
                </div>
            </div>
,
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Watch</span>
                        <h2 className="section-title">Promo Reel</h2>
                    </div>
                    <div className="video-ph" 
                        data-desc="VIDEO EMBED AREA: Odenigwe Reality TV Show promo trailer. Replace with YouTube embed. Thumbnail: Excited contestants in traditional attire on colourful TV stage set with 'ODENIGWE' title treatment in gold/red."
                    >
                        <div className="play-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </div>
                        <h3>Watch the Promo</h3>
                        <p>Odenigwe — Official Trailer</p>
                    </div>
                </div>
            </section>

            <section className="section" style={{background: "var(--dark-2)", borderTop: "1px solid var(--w10)", borderBottom: "1px solid var(--w10)"}}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Rewards</span>
                        <h2 className="section-title">Prizes & Awards</h2>
                    </div>
                    <div className="prizes-grid">
                        <div className="prize-card" style={{borderColor: "var(--gold)"}}>
                            <div className="prize-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                            </div>
                            <h3>Grand Winner — ODENIGWE</h3>
                            <div className="prize-amt">₦5,000,000</div>

                            <p style={{color: "var(--w70)", fontSize: ".83rem", marginTop: "7px"}}>
                                + Brand New Car + Endorsement Deals + Media Coverage
                            </p>
                        </div>
                        <div className="prize-card">
                            <div className="prize-icon">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="28" 
                                    height="28" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                                </svg>
                            </div>
                            <h3>Social Media Winner — ODENIKUKU</h3>
                            <div className="prize-amt">₦1,000,000</div>

                            <p style={{color: "var(--w70)", fontSize: ".83rem", marginTop: "7px"}}>
                                Voted entirely by fans on all social media 
                            </p>
                        </div>

                        <div className="prize-card">
                            <div className="prize-icon">
                                <TrophyIcon />
                            </div>
                            <h3>1st Runner Up</h3>
                            <div className="prize-amt">₦500,000</div>
                            <p style={{color: "var(--w70)", fontSize: ".83rem", marginTop: "7px"}}>
                                + Prizes and brand partnerships
                            </p>
                        </div>
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

                    <div 
                        id="tv-contestants" 
                        style={{display: "flex", flexDirection: "column", gap: "20px"}}
                    >
                        {contestants.map((contestant) =>(
                            <ContestantCard 
                                key={contestant.name}
                                contestant={contestant}
                            />
                        ))}
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
    );
}
