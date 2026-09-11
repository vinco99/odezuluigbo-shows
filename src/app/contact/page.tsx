import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <div className="page" id="page-contact">
            <div className="page-hero">
                <div className="container">
                    <span className="section-badge">Reach Us</span>
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you — for sponsorships, registrations, partnerships and enquiries</p>
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        <div>
                            <div className="contact-info">
                                <h2>Let's Talk</h2>
                                <p>Whether you want to sponsor an event, become a contestant, or partner with us — we are open to conversations that celebrate Igbo excellence.</p>
                            </div>
                            <div className="contact-items">
                                <div className="ci-item">
                                    <span className="ci-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: "4px"}}>
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                        </svg>
                                    </span>
                                    <div className="ci-text">
                                        <strong>Location</strong>
                                        <span>Awka, Anambra State, Nigeria</span>
                                    </div>
                                </div>
                                <div className="ci-item">
                                    <span className="ci-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                        </svg>
                                    </span>
                                    <div className="ci-text">
                                        <strong>Email</strong>
                                        <span>info@odezuluigbo.com</span>
                                    </div>
                                </div>
                                <div className="ci-item">
                                    <span className="ci-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                    </span>
                                    <div className="ci-text">
                                        <strong>Phone</strong>
                                        <span>+234 xxx xxxx xxx</span>
                                    </div>
                                </div>
                                <div className="ci-item">
                                    <span className="ci-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="2" y1="12" x2="22" y2="12"/>
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                                        </svg>
                                    </span>
                                    <div className="ci-text">
                                        <strong>Website</strong><span>www.odezuluigbo.com</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop: "36px"}}>
                                <h4 style={{fontFamily: "var(--fd)", fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "16px"}}>Follow Us</h4>
                                <div style={{display: "flex", gap: "12px", flexWrap: "wrap"}}>
                                    <a href="https://www.instagram.com/odezuluigbo_tv" target="_blank" className="social-link" style={{padding: "9px 16px"}}>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad)" strokeWidth="2"/>
                                            <circle cx="12" cy="12" r="5" stroke="url(#ig-grad)" strokeWidth="2"/>
                                            <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)"/>
                                            <defs>
                                                <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0">
                                                    <stop offset="0%" stopColor="#FD5"/>
                                                    <stop offset="25%" stopColor="#F56040"/>
                                                    <stop offset="50%" stopColor="#E1306C"/>
                                                    <stop offset="75%" stopColor="#C13584"/>
                                                    <stop offset="100%" stopColor="#833AB4"/>
                                                </linearGradient>
                                            </defs>
                                            </svg>
                                        </span>
                                        <span>Instagram</span>
                                    </a>
                                    <a href="https://youtube.com/@odezuluigbo__tv" target="_blank" className="social-link" style={{padding: "9px 16px"}}>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a2.955 2.955 0 0 0-2.074-2.09C19.542 3.5 12 3.5 12 3.5s-7.542 0-9.424.596A2.955 2.955 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.955 2.955 0 0 0 2.074 2.09C4.458 20.5 12 20.5 12 20.5s7.542 0 9.424-.596a2.955 2.955 0 0 0 2.074-2.09C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000"/>
                                            <polygon points="9.75,7.5 16.5,12 9.75,16.5" fill="#FFF"/>
                                            </svg>
                                        </span>
                                        <span>YouTube</span>
                                    </a>
                                    <a href="https://www.tiktok.com/@odezuluigbotv" target="_blank" className="social-link" style={{padding: "9px 16px"}}>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                                                {/* Cyan shadow */}
                                                <path d="M34.1,11.4c-2.2-1.4-3.7-3.7-4.1-6.3c-0.1-0.5-0.1-1.1-0.1-1.7h-6.3v23.3c0,3-2.5,5.5-5.5,5.5
                                                    c-1,0-2-0.3-2.9-0.8c-1.6-0.9-2.6-2.6-2.6-4.5c0-2.9,2.4-5.3,5.3-5.3c0.5,0,1,0.1,1.5,0.2v-6.4
                                                    c-0.5-0.1-1-0.1-1.5-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12V13.5c2.2,1.6,4.9,2.5,7.8,2.5V9.8
                                                    C36,9.8,35,9.6,34.1,11.4z" fill="#25F4EE"/>
                                                {/* Red shadow */}
                                                <path d="M35.1,12.4c-2.2-1.4-3.7-3.7-4.1-6.3c-0.1-0.5-0.1-1.1-0.1-1.7h-6.3v23.3c0,3-2.5,5.5-5.5,5.5
                                                    c-1,0-2-0.3-2.9-0.8c-1.6-0.9-2.6-2.6-2.6-4.5c0-2.9,2.4-5.3,5.3-5.3c0.5,0,1,0.1,1.5,0.2v-6.4
                                                    c-0.5-0.1-1-0.1-1.5-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12V14.5c2.2,1.6,4.9,2.5,7.8,2.5V10.8
                                                    C37,10.8,36,10.6,35.1,12.4z" fill="#FE2C55"/>
                                                {/* White main logo */}
                                                <path d="M33.1,10.4c-2.2-1.4-3.7-3.7-4.1-6.3c-0.1-0.5-0.1-1.1-0.1-1.7h-6.3v23.3c0,3-2.5,5.5-5.5,5.5
                                                    c-1,0-2-0.3-2.9-0.8c-1.6-0.9-2.6-2.6-2.6-4.5c0-2.9,2.4-5.3,5.3-5.3c0.5,0,1,0.1,1.5,0.2v-6.4
                                                    c-0.5-0.1-1-0.1-1.5-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12V12.5c2.2,1.6,4.9,2.5,7.8,2.5V8.8
                                                    C35,8.8,34,8.6,33.1,10.4z" fill="#FFF"/>
                                            </svg>
                                        </span>
                                        <span>TikTok</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="form-box">
                            <h3 style={{fontFamily: "var(--fh)", fontSize: "1.4rem", fontWeight: "700", marginBottom: "22px"}}>Send a Message</h3>
                            <form id="contactForm">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input type="text" placeholder="Your name" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input type="email" placeholder="your@email.com" required/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="tel" placeholder="+234 xxx xxxx xxx"/>
                                </div>
                                <div className="form-group">
                                    <label>Subject *</label>
                                    <select required>
                                        <option value="">Select subject</option>
                                        <option>Sponsorship Enquiry</option>
                                        <option>Contestant Registration</option>
                                        <option>Event Partnership</option>
                                        <option>Media & Press</option>
                                        <option>General Enquiry</option>
                                        <option>Become an Organizer</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Message *</label>
                                    <textarea rows={5} placeholder="Tell us more about your enquiry..." required style={{resize: "vertical"}}></textarea>
                                </div>
                                <button type="submit" className="btn btn-gold btn-full">Send Message →</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>

    );
}