import Hero, { type HeroEvent } from "@/components/Hero";
import motion from "framer-motion";
import Footer from "@/components/Homefooter";
import Link from "next/link";
import { BlogPreview } from "@/components/BlogPreview";
import { EventPreview } from "@/components/EventPreview";
import { ContestantPreview } from "@/components/ContestantPreview";
import { TicketsPreview } from "@/components/TicketsPreview";
import { StreamingPromo } from "@/components/StreamingPromo";
import { SponsorsSection } from "@/components/SponsorsSection";
import { AdSlot } from "@/components/ads/AdSlot";
import { StatsSection } from "@/components/StatsSection";
import { prisma } from "@/lib/prisma";
import { PromoVideo } from "@/components/PromoVideo";

export const dynamic = "force-dynamic";


export default async function Home(){

  const events = await prisma.event.findMany({
    where: { status: { in: ["APPROVED", "LIVE"] } },
    orderBy: { eventDate: "asc" },
    select: {
      id: true,
      title: true,
      eventDate: true,
      registrationStart: true,
      registrationEnd: true,
      voteSessions: {
        select: { id: true, name: true, endsAt: true },
      },
    },
  });

  const heroEvents: HeroEvent[] = events.map((e) => ({
    id: e.id,
    title: e.title,
    eventDate: e.eventDate?.toISOString() ?? null,
    registrationStart: e.registrationStart?.toISOString() ?? null,
    registrationEnd: e.registrationEnd?.toISOString() ?? null,
    voteSessions: e.voteSessions.map((s) => ({
      id: s.id,
      name: s.name,
      endsAt: s.endsAt.toISOString(),
    })),
  }));

  return(

    <div  className="page active">
      <Hero events={heroEvents} />

      {/* other sections later */}

      {/*!-- MARQUEE -->*/}
      <div className="marquee-strip">
        <div className="marquee-track">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
            </svg>AdaomaIgbonile Beauty Pageant
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0}}>
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
            <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
            <line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/>
            <line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/>
              <line x1="17" y1="7" x2="22" y2="7"/>
            </svg>Odenigwe Reality TV
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>Igbo Talent Hunt
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>Dance Competition
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0}}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>Comedy Showdown
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>Quiz Competition
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
            </svg>AdaomaIgbonile Beauty Pageant
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <line x1="2" y1="7" x2="7" y2="7"/>
              <line x1="2" y1="17" x2="7" y2="17"/>
              <line x1="17" y1="17" x2="22" y2="17"/>
              <line x1="17" y1="7" x2="22" y2="7"/>
            </svg>Odenigwe Reality TV
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>Igbo Talent Hunt
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>Dance Competition
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>Comedy Showdown
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0}}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>Quiz Competition
          </span>
        </div>
      </div>

      {/* Streaming Promo */}
      
      <StreamingPromo />

      <PromoVideo />


      {/* FEATURED EVENTS */}
      <section className="section" id="featured-events">

        <EventPreview />

      </section>

      {/* BUY TICKETS*/}
      <section className="section" style={{paddingTop: "0"}}>
        <TicketsPreview />
      </section>

      {/* ADS */}
      <section className="section" style={{paddingTop: "0"}}>
        <div className="container" style={{ margin: "32px auto" }}>
          <AdSlot placementKey="homepage-banner" />
        </div>
      </section>


      {/* STATS */}
      <StatsSection />


      {/* CONTESTANTS */}
      <section className="section">

        <ContestantPreview />

      </section>


      {/* ABOUT STRIP */}
      <div className="about-strip">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <span className="section-badge">Our Mission</span>
              <h2>Rooted in Igbo Wisdom,<br />Built for the World</h2>
              <p>Odezuluigbo is here to bring joy, pride, and world-className entertainment to Igbo people everywhere. We discover talent, celebrate our culture, and put Igbo excellence on the global stage.</p>
              <Link href="/about" className="btn btn-gold" >
                Our Story →
              </Link>
            </div>
            <div>
              <img className="about-visual-img" src="https://oss-macaron-user.macaron.im/photo/6e6be563-ea55-4e69-ae7d-8caf6fb1eeb8.jpeg" alt="Igbo Cultural Celebration" style={{ width: '100%', borderRadius: 'var(--radius)', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>


      {/* BLOG PREVIEW */}
      <section className="section">
  
        <BlogPreview />
        
      </section>

      {/* SPONSORS */}

      <SponsorsSection />

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Voices</span>
            <h2 className="section-title">What People Say</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card" data-aos>
              <div className="t-stars" style={{ flexShrink: "0"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <p>"Odezuluigbo is exactly what our culture needed — a world-className platform that makes us proud to be Igbo!"</p>
              <div className="t-author">
                <div className="t-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: "0"}}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <strong>Chukwuemeka Obi</strong>
                  <small>Lagos, Nigeria</small>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-aos data-aos-delay="100">
              <div className="t-stars" style={{flexShrink: "0"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <p>"As an Igbo in the UK, this platform keeps me connected to home. The reality show is absolutely addictive!"</p>
              <div className="t-author">
                <div className="t-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: "0"}}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <strong>Amaka Ifeoma</strong>
                  <small>London, UK</small>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-aos data-aos-delay="200">
              <div className="t-stars" style={{ flexShrink: "0"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <p>"The beauty pageant was breathtaking. Igbo women truly shine on this platform. We are proud!"</p>
              <div className="t-author">
                <div className="t-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: "0"}}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <strong>Ikenna Nwofor</strong>
                  <small>Enugu, Nigeria</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* NEWSLETTER */}
      <div className="newsletter-section">
        <div className="container">
          <div className="nl-box">
            <div className="nl-text">
              <h2>Stay in the Loop</h2>
              <p>Get updates on events, voting sessions, and exclusive Igbo entertainment news</p>
            </div>

            <div className="nl-form">
              <input type="email" id="nlEmail" placeholder="Enter your email address" className="nl-input"/>
              <Link href="/contact" className="btn btn-gold" >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </div>



      {/* SOCIAL */}
      <div className="social-section">
        <div className="container">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.instagram.com/odezuluigbo_tv" target="_blank" className="social-link"><span className="s-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad)" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="url(#ig-grad)" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)"/><defs><linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0"><stop offset="0%" stopColor="#FD5"/><stop offset="25%" stopColor="#F56040"/><stop offset="50%" stopColor="#E1306C"/><stop offset="75%" stopColor="#C13584"/><stop offset="100%" stopColor="#833AB4"/></linearGradient></defs></svg></span><span>Instagram</span></a>
            <a href="https://youtube.com/@odezuluigbo__tv" target="_blank" className="social-link"><span className="s-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M23.498 6.186a2.955 2.955 0 0 0-2.074-2.09C19.542 3.5 12 3.5 12 3.5s-7.542 0-9.424.596A2.955 2.955 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.955 2.955 0 0 0 2.074 2.09C4.458 20.5 12 20.5 12 20.5s7.542 0 9.424-.596a2.955 2.955 0 0 0 2.074-2.09C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000"/><polygon points="9.75,7.5 16.5,12 9.75,16.5" fill="#FFF"/></svg></span><span>YouTube</span></a>
            <a href="https://www.tiktok.com/@odezuluigbotv" target="_blank" className="social-link"><span className="s-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path d="M34.1,11.4c-2.2-1.4-3.7-3.7-4.1-6.3c-0.1-0.5-0.1-1.1-0.1-1.7h-6.3v23.3c0,3-2.5,5.5-5.5,5.5c-1,0-2-0.3-2.9-0.8c-1.6-0.9-2.6-2.6-2.6-4.5c0-2.9,2.4-5.3,5.3-5.3c0.5,0,1,0.1,1.5,0.2v-6.4c-0.5-0.1-1-0.1-1.5-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12V13.5c2.2,1.6,4.9,2.5,7.8,2.5V9.8C36,9.8,35,9.6,34.1,11.4z" fill="#25F4EE"/><path d="M35.1,12.4c-2.2-1.4-3.7-3.7-4.1-6.3c-0.1-0.5-0.1-1.1-0.1-1.7h-6.3v23.3c0,3-2.5,5.5-5.5,5.5c-1,0-2-0.3-2.9-0.8c-1.6-0.9-2.6-2.6-2.6-4.5c0-2.9,2.4-5.3,5.3-5.3c0.5,0,1,0.1,1.5,0.2v-6.4c-0.5-0.1-1-0.1-1.5-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12V14.5c2.2,1.6,4.9,2.5,7.8,2.5V10.8C37,10.8,36,10.6,35.1,12.4z" fill="#FE2C55"/><path d="M33.1,10.4c-2.2-1.4-3.7-3.7-4.1-6.3c-0.1-0.5-0.1-1.1-0.1-1.7h-6.3v23.3c0,3-2.5,5.5-5.5,5.5c-1,0-2-0.3-2.9-0.8c-1.6-0.9-2.6-2.6-2.6-4.5c0-2.9,2.4-5.3,5.3-5.3c0.5,0,1,0.1,1.5,0.2v-6.4c-0.5-0.1-1-0.1-1.5-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12V12.5c2.2,1.6,4.9,2.5,7.8,2.5V8.8C35,8.8,34,8.6,33.1,10.4z" fill="#FFF"/></svg></span><span>TikTok</span></a>
            <a href="https://www.facebook.com/share/1Bq6LaMjwa" target="_blank" className="social-link"><span className="s-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/></svg></span><span>Facebook</span></a>
            <a href="https://x.com/odezuluigbotv" target="_blank" className="social-link"><span className="s-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#FFF"/></svg></span><span>X (Twitter)</span></a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )

}