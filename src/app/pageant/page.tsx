import { useState } from "react"
import { redirect } from "next/navigation"
import submit from "../events/[id]/apply/page";
import Footer from "@/components/Footer";


export default function PageantPage(){

    const scrollToRegister = () => {
        const element = document.getElementById('pgnt-register');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="page active" id="page-pageant">
            <div className="page-hero" style={{background: "linearGradient(135deg,#0a0000,#1a0808,#0a0000)"}}>
                <div className="container">
                    <span className="section-badge">Beauty · Intelligence · Elegance</span>
                    <h1>AdaomaIgbonile<br/>Beauty Pageantry</h1>
                    <p>Celebrating the beauty, intelligence, elegance and excellence of the Igbo woman</p>
                </div>
            </div>
            <div className="pgnt-detail-strip">
                <div className="container">
                    <div className="pgnt-detail-row">
                        <div className="pgnt-detail">
                            <span>Event Date</span><strong>Nov 30, 2025</strong>
                        </div>
                        <div className="pgnt-detail">
                            <span>Location</span><strong>Awka, Anambra</strong>
                        </div>
                        <div className="pgnt-detail">
                            <span>Grand Prize</span><strong>₦1,000,000</strong>
                        </div>
                        <div className="pgnt-detail">
                            <span>Registration Fee</span><strong>₦15,000</strong>
                        </div>
                        <div className="pgnt-detail">
                            <span>Voting Fee</span><strong>₦2,500</strong>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section">
                <div className="container">

                    <div className="pgnt-cd-box">
                        <h3>⏳ Countdown to the Grand Event</h3>
                        <div className="cd-timer">
                            <div className="cd-unit">
                                <span id="pcd-days">00</span><small>Days</small>
                            </div>
                            <div className="cd-sep">:</div>
                            <div className="cd-unit">
                                <span id="pcd-hours">00</span><small>Hours</small>
                            </div>
                            <div className="cd-sep">:</div>
                            <div className="cd-unit">
                                <span id="pcd-mins">00</span><small>Mins</small>
                            </div>
                            <div className="cd-sep">:</div>
                            <div className="cd-unit">
                                <span id="pcd-secs">00</span><small>Secs</small>
                            </div>
                        </div>
                    </div>

                    <div className="about-grid" style={{marginBottom: "60px"}}>
                        <div className="about-text">
                            <span className="section-badge">About</span>
                            <h2>What is AdaomaIgbonile?</h2>
                            <p>AdaomaIgbonile means "The beautiful daughter of a noble Igbo land." This isn't just a beauty pageant — it's a celebration of Igbo womanhood, an empowerment platform, and a stage for the brightest, most graceful Igbo women to shine.</p>
                            <button className="btn btn-gold" style={{marginTop: "20px"}} onClick={scrollToRegister}>Apply Now</button>
                        </div>
                        <div>
                            <div className="img-placeholder about-visual-img" data-desc="SPLIT PORTRAIT: Left half — Igbo woman in full coral beads, isiagu blouse and traditional headgear. Right half — same woman in an elegant floor-length gown. Gold dividing line. Represents Traditional meets Modern elegance for the pageant.">
                                <span className="ph-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg></span>
                                <span className="ph-txt">Pageant Split Portrait<br />Traditional & Modern</span>
                            </div>
                        </div>
                    </div>

                    <div className="section-header">
                        <span className="section-badge">Requirements</span>
                        <h2 className="section-title">Eligibility Criteria</h2>
                    </div>
                    <div className="eligibility-grid" style={{marginBottom: "60px"}}>
                        <div className="elig-item"><span className="elig-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/><path d="M9 3.5v0"/><path d="M15 3.5v0"/><line x1="12" y1="11" x2="12" y2="21"/></svg></span><div><h4>Age: 18–30 Years</h4><p>You must be between 18 and 30 years old when the event takes place.</p></div></div>
                        <div className="elig-item"><span className="elig-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.82.488 3.53 1.342 5C5.204 21.5 8.3 22 12 22z"/><path d="M2 12h4"/><path d="M8 8l4 4"/><path d="M22 12c-2-3-5-5-8-5-3 0-5 2-5 5"/></svg></span><div><h4>Igbo Heritage</h4><p>You must be of Igbo descent — whether from the five Igbo-speaking states or from the diaspora.</p></div></div>
                        <div className="elig-item"><span className="elig-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span><div><h4>Education: SSCE+</h4><p>Must have minimum SSCE/WAEC or be enrolled in a tertiary institution.</p></div></div>
                        <div className="elig-item"><span className="elig-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg></span><div><h4>Single & Unmarried</h4><p>Must be single, never married, and without children at time of application.</p></div></div>
                        <div className="elig-item"><span className="elig-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/></svg></span><div><h4>Height: 5'5" Minimum</h4><p>Minimum height of 165cm. Must be in good health and physical fitness.</p></div></div>
                        <div className="elig-item"><span className="elig-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span><div><h4>Nigerian Citizen</h4><p>Must be a Nigerian citizen. Diaspora Igbos with valid Nigerian docs are welcome.</p></div></div>
                    </div>

                    <div className="section-header"><span className="section-badge">Gallery</span><h2 className="section-title">Photo Gallery</h2></div>
                    <div className="gallery-grid" style={{marginBottom: "60px"}}>
                        <div className="img-placeholder gallery-img" data-desc="GALLERY: Igbo woman in full traditional attire — George wrapper, coral beads, headgear — on pageant stage. Full body shot. Professional lighting."><span className="ph-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></span><span className="ph-txt">Traditional Attire Stage Shot</span></div>
                        <div className="img-placeholder gallery-img" data-desc="GALLERY: Group of 5 pageant contestants in matching elegant evening gowns. Smiling, holding bouquets on decorated stage."><span className="ph-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></span><span className="ph-txt">Evening Gown Group Shot</span></div>
                        <div className="img-placeholder gallery-img" data-desc="GALLERY: Crown coronation moment — outgoing queen placing gold crown on new winner. Confetti falling. Emotional and triumphant."><span className="ph-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></span><span className="ph-txt">Coronation / Crown Moment</span></div>
                        <div className="img-placeholder gallery-img" data-desc="GALLERY: Contestant performing talent segment — singing into microphone or playing traditional Igbo instrument (oja flute / ubo aka) on stage."><span className="ph-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></span><span className="ph-txt">Talent Showcase Performance</span></div>
                        <div className="img-placeholder gallery-img" data-desc="GALLERY: Contestant confidently at microphone answering judges' Q&A questions. Intelligence round. Poised, articulate expression."><span className="ph-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></span><span className="ph-txt">Q&A Intelligence Round</span></div>
                        <div className="img-placeholder gallery-img" data-desc="GALLERY: Past winners parade — 3 queens in sashes and crowns waving to cheering crowd at outdoor venue. Igbo cultural decor in background."><span className="ph-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></span><span className="ph-txt">Winners Parade / Past Queens</span></div>
                    </div>

                    <div className="section-header"><span className="section-badge">Judges</span><h2 className="section-title">Meet the Judges</h2></div>
                    <div className="judges-grid" style={{marginBottom: "60px"}}>
                        <div className="judge-card"><div className="img-placeholder judge-img" data-desc="JUDGE HEADSHOT: Distinguished Igbo woman, 40s-50s, in professional attire or traditional dress. Authoritative, warm smile. Judge of Beauty & Culture category."><span className="ph-icon">👩‍⚖️</span><span className="ph-txt">Judge 1 Portrait<br />(Female, Beauty & Culture)</span></div><div className="judge-info"><h4>Judge Name 1</h4><span>Beauty & Culture</span></div></div>
                        <div className="judge-card"><div className="img-placeholder judge-img" data-desc="JUDGE HEADSHOT: Distinguished Igbo man in traditional isiagu top. Cultural authority figure, 50s. Judge of Cultural Intelligence."><span className="ph-icon">👨‍⚖️</span><span className="ph-txt">Judge 2 Portrait<br />(Male, Cultural Intel)</span></div><div className="judge-info"><h4>Judge Name 2</h4><span>Cultural Intelligence</span></div></div>
                        <div className="judge-card"><div className="img-placeholder judge-img" data-desc="JUDGE HEADSHOT: Female Nigerian celebrity or entertainer in glamorous outfit. 30s-40s. Judge for Talent & Entertainment category."><span className="ph-icon">👩‍⚖️</span><span className="ph-txt">Judge 3 Portrait<br/>(Celebrity, Talent)</span></div><div className="judge-info"><h4>Judge Name 3</h4><span>Talent & Entertainment</span></div></div>
                        <div className="judge-card"><div className="img-placeholder judge-img" data-desc="JUDGE HEADSHOT: Nigerian fashion designer in stylish attire. Creative professional look. Judge for Fashion & Style category."><span className="ph-icon">👨‍⚖️</span><span className="ph-txt">Judge 4 Portrait<br/>(Fashion & Style)</span></div><div className="judge-info"><h4>Judge Name 4</h4><span>Fashion & Style</span></div></div>
                    </div>

                    <div id="pgnt-register" style={{scrollMarginTop: "100px"}}>
                        <div className="section-header"><span className="section-badge">Apply</span><h2 className="section-title">Registration Form</h2><p className="section-sub">Registration Fee: ₦15,000 — paid via Paystack after submission</p></div>
                        <div className="form-section">
                            <div className="form-box">
                                <form id="registrationForm" onSubmit={submit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Full Name *</label>
                                            <input type="text" placeholder="First name" required/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Date of Birth *</label>
                                            <input type="date" required/>
                                        </div>
                                        <div className="form-group">
                                            <label>Phone *</label>
                                            <input type="tel" placeholder="+234 xxx xxxx xxx" required/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input type="email" placeholder="your@email.com" required/>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>State of Origin *</label>
                                            <select required>
                                                <option value="">Select state</option>
                                                <option>Anambra</option>
                                                <option>Imo</option>
                                                <option>Enugu</option>
                                                <option>Abia</option>
                                                <option>Ebonyi</option>
                                                <option>Rivers</option>
                                                <option>Diaspora</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Height (cm) *</label>
                                            <input type="number" placeholder="e.g. 168" required/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Brief Bio *</label>
                                        <textarea rows={3} placeholder="Your talents, achievements, background..." required style={{resize: "vertical"}}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Why do you want to be AdaomaIgbonile? *</label>
                                        <textarea rows={3} placeholder="Your motivation and vision..." required style={{resize: "vertical"}}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Profile Photo Upload Area</label>
                                        <div className="img-placeholder" style={{height: "75px", cursor: "pointer"}} data-desc="FILE UPLOAD: Contestant uploads passport/headshot photo here — clear frontal face photo required, JPG/PNG, max 5MB"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> Click to upload profile photo (JPG/PNG)</span></div>
                                    </div>
                                    <button type="submit" className="btn btn-gold btn-full" style={{marginTop: "8px"}}>Submit Application → Pay ₦15,000</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="section-header" style={{marginTop: "72px"}}>
                        <span className="section-badge">FAQ</span>
                        <h2 className="section-title">Frequently Asked Questions</h2>
                    </div>
                    <div className="faq-list">
                        
                        <div className={`faq-item ${openIndex === 0 ? 'active' : ''}`}>
                            <div className="faq-q" onClick={() => toggleFaq(0)}>
                                Can diaspora Igbo women apply? {' '}
                                <span className="faq-icon">{openIndex === 0 ? '-' : '+'}</span>
                            </div>
                            {openIndex === 0 && (
                                <div className="faq-ans">
                                    <p>Yes! Igbo women in the diaspora are warmly welcome to apply. You must have valid Nigerian documentation and proof of Igbo heritage.</p>
                                </div>
                            )}
                        </div>

                        <div className={`faq-item ${openIndex === 1 ? 'active' : ''}`}>
                            <div className="faq-q" onClick={() => toggleFaq(1)}>
                                When is the registration deadline? {' '}
                                <span className="faq-icon">{openIndex === 1 ? '-' : '+'}</span>
                            </div>
                            {openIndex === 1 && (
                                <div className="faq-ans">
                                    <p>Registration closes October 31, 2025 — 30 days before the event. We encourage early registration as slots are limited.</p>
                                </div>
                            )}
                        </div>

                        <div className={`faq-item ${openIndex === 2 ? 'active' : ''}`}>
                            <div className="faq-q" onClick={() => toggleFaq(2)}>
                                How are contestants scored? {' '}
                                <span className="faq-icon">{openIndex === 2 ? '-' : '+'}</span>
                            </div>
                            {openIndex === 2 && (
                                <div className="faq-ans">
                                    <p>Scoring: Public voting (40%) + Judges scoring (40%) + Social media engagement (20%). All criteria are transparent.</p>
                                </div>
                            )}
                        </div>

                        <div className={`faq-item ${openIndex === 3 ? 'active' : ''}`}>
                            <div className="faq-q" onClick={() => toggleFaq(3)}>
                                What does the ₦15,000 fee cover? {' '}
                                <span className="faq-icon">{openIndex === 3 ? '-' : '+'}</span>
                            </div>
                            {openIndex === 3 && (
                                <div className="faq-ans">
                                    <p>Covers your event package, training sessions, professional photoshoot, branding materials, and all pre-event activities.</p>
                                </div>
                            )}
                        </div>

                        <div className={`faq-item ${openIndex === 4 ? 'active' : ''}`}>
                            <div className="faq-q" onClick={() => toggleFaq(4)}>
                                Are there prizes besides the grand prize? {' '}
                                <span className="faq-icon">{openIndex === 4 ? '-' : '+'}</span>
                            </div>
                            {openIndex === 4 && (
                                <div className="faq-ans">
                                    <p>Yes — prizes for 1st & 2nd Runner Up, Best Traditional Wear, Most Intelligent, Most Talented, and People's Choice Award.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>
            
            <Footer />
        </div>
    )
}