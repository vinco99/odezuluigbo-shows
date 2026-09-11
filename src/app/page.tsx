import Hero from "@/components/Hero";
import motion from "framer-motion";
import Footer from "@/components/Homefooter";
import Link from "next/link";


export default function Home(){

  return(

    <div  className="page active">
      <Hero />

      {/* other sections later */}

      {/*!-- MARQUEE -->*/}
      <div className="marquee-strip">
        <div className="marquee-track">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px" }}>
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
            </svg>AdaomaIgbonile Beauty Pageant
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px"}}>
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
            <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
            <line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/>
            <line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/>
              <line x1="17" y1="7" x2="22" y2="7"/>
            </svg>Odenigwe Reality TV
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px"}}>
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>Igbo Talent Hunt
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px"}}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>Dance Competition
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px"}}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>Comedy Showdown
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px"}}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>Quiz Competition
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px"}}>
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
            </svg>AdaomaIgbonile Beauty Pageant
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px"}}>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px"}}>
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>Igbo Talent Hunt
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px"}}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>Dance Competition
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px"}}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>Comedy Showdown
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px"}}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>Quiz Competition
          </span>
        </div>
      </div>


      {/* FEATURED EVENTS */}
      <section className="section" id="featured-events">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Featured</span>
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-sub">Discover world-class Igbo entertainment and competitions</p>
          </div>
          <div className="events-grid">

            <div className="event-card featured-card" data-aos>
              <div className="ev-img">
                <div className="img-placeholder" data-desc="HERO IMAGE: Elegant Igbo woman in golden traditional attire (George wrapper + coral beads + headgear) wearing a beauty queen crown — full-length pageant banner photo. Warm studio lighting with gold backdrop.">
                  <span className="ph-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg></span><span className="ph-txt">AdaomaIgbonile Pageant<br />Hero Banner Image</span>
                </div>
                <div className="ev-badge">FEATURED</div>
              </div>
              <div className="ev-body">
                <div className="ev-meta">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px" }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Nov 30, 2025</span>
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle", marginRight: "4px" }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Awka</span>
                </div>
                <h3>AdaomaIgbonile Beauty Pageant</h3>
                <p>Celebrating the beauty, intelligence, elegance and excellence of the Igbo woman. Grand Prize: ₦1,000,000</p>
                <div className="ev-prize"><span>Grand Prize</span><strong>₦1,000,000</strong></div>
                <div className="ev-actions">
                  <Link className="btn btn-gold btn-sm" href="/pageant">
                    Learn More
                  </Link>
                  <Link className="btn btn-outline btn-sm" href="/vote">
                    Vote
                  </Link>
                </div>
              </div>
            </div>

            <div className="event-card" data-aos data-aos-delay="100">
              <div className="ev-img">
                <div className="yt-video" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#000", borderRadius: "12px", overflow: "hidden" }}>
                  <iframe src="https://www.youtube.com/embed/Vw7SGH99i6c" style={{ width: "100%", height: "100%", border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowFullScreen={true} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </div>
                <div className="ev-badge live">LIVE SOON</div>
              </div>
              <div className="ev-body">
                <div className="ev-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: "4px"}}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg> 2025
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: "4px"}}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg> Nationwide
                  </span>
                </div>
                <h3>Odenigwe Reality TV Show</h3>
                <div className="ev-actions">
                  <Link className="btn btn-gold btn-sm" href="/reality-tv">
                    Learn More
                  </Link>
                  <Link className="btn btn-outline btn-sm" href="/vote">
                    Vote
                  </Link>
                </div>
              </div>
            </div>

            <div className="event-card" data-aos data-aos-delay="200">
              <div className="ev-img">
                <div className="img-placeholder" data-desc="PROMO IMAGE: Young Igbo performers (singers, dancers) on a bright concert stage with coloured spotlights. Energy, joy, microphones raised. Cultural pride in modern entertainment setting.">
                  <span className="ph-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      <line x1="12" y1="19" x2="12" y2="23"/>
                      <line x1="8" y1="23" x2="16" y2="23"/>
                    </svg>
                  </span>
                  <span className="ph-txt">Igbo Talent Hunt<br />Promo Image</span>
                </div>
              </div>
              <div className="ev-body">
                <div className="ev-meta">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: "4px"}}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg> Coming Soon
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle", marginRight: "4px"}}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg> Multiple Cities
                  </span>
                </div>
                <h3>Igbo Talent Hunt</h3>
                <p>Discover and showcase extraordinary Igbo talent across music, dance, comedy, and more.</p>
                <div className="ev-actions">
                  <Link className="btn btn-gold btn-sm" href="/contact">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

          </div>
          <div className="section-cta">
            <Link className="btn btn-ghost" href="/events">
              View All Events →
            </Link>
          </div>
        </div>
      </section>


      {/* STATS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item"><span className="stat-num" data-target="40">0</span><span className="stat-plus">+</span><span className="stat-label">Contestants</span></div>
            <div className="stat-item"><span className="stat-num" data-target="10">0</span><span className="stat-label">Weeks of Live TV</span></div>
            <div className="stat-item"><span className="stat-num">₦6M</span><span className="stat-plus">+</span><span className="stat-label">Total Prize Pool</span></div>
            <div className="stat-item"><span className="stat-num" data-target="5">0</span><span className="stat-plus">+</span><span className="stat-label">Major Events</span></div>
          </div>
        </div>
      </section>


      {/* CONTESTANTS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Stars</span>
            <h2 className="section-title">Featured Contestants</h2>
            <p className="section-sub">Meet the talented individuals competing for glory</p>
          </div>
          <div className="contestants-grid">
            <div className="contestant-card" data-aos data-aos-delay="100">
              <img src="https://oss-macaron-user.macaron.im/photo/aa93cb00-3a6a-4502-8fbb-e4a98441d4c0.png" alt="Emeka" className="c-img" style={{ width: '100%', height: '235px', objectFit: 'cover', objectPosition: 'top center' }} />
              <div className="c-info">
                <h4>Emeka</h4>
                <span className="c-sub">Odenigwe Reality TV</span>
                <div className="vote-bar">
                  <div className="vote-fill" style={{ width: '0%' }}></div>
                </div>
                <small>0 votes</small>
                <Link className="btn btn-gold btn-xs" href="/vote">
                  Vote
                </Link>
              </div>
            </div>
            <div className="contestant-card" data-aos data-aos-delay="200">
              <img src="https://oss-macaron-user.macaron.im/photo/d77650f5-ba53-4ce8-bc9f-81d07c8576f1.png" alt="Ikenna" className="c-img" style={{ width: '100%', height: '235px', objectFit: 'cover', objectPosition: 'top center' }} />
              <div className="c-info">
                <h4>Ikenna</h4>
                <span className="c-sub">Odenigwe Reality TV</span>
                <div className="vote-bar">
                  <div className="vote-fill" style={{ width: '0%' }}></div>
                </div>
                <small>0 votes</small>
                <Link href="/vote" className="btn btn-gold btn-xs" >
                  Vote
                </Link>
              </div>
            </div>
            <div className="contestant-card" data-aos data-aos-delay="300">
              <img src="https://oss-macaron-user.macaron.im/photo/75f91bb6-3a48-4127-8c38-b5db13be1b2c.jpeg" alt="Obinna" className="c-img" style={{ width: '100%', height: '235px', objectFit: 'cover', objectPosition: 'top center' }} />
              <div className="c-info">
                <h4>Obinna</h4>
                <span className="c-sub">Odenigwe Reality TV</span>
                <div className="vote-bar">
                  <div className="vote-fill" style={{ width: '0%' }}></div>
                </div>
                <small>0 votes</small>
                <Link href="/vote" className="btn btn-gold btn-xs" >
                  Vote
                </Link>
              </div>
            </div>
            <div className="contestant-card" data-aos data-aos-delay="400">
              <img src="https://oss-macaron-user.macaron.im/photo/a2d925f4-f143-424b-b149-d688d4423efc.jpeg" alt="Adaeze" className="c-img" style={{ width: '100%', height: '235px', objectFit: 'cover', objectPosition: 'top center' }} />
              <div className="c-info">
                <h4>Adaeze</h4>
                <span className="c-sub">Odenigwe Reality TV</span>
                <div className="vote-bar">
                  <div className="vote-fill" style={{ width: '0%' }}></div>
                </div>
                <small>0 votes</small>
                <Link href="/vote" className="btn btn-gold btn-xs" >
                  Vote
                </Link>
              </div>
            </div>
            <div className="contestant-card" data-aos data-aos-delay="500">
              <img src="https://oss-macaron-user.macaron.im/photo/62a97ba9-558b-4c98-bfec-f3508a8319bc.jpeg" alt="Ngozi" className="c-img" style={{ width: '100%', height: '235px', objectFit: 'cover', objectPosition: 'top center' }} />
              <div className="c-info">
                <h4>Ngozi</h4>
                <span className="c-sub">Odenigwe Reality TV</span>
                <div className="vote-bar">
                  <div className="vote-fill" style={{ width: '0%' }}></div>
                </div>
                <small>0 votes</small>
                <Link href="/vote" className="btn btn-gold btn-xs" >
                  Vote
                </Link>
              </div>
            </div>
            <div className="contestant-card" data-aos data-aos-delay="600">
              <img src="https://oss-macaron-user.macaron.im/photo/59ede876-e139-48df-a0a8-f15e1dab3977.png" alt="Chioma" className="c-img" style={{ width: '100%', height: '235px', objectFit: 'cover', objectPosition: 'top center' }} />
              <div className="c-info">
                <h4>Chioma</h4>
                <span className="c-sub">Odenigwe Reality TV</span>
                <div className="vote-bar">
                  <div className="vote-fill" style={{ width: '0%' }}></div>
                </div>
                <small>0 votes</small>
                <Link href="/vote" className="btn btn-gold btn-xs" >
                  Vote
                </Link>
              </div>
            </div>
            <div className="contestant-card" data-aos data-aos-delay="700">
              <img src="https://oss-macaron-user.macaron.im/photo/9993e375-a5f0-486e-bfd9-fefcce7ecd7d.png" alt="Ifeoma" className="c-img" style={{ width: '100%', height: '235px', objectFit: 'cover', objectPosition: 'top center' }} />
              <div className="c-info">
                <h4>Ifeoma</h4>
                <span className="c-sub">Odenigwe Reality TV</span>
                <div className="vote-bar">
                  <div className="vote-fill" style={{ width: '0%' }}></div>
                </div>
                <small>0 votes</small>
                <Link href="/vote" className="btn btn-gold btn-xs" >
                  Vote
                </Link>
              </div>
            </div>
            <div className="contestant-card" data-aos data-aos-delay="800">
              <img src="https://oss-macaron-user.macaron.im/photo/220f8db2-f9ac-4c81-b6cc-725c6f9c0a0d.jpeg" alt="Amaka" className="c-img" style={{ width: '100%', height: '235px', objectFit: 'cover', objectPosition: 'top center' }} />
              <div className="c-info">
                <h4>Amaka</h4>
                <span className="c-sub">Odenigwe Reality TV</span>
                <div className="vote-bar">
                  <div className="vote-fill" style={{ width: '0%' }}></div>
                </div>
                <small>0 votes</small>
                <Link href="/vote" className="btn btn-gold btn-xs" >
                  Vote
                </Link>
              </div>
            </div>

          </div>
          <div className="section-cta">
            <Link href="/vote" className="btn btn-gold" >
              Vote for Your Favourite →
            </Link>
          </div>
        </div>
      </section>


      {/* ABOUT STRIP */}
      <div className="about-strip">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <span className="section-badge">Our Mission</span>
              <h2>Rooted in Igbo Wisdom,<br />Built for the World</h2>
              <p>Odezuluigbo is here to bring joy, pride, and world-class entertainment to Igbo people everywhere. We discover talent, celebrate our culture, and put Igbo excellence on the global stage.</p>
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
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Latest</span>
            <h2 className="section-title">From The Blog</h2>
          </div>
          <div className="blog-grid">
            <div className="blog-card" data-aos>
              <img className="b-img" src="https://oss-macaron-user.macaron.im/photo/eb7dfdf9-38cc-4941-830d-e9e533c6ab9c.jpeg" alt="Igbo woman in coral beads and traditional headgear" />
              <div className="b-body">
                <span className="b-cat">Culture</span>
                <h4>The Beauty and Power of Igbo Womanhood</h4>
                <p>Exploring the rich traditions and modern achievements of Igbo women across generations...</p>
                <Link href="/blog" className="b-link">
                  Read More →
                </Link>
              </div>
            </div>
            <div className="blog-card" data-aos data-aos-delay="100">
              <img className="b-img" src="https://oss-macaron-user.macaron.im/photo/b73b2767-dd73-4c84-9a90-d8333d84a5cb.png" alt="Entertainment stage with crowd at Igbo cultural event" />
              <div className="b-body">
                <span className="b-cat">Entertainment</span>
                <h4>How Odezuluigbo Is Changing Igbo Entertainment</h4>
                <p>A deep dive into how our platform is revolutionizing talent discovery and cultural promotion...</p>
                <Link href="/blog" className="b-link" >
                  Read More →
                </Link>
              </div>
            </div>
            <div className="blog-card" data-aos data-aos-delay="200">
              <img className="b-img" src="https://oss-macaron-user.macaron.im/photo/1fb52031-1928-4e36-821c-ab3dbe78620d.jpeg" alt="Igbo diaspora community gathering" />
              <div className="b-body">
                <span className="b-cat">Diaspora</span>
                <h4>Igbos Worldwide: Staying Connected to Culture</h4>
                <p>How the global Igbo diaspora is keeping the flame of culture alive through entertainment...</p>
                <Link href="/blog" className="b-link" >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <div className="sponsors-section">
        <div className="container">
          <div className="section-header"><span className="section-badge">Partners</span><h2 className="section-title">Our Sponsors</h2></div>
          <div className="sponsors-flex">
            <div className="sponsor-logo"><div className="img-placeholder sponsor-img" data-desc="SPONSOR LOGO 1: Corporate sponsor brand logo — white or light logo on dark background. Horizontal format."><span className="ph-txt">Sponsor Logo 1</span></div></div>
            <div className="sponsor-logo"><div className="img-placeholder sponsor-img" data-desc="SPONSOR LOGO 2: Corporate brand logo placeholder"><span className="ph-txt">Sponsor Logo 2</span></div></div>
            <div className="sponsor-logo"><div className="img-placeholder sponsor-img" data-desc="SPONSOR LOGO 3: Brand logo placeholder"><span className="ph-txt">Sponsor Logo 3</span></div></div>
            <div className="sponsor-logo"><div className="img-placeholder sponsor-img" data-desc="SPONSOR LOGO 4: Brand logo placeholder"><span className="ph-txt">Sponsor Logo 4</span></div></div>
            <div className="sponsor-logo"><div className="img-placeholder sponsor-img" data-desc="SPONSOR LOGO 5: Brand logo placeholder"><span className="ph-txt">Sponsor Logo 5</span></div></div>
          </div>
          <div className="section-cta">
            <Link href="/contact" className="btn btn-outline" >
              Become a Sponsor →
            </Link>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Voices</span>
            <h2 className="section-title">What People Say</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card" data-aos>
              <div className="t-stars">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <p>"Odezuluigbo is exactly what our culture needed — a world-class platform that makes us proud to be Igbo!"</p>
              <div className="t-author">
                <div className="t-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <div className="t-stars">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <p>"As an Igbo in the UK, this platform keeps me connected to home. The reality show is absolutely addictive!"</p>
              <div className="t-author">
                <div className="t-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <div className="t-stars">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <p>"The beauty pageant was breathtaking. Igbo women truly shine on this platform. We are proud!"</p>
              <div className="t-author">
                <div className="t-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <Link href="/newsletter" className="btn btn-gold" >
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