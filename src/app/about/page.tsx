import Link from "next/link";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <div className="page" id="page-about">
            <div className="page-hero">
                <div className="container">
                    <span className="section-badge">Our Story</span>
                    <h1>About Us</h1>
                    <p>Odezuluigbo Global Ltd — promoting Igbo culture, excellence and entertainment worldwide</p>
                </div>
            </div>
            <section className="section">
                <div className="container">

                    <div className="about-grid" style={{marginBottom: "72px"}}>
                        <div className="about-text">
                            <span className="section-badge">Who We Are</span>
                            <h2>Odezuluigbo Global Ltd</h2>
                            <p><strong style={{color: "var(--gold)"}}>Mission:</strong> To add value and smiles to the faces of Igbo Africa and all mankind through quality goods and services rooted in Igbo wisdom and excellence.</p>
                            <p style={{marginTop: "14px"}}><strong style={{color: "var(--gold)"}}>Vision:</strong> To provide world-className goods and services using the unique Igbo essence for the good of humanity while creating platforms where talented individuals can thrive.</p>
                            <p style={{marginTop: "14px", color: "var(--w70)"}}>We believe in the power of culture, the strength of community, and the brilliance of the Igbo spirit. Through world-className entertainment, we celebrate what makes Igbo people extraordinary.</p>
                        </div>
                        <div>
                            <div className="img-placeholder about-visual-img" data-desc="Odezuluigbo team group portrait — image pending upload.">
                                <span className="ph-icon">🖼️</span>
                                <span className="ph-txt">Odezuluigbo team group portrait</span>
                            </div>
                        </div>
                    </div>

                <div className="section-header">
                    <span className="section-badge">Values</span>
                    <h2 className="section-title">What Drives Us</h2>
                </div>
                <div className="values-grid" style={{marginBottom: "72px"}}>
                    <div className="value-card">
                        <span className="value-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.82.488 3.53 1.342 5C5.204 21.5 8.3 22 12 22z"/>
                            <path d="M2 12h4"/>
                            <path d="M8 8l4 4"/>
                            <path d="M22 12c-2-3-5-5-8-5-3 0-5 2-5 5"/>
                            </svg>
                        </span>
                        <h4>Cultural Pride</h4>
                        <p>We celebrate Igbo heritage in its full richness — from language and tradition to art and wisdom.</p>
                    </div>
                    <div className="value-card">
                        <span className="value-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                        </span>
                        <h4>Excellence</h4>
                        <p>Everything we do is held to world-className standards. We bring Netflix-quality entertainment to African culture.</p>
                    </div>
                    <div className="value-card">
                        <span className="value-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                        </span>
                        <h4>Diaspora Inclusion</h4>
                        <p>Igbos everywhere, from Enugu to London to Houston — this platform is yours. You belong here.</p>
                    </div>
                    <div className="value-card">
                        <span className="value-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9"/>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                            </svg>
                            </span>
                            <h4>Talent Discovery</h4>
                            <p>We exist to find the brightest Igbo talents and give them the stage they deserve to shine globally.</p>
                        </div>
                    <div className="value-card">
                        <span className="value-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </span>
                            <h4>Community</h4>
                            <p>We build community — connecting Igbo people with each other, with their culture, and with the world.</p>
                    </div>
                    <div className="value-card">
                        <span className="value-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                            <path d="M4 22h16"/>
                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                            </svg>
                        </span>
                        <h4>Empowerment</h4>
                        <p>Every event is a platform for empowerment — economically, socially, and culturally for participants.</p>
                    </div>
                </div>

                <div className="section-header">
                    <span className="section-badge">Team</span>
                    <h2 className="section-title">Our Team</h2>
                </div>
                <div className="team-grid" style={{marginBottom: "72px"}}>

                    <div className="team-card">
                        <div className="img-placeholder team-img" style={{height: "340px"}} data-desc="Very Rev. Fr. Prof. Bonachristus Uchenna Umeogu — headshot pending upload.">
                            <span className="ph-icon">👤</span>
                            <span className="ph-txt">Very Rev. Fr. Prof. Bonachristus Uchenna Umeogu</span>
                        </div>
                        <div className="team-info">
                            <h4>Very Rev. Fr. Prof. Bonachristus Uchenna Umeogu</h4>
                            <span>Chairman & Chief Executive Officer (CEO)</span>
                            <p style={{color: "rgba(255,255,255,0.7)", fontSize:".85rem", lineHeight: "1.6", marginTop: "12px"}}>
                                Distinguished philosopher, educator, entrepreneur, cultural revivalist, and strategic leader. 
                                As Chairman and Chief Executive Officer of Odezuluigbo Global Ltd, he provides corporate leadership, 
                                strategic direction, investment support, and institutional guidance for the realization of the company's vision of promoting Igbo excellence and delivering world-className products and services to humanity.
                            </p>
                        </div>
                    </div>

                    <div className="team-card">
                        <div className="img-placeholder team-img" style={{height: "340px"}} data-desc="Chioma Favour Nwigwe (Goddess) — headshot pending upload.">
                            <span className="ph-icon">👤</span>
                            <span className="ph-txt">Chioma Favour Nwigwe (Goddess)</span>
                        </div>
                        <div className="team-info">
                            <h4>Chioma Favour Nwigwe (Goddess)</h4>
                            <span>Chief Operating Officer (COO)</span>
                            <p style={{color: "rgba(255,255,255,0.7)", fontSize:".85rem", lineHeight: "1.6", marginTop: "12px"}}>
                                Creative strategist, media executive, project coordinator, and operational leader. 
                                She oversees the day-to-day administration, brand development, project implementation, communications, digital platforms, event management, and execution of the company's cultural, entertainment, and commercial initiatives. 
                                She plays a central role in transforming vision into reality through innovation, coordination, and effective operational leadership.
                            </p>
                        </div>
                    </div>
                    <div className="team-card">
                        <div className="img-placeholder team-img" data-desc="TEAM MEMBER PHOTO: Events Manager — professional woman in smart attire, smiling. Events & logistics management.">
                            <span className="ph-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                                </svg>
                            </span>
                            <span className="ph-txt">Events Manager<br />Professional Portrait</span>
                        </div>
                        <div className="team-info">
                            <h4>Events Manager</h4>
                            <span>Head of Events</span>
                        </div>
                    </div>
                </div>

                <div 
                    style={{
                        background: "linear-gradient(135deg,var(--gold-dark),var(--gold))", 
                        borderRadius:"var(--radius-lg)", padding: "56px", textAlign: "center"
                    }}>
                    <h2 style={{fontFamily: "var(--fh)", fontSize: "2rem", fontWeight: "700", color: "var(--black)", marginBottom: "14px"}}>
                        Join the Odezuluigbo Family
                    </h2>
                    <p style={{color: "rgba(0,0,0,.7)", marginBottom: "28px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto"}}>
                        Whether as a contestant, sponsor, organizer, or fan — there is a place for you in this movement.
                    </p>
                    <div style={{display: "flex ", gap: "14px", justifyContent: "center", flexWrap: "wrap"}}>
                        <Link className="btn btn-red" href="/contact">Get Involved</Link>
                        <Link className="btn" style={{background: "rgba(0,0,0,.2)", color: "var(--black)", border: "1px solid rgba(0,0,0,.3)"}} href="/events">
                            Explore Events
                        </Link>
                    </div>
                </div>

                </div>
            </section>
            
            <Footer />
        </div>
    );
}