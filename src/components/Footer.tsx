 'use client'
import Link from "next/link";
import Image from "next/image";

 export default function Footer(){
    return(
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <Image className="logo-mark" src="/images/logo.webp" alt="Odezuluigbo" />
                            <div className="logo-text">
                                <span className="logo-main">ODEZULUIGBO</span>
                                <span className="logo-sub">SHOWS</span>
                            </div>
                        </div>
                        <p>Africa's leading Igbo entertainment platform.</p>
                        <p className="footer-tagline">Ka ọ si dị na Ala Igbo</p>
                    </div>
                    <div className="footer-col">
                        <h4>Events</h4>
                        <ul>
                            <li>
                                <Link href="/events">AdaomaIgbonile</Link>
                            </li>
                            <li>
                                <Link href="/events">Odenigwe</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Platform</h4>
                        <ul>
                            <li>
                                <Link href="/vote">Vote</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Social</h4>
                        <ul>
                            <li>
                                <a href="https://www.instagram.com/odezuluigbo_tv" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" style={{verticalAlign:"middle", marginRight: "6px"}}>
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad-4)" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="5" stroke="url(#ig-grad-4)" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad-4)"/>
                                <defs>
                                    <linearGradient id="ig-grad-4" x1="0" y1="24" x2="24" y2="0">
                                        <stop offset="0%" stop-color="#FD5"/>
                                        <stop offset="25%" stop-color="#F56040"/>
                                        <stop offset="50%" stop-color="#E1306C"/>
                                        <stop offset="75%" stopColor="#C13584"/>
                                        <stop offset="100%" stopColor="#833AB4"/>
                                    </linearGradient>
                                </defs>
                                </svg>Instagram</a>
                            </li>
                            <li>
                                <a href="https://youtube.com/@odezuluigbo__tv" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{verticalAlign:"middle", marginRight: "6px"}}>
                                <path d="M23.498 6.186a2.955 2.955 0 0 0-2.074-2.09C19.542 3.5 12 3.5 12 3.5s-7.542 0-9.424.596A2.955 2.955 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.955 2.955 0 0 0 2.074 2.09C4.458 20.5 12 20.5 12 20.5s7.542 0 9.424-.596a2.955 2.955 0 0 0 2.074-2.09C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000"/>
                                <polygon points="9.75,7.5 16.5,12 9.75,16.5" fill="#FFF"/>
                                </svg>YouTube</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 Odezuluigbo Global Ltd.</p>
                </div>
            </div>
        </footer>
    )
 }