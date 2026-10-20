import './christmas-angel-2026.css';
import FAQ from "./_components/FAQ";
import ApplyButton from "./_components/ApplyButton";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";
import EventTimelineCountdown from "./_components/EventTimelineCountdown";
import { DM_Sans, Cormorant_Garamond } from 'next/font/google';
import { parseDate, formatDateRange, formatCloseDate } from '@/lib/format-date';


const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});


export const dynamic = "force-dynamic";

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

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

    const start = parseDate(event.registrationStart);
    const end   = parseDate(event.registrationEnd);


    if (normalize(event.title) === "Angel at Christmas 2026") {

        return(
            <div className={`christmas-angel-2026 ${cormorant.variable} ${dmSans.variable}`}>
                <main>
                    <section className="pageant-hero">
                        <div className="container pageant-hero-grid">
                            <div className="pageant-hero-copy">
                                <div className="eyebrow">ODEZULUIGBO ENTERTAINMENT PRESENTS</div>
                                <h1>Angel at <em>Christmas.</em></h1>
                                <p className="pageant-subtitle">Beauty Beyond the Crown</p>
                                <p>
                                    Angel at Christmas is an annual Christmas pageantry celebrating young women whose beauty reflects grace, 
                                    intelligence, strong character, creativity and purpose. 
                                    Open to applicants within and beyond UNIZIK, it is a platform for self-expression, personal growth, 
                                    cultural pride and positive community impact.
                                </p>
                                <div className="pageant-quickfacts">
                                    <div><b>16–30</b><span>Eligible age range</span></div>
                                    <div><b>15 NOV</b><span>Auditions · Sunday 2026</span></div>
                                    <div><b>₦1M</b><span>Total cash prizes</span></div>
                                </div>
                                <div className="hero-actions">
                                    <Link className="button button-primary" href={`/events/${event.id}/apply`} rel="noopener" target="_blank">APPLY ON THE WEBSITE ↗</Link>
                                    <a className="button button-outline" href="#registration">HOW TO APPLY</a>
                                </div>
                                <p className="note-small">
                                    Applications are managed through the official Odezuluigbo platform; this page is a design preview, 
                                    not a submission form.
                                </p>
                            </div>
                            <div className="pageant-hero-image">
                                <img alt="Angel at Christmas crown and sash — approved concept image" src="data:image/webp;base64,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"/>
                                <span>CROWN • CHARACTER • PURPOSE</span>
                            </div>
                        </div>
                    </section>
                    <section className="section pageant-about" id="about-pageant">
                        <div className="container">
                            <div className="section-kicker">THE HEART OF THE PAGEANTRY</div>
                            <h2 className="section-title">A platform for <em>purpose.</em></h2>
                            <p className="section-description pageant-wide">
                                Angel at Christmas celebrates more than appearance. 
                                We believe grace is reflected in conduct, intelligence in thoughtful expression, 
                                beauty in confidence, and purpose in the willingness to create a positive impact. 
                                Participants will enjoy opportunities for development, visibility, 
                                creative collaboration and community connection as part of the GLORIA! Christmas experience.
                            </p>
                            <div className="value-row">
                                <span>BEAUTY</span>
                                <span>GRACE</span>
                                <span>INTELLIGENCE</span>
                                <span>CHARACTER</span>
                                <span>PURPOSE</span>
                            </div>
                        </div>
                    </section>
                    <section className="section registration-section" id="registration">
                        <div className="container">
                            <div className="section-kicker">APPLY TO BE PART OF SOMETHING SPECIAL</div>
                            <h2 className="section-title">Registration <em>&amp; auditions.</em></h2>
                            <div className="entry-summary">
                                <div className="entry-summary-item">
                                    <span>REGISTRATION PERIOD</span>
                                    {start && end ? (
                                        <>
                                        <strong>{formatDateRange(start, end)}</strong>
                                        <small>Applications close {formatCloseDate(end)}</small>
                                        </>
                                    ) : (
                                        <>
                                        <strong>DATES TO BE ANNOUNCED</strong>
                                        <small>Check back soon for the registration window</small>
                                        </>
                                    )}
                                </div>
                                <div className="entry-summary-item">
                                    <span>ENTRY FEE</span>
                                    <strong>₦{event.registrationFee.toLocaleString("en-Us")}</strong>
                                    <small>Non-refundable, except where required by law</small>
                                </div>
                                <div className="entry-summary-item">
                                    <span>PAGEANT AUDITIONS</span>
                                    <strong>SUNDAY, 15 NOV 2026</strong>
                                    <small>Time and location to be announced</small>
                                </div>
                            </div>
                            <div className="info-two-col">
                                <div className="info-paper">
                                    <h3>Who can register?</h3>
                                    <ul className="good-list">
                                        <li>Young women aged <strong>16–30</strong> at the time of application.</li>
                                        <li>Applicants from <strong>within and outside UNIZIK</strong>; student status is not required.</li>
                                        <li>Applicants aged <strong>16 or 17</strong> must have a parent or guardian endorse their participation.</li>
                                        <li>Entrants should be available for the announced audition and scheduled official activities if selected.</li>
                                    </ul>
                                    <h3>What you need to apply</h3>
                                    <ul className="good-list compact-list">
                                        <li>Full name, <strong>age (not date of birth)</strong>, location, mobile/WhatsApp number and email.</li>
                                        <li>Social media handle(s), your talent or interests, and a brief reason you want to join.</li>
                                        <li><strong>Two clear photographs</strong> of yourself for your application.</li>
                                        <li>Parent/guardian endorsement and contact details for applicants aged <strong>16–17</strong>.</li>
                                        <li>Agreement to the entry declaration and <strong>₦10,000 registration fee</strong> through the official payment process.</li>
                                    </ul>
                                </div>
                                <div className="info-paper info-paper-gold">
                                    <div className="section-kicker">PAGEANT AUDITIONS</div>
                                    <h3>Sunday,<br/>15 November 2026</h3>
                                    <p><strong>Time:</strong> To be announced<br/><strong>Venue:</strong> To be announced</p>
                                    <p>
                                        Complete the official entry form before attending. 
                                        Audition instructions and what to prepare will be communicated through Odezuluigbo's official channels.
                                    </p>
                                    <p className="note-small">
                                        Registration period: {start && end ? `${formatDateRange(start, end)}` : "Yet to be Anounced"}. 
                                        Complete the application and fee payment before the deadline. 
                                        Keep your confirmation for official audition communications.
                                    </p>
                                    <Link className="button button-primary" href={`/events/${event.id}/apply`} rel="noopener" target="_blank">GO TO REGISTRATION ↗</Link>
                                </div>
                            </div>
                            <div className="how-to-apply">
                                <div className="section-kicker">FOUR SIMPLE STEPS</div>
                                <h3>How to <em>register.</em></h3>
                                <div className="apply-steps">
                                    <div>
                                        <span>01</span>
                                        <strong>Read the guidelines</strong>
                                        <p>Review the age requirements, conduct rules, wardrobe expectations and the non-refundable fee.</p>
                                    </div>
                                    <div>
                                        <span>02</span>
                                        <strong>Complete the online form</strong>
                                        <p>Enter your contact details, age, social handles, talent and brief motivation. No date of birth is requested.</p>
                                    </div>
                                    <div>
                                        <span>03</span>
                                        <strong>Attach two photos &amp; consent</strong>
                                        <p>Upload two clear photographs; 16–17-year-olds need parental or guardian endorsement.</p>
                                    </div>
                                    <div>
                                        <span>04</span>
                                        <strong>Pay and save confirmation</strong>
                                        <p>Pay ₦10,000 through the official website. Keep your receipt and watch for audition instructions.</p>
                                    </div>
                                </div>
                                <p className="note-small">
                                    Applications close{end ?  `${formatCloseDate(end)}` : "Check back soon for the registration window"  }. The audition is Sunday, 15 November 2026; 
                                    time and location will be announced through official Odezuluigbo channels. 
                                    Never make payments to an individual's account or unofficial link.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="section pageant-rules" id="rules">
                        <div className="container">
                            <div className="section-kicker">READ BEFORE YOU APPLY</div>
                            <h2 className="section-title">Participation <em>guidelines.</em></h2>
                            <div className="rules-grid">
                                <div className="rule-item">
                                    <b>01</b>
                                    <div>
                                        <strong>One accurate entry</strong>
                                        <p>
                                            Submit one genuine application with correct details, 
                                            including your age and active phone/WhatsApp contact. False information may lead to disqualification.
                                        </p>
                                    </div>
                                </div>
                            <div className="rule-item">
                                <b>02</b>
                                <div>
                                    <strong>Registration and payment</strong>
                                    <p>
                                        Entry is ₦10,000, payable through Odezuluigbo’s official website only. 
                                        The fee is non-refundable except where required by law. Keep proof of payment.
                                    </p>
                                </div>
                            </div>
                            <div className="rule-item">
                                <b>03</b>
                                <div>
                                    <strong>Guardian consent for minors</strong>
                                    <p>
                                        Applicants aged 16 or 17 must obtain parental or guardian endorsement before participation. 
                                        Additional guardian consent may be required for photographs, video or brand activities.
                                    </p>
                                </div>
                            </div>
                            <div className="rule-item">
                                <b>04</b>
                                <div>
                                    <strong>Respectful conduct</strong>
                                    <p>
                                        Treat fellow contestants, organisers and guests respectfully. 
                                        Bullying, harassment, abuse, discrimination or deliberate disruption is unacceptable.
                                    </p>
                                </div>
                            </div>
                            <div className="rule-item">
                                <b>05</b>
                                <div>
                                    <strong>Outfits and presentation</strong>
                                    <p>
                                        Contestants are responsible for their own clothing and grooming unless the organiser announces otherwise. 
                                        Outfits must be suitable for a family-friendly event: no vulgar, indecent or excessively revealing attire.
                                    </p>
                                </div>
                            </div>
                            <div className="rule-item">
                                <b>06</b>
                                <div>
                                    <strong>Availability and personal arrangements</strong>
                                    <p>
                                        Be available for the Sunday, 15 November audition and for official activities communicated to you. 
                                        Travel, accommodation and personal expenses remain your responsibility unless expressly agreed otherwise.
                                    </p>
                                </div>
                            </div>
                            <div className="rule-item">
                                <b>07</b>
                                <div>
                                    <strong>Photography, privacy and promotions</strong>
                                    <p>
                                        We will explain how photos, videos and application information may be used and obtain appropriate permissions, 
                                        including guardian consent where required. Official sponsor campaigns require separate approval.
                                    </p>
                                </div>
                            </div>
                            <div className="rule-item">
                                <b>08</b>
                                <div>
                                    <strong>Participation and brand responsibilities</strong>
                                    <p>
                                        Registration does not guarantee participation at the December event. 
                                        Any winner’s one-year ambassadorial appointment, duties and compensation will be defined in a separate written agreement.
                                    </p>
                                </div>
                            </div>
                            </div>
                            <p className="note-small">
                                Applicants should review the full <strong>privacy notice</strong> and guardian-consent statement before submitting personal information. 
                                The website developer must enable secure payment, file upload, age-appropriate consent and application confirmations before registration is opened publicly.
                            </p>
                            <div className="rules-action">
                                <Link className="button button-primary" href={`/events/${event.id}/apply`} rel="noopener" target="_blank">COMPLETE YOUR APPLICATION ↗</Link>
                                <span>Application closes 10 November 2026 · ₦10,000 non-refundable fee</span>
                            </div>
                        </div>
                    </section>
                    <section className="section pageant-rewards" id="rewards">
                        <div className="container rewards-grid">
                            <div>
                                <div className="section-kicker">A REIGN WITH MEANING</div>
                                <h2 className="section-title">Rewards beyond <em>the crown.</em></h2>
                                <p className="section-description">
                                    ₦1,000,000 in total cash prizes, a one-year Odezuluigbo Entertainment ambassadorial appointment for the winner, 
                                    crown and sash, an official photoshoot, media features and the opportunity to champion Angel's Mission.
                                </p>
                                <p className="section-description">
                                    Special award plaques and sponsor gifts may also be included as they are confirmed. 
                                    The ambassadorial appointment will be set out in a separate agreement.
                                </p>
                                <a className="button button-primary" href={`/events/${event.id}/apply`} rel="noopener" target="_blank">APPLY TO ANGEL AT CHRISTMAS ↗</a>
                            </div>
                            <div className="rewards-visual">
                                <img alt="Angel at Christmas pageantry brand mark" src="data:image/webp;base64,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"/>
                            </div>
                        </div>
                    </section>
                    <section className="pageant-bottom">
                        <div className="container">
                            <span>GLORIA! 2026 — THE CHRISTMAS EXPERIENCE</span>
                            <h2>Friday, 11 December 2026 · 3 PM</h2>
                            <p>Proposed venue: ASUU Secretariat, UNIZIK, Awka</p>
                            <Link className="button button-light" href="/">BACK TO GLORIA! HOMEPAGE ↗</Link>
                        </div>
                    </section>
                </main>
                <footer className="footer">
                    <div className="container">
                        <div className="footer-grid">
                            <div>
                                <div className="footer-brand">ODEZULUIGBO</div>
                                <small>ENTERTAINMENT</small>
                                <p>Celebrating talent, culture, creativity and purpose through unforgettable entertainment experiences.</p>
                                <p>In collaboration with SUG UNIZIK for GLORIA! 2026.</p>
                            </div>
                        <div>
                            <div className="footer-heading">Explore</div>
                            <div className="footer-links">
                                <a href="index.html#gloria">GLORIA! 2026</a>
                                <a href="#about-pageant">Angel at Christmas</a>
                                <a href="#registration">Auditions</a>
                                <a href="index.html#tickets">Tickets</a>
                                <a href="index.html#partners">Partnerships</a>
                                </div>
                                </div>
                                <div>
                                    <div className="footer-heading">Get in touch</div>
                                    <div className="footer-links">
                                        <a href="tel:+2348109319627">08109319627</a>
                                        <a href="tel:+2347065508148">07065508148</a>
                                        <a href="https://www.odezuluigbo.com" rel="noopener" target="_blank">www.odezuluigbo.com</a>
                                        <span>Awka, Anambra State, Nigeria</span>
                                    </div>
                                </div>
                            </div>
                            <div className="copyright"><span>© 2026 Odezuluigbo Entertainment. All rights reserved.</span>
                            <span>GLORIA! 2026 · The Christmas Experience</span>
                        </div>
                    </div>
                </footer>
            </div>
        );

    }




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