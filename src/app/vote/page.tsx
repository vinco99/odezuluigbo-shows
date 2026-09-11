import { useState } from "react";
import Footer from "@/components/Footer";

type TabId = 'tab-packages' | 'tab-pageant' | 'tab-reality' | 'tab-tasks';

const contestants = [
    {
        name: "Chukwudi",
        state: "Enugu",
        percentage: 68,
        image: "https://oss-macaron-user.macaron.im/photo/5d40de06-352e-46c0-a2d2-1992d5b5e993.png",
        contest: "peagent",
    },
    {
        name: "Adaeze",
        state: "Anambra",
        percentage: 82,
        image: "https://oss-macaron-user.macaron.im/photo/a2d925f4-f143-424b-b149-d688d4423efc.jpeg",
        contest: "peagent",
    },
    {
        name: "Emeka",
        state: "Imo",
        percentage: 54,
        image: "https://oss-macaron-user.macaron.im/photo/aa93cb00-3a6a-4502-8fbb-e4a98441d4c0.png",
        contest: "peagent",
    },
    {
        name: "Ngozi",
        state: "Abia",
        percentage: 45,
        image: "https://oss-macaron-user.macaron.im/photo/62a97ba9-558b-4c98-bfec-f3508a8319bc.jpeg",
        contest: "peagent",
    },
    {
        name: "Ikenna",
        state: "Ebonyi",
        percentage: 37,
        image: "https://oss-macaron-user.macaron.im/photo/d77650f5-ba53-4ce8-bc9f-81d07c8576f1.png",
        contest: "peagent",
    },
    {
        name: "Chioma",
        state: "Diaspora",
        percentage: 72,
        image: "https://oss-macaron-user.macaron.im/photo/59ede876-e139-48df-a0a8-f15e1dab3977.png",
        contest: "reality",
    },
    {
        name: "Uchenna",
        state: "Enugu",
        percentage: 60,
        image: "https://oss-macaron-user.macaron.im/photo/bc0d26e7-02b5-47ae-baf7-3f29f4f510ad.jpeg",
        contest: "reality",
    },
    {
        name: "Ifeoma",
        state: "Imo",
        percentage: 49,
        image: "https://oss-macaron-user.macaron.im/photo/9993e375-a5f0-486e-bfd9-fefcce7ecd7d.png",
        contest: "reality",
    },
    {
        name: "Obinna",
        state: "Anambra",
        percentage: 55,
        image: "https://oss-macaron-user.macaron.im/photo/75f91bb6-3a48-4127-8c38-b5db13be1b2c.jpeg",
        contest: "reality",
    },
    {
        name: "Amaka",
        state: "Abia",
        percentage: 76,
        image: "https://oss-macaron-user.macaron.im/photo/220f8db2-f9ac-4c81-b6cc-725c6f9c0a0d.jpeg",
        contest: "reality",
    },
];


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
            </div>
        </div>
    );
}

