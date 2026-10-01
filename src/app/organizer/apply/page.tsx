"use client";

import { useState } from "react";

export default function OrganizerApplicationPage() {
    const [message, setMessage] = useState("");
    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const response = await fetch(
            "/api/organizers/apply", 
            { 
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(Object.fromEntries(form)) 
            }
        );
        const data = await response.json();

        if (response.status === 401) {
            window.location.href = "/login?callbackUrl=/organizer/apply";
            return;
        }
        setMessage(response.ok ? "Application submitted for admin review." : data.error ?? "Unable to submit application");
    }
    return (
        <main className="page active">
            <section className="page-hero">
                <div className="container">
                    <span className="section-bage">HOST AN EVENT</span>
                    <h1 className="text-3xl font-bold">ORGANIZER PORTAL</h1>
                    <p className="mt-2">
                        Bring your own pageant, talent hunt, 
                        comedy show or cultural competition to the Odezuluigbo platform
                    </p>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Why Host With Us</span>
                        <h2 className="section-title">Everything You Need To Run A Show</h2>
                    </div>
                    <div className="eligibility-grid" style={{marginBottom: "60px"}}>
                    <div className="elig-item">
                        <span className="elig-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        </span>
                        <div>
                        <h4>Custom Event Branding</h4>
                        <p>Your own logo, banner, contestants, judges and timeline on a dedicated event page.</p>
                        </div>
                    </div>
                    <div className="elig-item">
                        <span className="elig-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                        </span>
                        <div>
                        <h4>Custom Registration & Voting Fees</h4>
                        <p>Set your own contestant registration fee and voting price — Paystack handles collection.</p>
                        </div>
                    </div>
                    <div className="elig-item">
                        <span className="elig-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 20V10M12 20V4M6 20v-6"/>
                        </svg>
                        </span>
                        <div>
                        <h4>Revenue & Vote Tracking</h4>
                        <p>Real-time dashboard for registrations, votes cast and revenue generated.</p>
                        </div>
                    </div>
                    <div className="elig-item">
                        <span className="elig-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2"/>
                        </svg>
                        </span>
                        <div>
                        <h4>Admin-Reviewed Launch</h4>
                        <p>Every event is checked by our team before going live, keeping the platform trustworthy.</p>
                        </div>
                    </div>
                    </div>

                <div className="section-header">
                    <span className="section-badge">Process</span>
                    <h2 className="section-title">How It Works</h2>
                </div>

                <div className="all-events-grid" style={{marginBottom: "60px"}}>
                    <div className="event-card">
                    <div className="ev-body">
                        <h3>1. Apply Below</h3>
                        <p>Tell us about your event idea, expected contestants and proposed date.</p>
                    </div>
                    </div>
                    <div className="event-card">
                    <div className="ev-body">
                        <h3>2. Get Approved</h3>
                        <p>Our admin team reviews your application, usually within 3–5 business days.</p>
                    </div>
                    </div>
                    <div className="event-card">
                    <div className="ev-body">
                        <h3>3. Build Your Event</h3>
                        <p>Upload your logo, banner, contestants, judges and set your voting rules.</p>
                    </div>
                    </div>
                    <div className="event-card">
                    <div className="ev-body">
                        <h3>4. Go Live & Earn</h3>
                        <p>Your event appears on the platform and you track revenue in real time.</p>
                    </div>
                    </div>
                </div>

                <div className="section-header">
                    <span className="section-badge">Apply</span>
                    <h2 className="section-title">Become An Organizer</h2>
                    <p className="section-sub">No fee to apply — we only take a small platform commission on live events</p>
                </div>
                    <div className="form-section">
                        <div className="form-box">
                            <form id="organizerForm" onSubmit={submit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Organizer / Company Name *</label>
                                        <input name="businessName" type="text" placeholder="Business or organization name" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Contact Phone *</label>
                                        <input name="phone" type="tel" placeholder="+234 xxx xxxx xxx" required/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Experience</label>
                                    <input name="experience" type="text" placeholder="Relevant experience" required/>
                                </div>
                                <div className="form-group">
                                    <label>Proposal</label>
                                    <textarea name="proposal" rows={4} required minLength={20} placeholder="Describe the events you want to run" style={{resize: "vertical"}}/>
                                </div>
                                <button className="btn btn-gold btn-full" style={{marginTop: "8px"}}>Submit Application</button>
                                {message && 
                                    <p>{message}</p>
                                }
                            </form>
                        </div>
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