export default function VotePage() {
    const [activeTab, setActiveTab] = useState<TabId>('tab-packages');


    return (
        <div className="page active" id="page-voting">
            <div className="page-hero">
                <div className="container">
                    <span className="section-badge">Cast Your Vote</span>
                    <h1>Vote Now</h1>
                    <p>Support your favourite contestant with real votes — purchase via Paystack</p>
                </div>
            </div>
            <section className="section">
                <div className="container">

                    <div className="ad-banner"><p>Advertisement</p><div className="ad-img-ph" data-desc="AD BANNER: 728×90 leaderboard advertisement. Sponsor ad displayed before voting. Replace with Google AdSense code or sponsor banner image.">[ Advertisement Banner — 728×90 ]</div></div>

                    <div className="vote-tabs">
                        <div className={`vote-tab ${activeTab === 'tab-packages' ? 'active' : ''}`} onClick={() => setActiveTab('tab-packages')}>Vote Packages</div>
                        <div className={`vote-tab ${activeTab === 'tab-pageant' ? 'active' : ''}`} onClick={() => setActiveTab('tab-pageant')}>Pageant Votes</div>
                        <div className={`vote-tab ${activeTab === 'tab-reality' ? 'active' : ''}`} onClick={() => setActiveTab('tab-reality')}>Reality TV Votes</div>
                        <div className={`vote-tab ${activeTab === 'tab-tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tab-tasks')}>Earn Free Votes</div>
                    </div>

                    {activeTab === 'tab-packages' && (
                        <div className="vote-tab-content active" id="tab-packages">
                            <div className="section-header">
                                <span className="section-badge">Packages</span><h2 className="section-title">Choose a Voting Package</h2>
                                <p className="section-sub">Registration Fee: ₦2,500 per show · Includes 500 votes split across 10 voting sessions</p>
                            </div>
                            <div className="vote-packages">
                            <div className="vote-pkg">
                                <h3>Starter Pack</h3>
                                <div className="pkg-price">₦2,500</div>
                                <ul><li>500 votes total</li><li>10 voting sessions</li><li>6 days of voting</li><li>Valid for one show</li></ul>
                                <button className="btn btn-outline btn-full" >Get Started →</button>
                            </div>
                            <div className="vote-pkg feat-pkg">
                                <div className="pkg-badge-top">MOST POPULAR</div>
                                <h3>Power Voter</h3>
                                <div className="pkg-price">₦5,000</div>
                                <ul><li>1,000 votes + 100 bonus</li><li>Priority voting sessions</li><li>Voting across 2 shows</li><li>Vote tracking dashboard</li></ul>
                                <button className="btn btn-gold btn-full" >Get Started →</button>
                            </div>
                            <div className="vote-pkg">
                                <h3>Champion Pack</h3>
                                <div className="pkg-price">₦10,000</div>
                                <ul><li>2,500 votes + 500 bonus</li><li>All shows access</li><li>VIP voting sessions</li><li>Exclusive leaderboard</li></ul>
                                <button className="btn btn-outline btn-full" >Get Started →</button>
                            </div>
                            </div>
                            <div style={{ background: "var(--dark-2)", border: "1px solid var(--g20)", borderRadius: "var(--radius-lg)", padding: "28px", marginTop: "32px", textAlign: "center" }}>
                            <h3 style={{ fontFamily: "var(--fh)", fontSize: "1.3rem", marginBottom: "10px" }}>Need More Votes?</h3>
                            <p style={{ color: "var(--w70)", fontSize: ".88rem", marginBottom: "20px"}}>Purchase additional votes at <strong style={{color: "var(--gold)"}}>₦50 per vote</strong>. Unlimited purchase. Instant Paystack payment.</p>
                            <div style={{display: "flex", gap: "12px", justifyContent: "center", alignItems: "center", flexWrap: "wrap"}}>
                                <input type="number" placeholder="Number of votes" min="1" style={{background: "var(--w10)", border: "1px solid var(--w10)", color: "var(--white)", padding: "12px 16px", borderRadius: "var(--radius)", fontSize: ".88rem", width: "180px"}}/>
                                <button className="btn btn-gold" >Buy Votes at ₦50 each</button>
                            </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'tab-pageant' && (
                        <div className="vote-tab-content active" id="tab-pageant">
                            <div className="section-header">
                                <span className="section-badge">Pageant</span><h2 className="section-title">AdaomaIgbonile Contestants</h2>
                            </div>
                            <div className="contestants-grid">
                                
                                {contestants.filter(c => c.contest === "peagent").map((contestant) => (
                                    <ContestantCard 
                                        key={contestant.name}
                                        contestant={contestant}
                                    />
                                ))}

                            </div>
                        </div>
                    )}

                    {activeTab === 'tab-reality' && (
                        <div className="vote-tab-content active" id="tab-reality">
                            <div className="section-header">
                                <span className="section-badge">Reality TV</span>
                                <h2 className="section-title">Odenigwe Contestants</h2>
                            </div>
                            <div className="contestants-grid">

                                {contestants.filter(c => c.contest === "reality").map((contestant) => (
                                    <ContestantCard 
                                        key={contestant.name}
                                        contestant={contestant}
                                    />
                                ))}
                            
                            </div>
                        </div>
                    )}

                    {activeTab === 'tab-tasks' && (
                        <div className="vote-tab-content active" id="tab-tasks">
                            <div className="section-header">
                                <span className="section-badge">Free Votes</span>
                                <h2 className="section-title">Earn Bonus Votes</h2>
                                <p className="section-sub">Complete tasks to earn free votes for your favourite contestant</p>
                            </div>
                            <div className="tasks-grid">
                                <div className="task-item" id="task-video">
                                    <span className="task-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg></span>
                                    <div className="task-info">
                                        <h4>Watch Sponsor Video</h4>
                                        <span>+50 votes per video</span>
                                    </div>
                                    <button className="btn btn-gold btn-xs" id="btn-video" >Watch</button>
                                </div>

                                <div className="task-item" id="task-sharelink">
                                    <span className="task-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>
                                    <div className="task-info">
                                        <h4>Share Event Link</h4>
                                        <span>+25 votes per share</span>
                                    </div>
                                    <button className="btn btn-gold btn-xs">Share</button>
                                </div>

                                <div className="task-item" id="task-facebook">
                                    <span className="task-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>
                                    <div className="task-info">
                                        <h4>Share on Facebook</h4>
                                        <span>+30 votes</span>
                                    </div>
                                    <button className="btn btn-gold btn-xs">Share</button>
                                </div>

                                <div className="task-item" id="task-whatsapp">
                                    <span className="task-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></span>
                                    <div className="task-info">
                                        <h4>Share on WhatsApp</h4>
                                        <span>+30 votes</span>
                                    </div>
                                    <button className="btn btn-gold btn-xs">Share</button>
                                </div>

                                <div className="task-item" id="task-follow">
                                    <span className="task-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></span>
                                    <div className="task-info">
                                        <h4>Follow Social Pages</h4>
                                        <span>+20 votes per page</span>
                                    </div>
                                    <button className="btn btn-gold btn-xs">Follow</button>
                                </div>
                                <div className="task-item" id="task-blog">
                                    <span className="task-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span>
                                    <div className="task-info">
                                        <h4>Read a Blog Post</h4>
                                        <span>+10 votes</span>
                                    </div>
                                    <button className="btn btn-gold btn-xs">Read</button>
                                </div>

                                <div className="task-item" id="task-quiz">
                                    <span className="task-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
                                    <div className="task-info">
                                        <h4>Complete a Quiz</h4>
                                        <span>+40 votes</span>
                                    </div>
                                    <button className="btn btn-gold btn-xs">Take Quiz</button>
                                </div>

                                <div className="task-item" id="task-survey">
                                    <span className="task-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></span>
                                    <div className="task-info">
                                        <h4>Complete a Survey</h4>
                                        <span>+35 votes</span>
                                    </div>
                                    <button className="btn btn-gold btn-xs" >Take Survey</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    )
}