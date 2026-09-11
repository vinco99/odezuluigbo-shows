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
                        <p>Africa's leading Igbo entertainment and cultural platform. Promoting beauty, talent, and excellence worldwide.</p>
                        <p className="footer-tagline">Ka ọ si dị na Ala Igbo</p>
                    </div>

                    <div className="footer-col">
                        <h4>Events</h4>
                        <ul>
                            <li>
                                <Link href="/pageant">AdaomaIgbonile Pageant</Link>
                            </li>
                            <li>
                                <Link href="/reality">Odenigwe Reality TV</Link>
                            </li>
                            <li>
                                <Link href="/events">All Events</Link>
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
                                <Link href="/blog">Blog</Link>
                            </li>
                            <li>
                                <Link href="/about">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact">Contact</Link>
                            </li>
                            <li>
                                <Link href="/organizer">Become an Organizer</Link>
                            </li>
                            <li>
                                <Link href="/dashboard">My Dashboard</Link>
                            </li>
                            <li>
                                <Link href="/admin" style={{ opacity: 0.6 }}>Admin Login</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Social</h4>
                        <ul>
                            <li>
                                <a href="https://www.instagram.com/odezuluigbo_tv" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" style={{verticalAlign:"middle",marginRight: "6"}}>
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad-1)" strokeWidth="2"/>
                                        <circle cx="12" cy="12" r="5" stroke="url(#ig-grad-1)" strokeWidth="2"/>
                                        <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad-1)"/>
                                        <defs>
                                            <linearGradient id="ig-grad-1" x1="0" y1="24" x2="24" y2="0">
                                                <stop offset="0%" stop-color="#FD5"/>
                                                <stop offset="25%" stop-color="#F56040"/>
                                                <stop offset="50%" stop-color="#E1306C"/>
                                                <stop offset="75%" stop-color="#C13584"/>
                                                <stop offset="100%" stop-color="#833AB4"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://youtube.com/@odezuluigbo__tv" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{verticalAlign: "middle", marginRight: "6px"}}>
                                        <path d="M23.498 6.186a2.955 2.955 0 0 0-2.074-2.09C19.542 3.5 12 3.5 12 3.5s-7.542 0-9.424.596A2.955 2.955 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.955 2.955 0 0 0 2.074 2.09C4.458 20.5 12 20.5 12 20.5s7.542 0 9.424-.596a2.955 2.955 0 0 0 2.074-2.09C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000"/>
                                        <polygon points="9.75,7.5 16.5,12 9.75,16.5" fill="#FFF"/>
                                    </svg>YouTube
                                </a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com/@odezuluigbotv" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" style={{verticalAlign: "middle", marginRight: "6px"}}>
                                        <path d="M34.1,11.4c-2.2-1.4-3.7-3.7-4.1-6.3c-0.1-0.5-0.1-1.1-0.1-1.7h-6.3v23.3c0,3-2.5,5.5-5.5,5.5c-1,0-2-0.3-2.9-0.8c-1.6-0.9-2.6-2.6-2.6-4.5c0-2.9,2.4-5.3,5.3-5.3c0.5,0,1,0.1,1.5,0.2v-6.4c-0.5-0.1-1-0.1-1.5-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12V13.5c2.2,1.6,4.9,2.5,7.8,2.5V9.8C36,9.8,35,9.6,34.1,11.4z" fill="#25F4EE"/>
                                        <path d="M35.1,12.4c-2.2-1.4-3.7-3.7-4.1-6.3c-0.1-0.5-0.1-1.1-0.1-1.7h-6.3v23.3c0,3-2.5,5.5-5.5,5.5c-1,0-2-0.3-2.9-0.8c-1.6-0.9-2.6-2.6-2.6-4.5c0-2.9,2.4-5.3,5.3-5.3c0.5,0,1,0.1,1.5,0.2v-6.4c-0.5-0.1-1-0.1-1.5-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12V14.5c2.2,1.6,4.9,2.5,7.8,2.5V10.8C37,10.8,36,10.6,35.1,12.4z" fill="#FE2C55"/>
                                        <path d="M33.1,10.4c-2.2-1.4-3.7-3.7-4.1-6.3c-0.1-0.5-0.1-1.1-0.1-1.7h-6.3v23.3c0,3-2.5,5.5-5.5,5.5c-1,0-2-0.3-2.9-0.8c-1.6-0.9-2.6-2.6-2.6-4.5c0-2.9,2.4-5.3,5.3-5.3c0.5,0,1,0.1,1.5,0.2v-6.4c-0.5-0.1-1-0.1-1.5-0.1c-6.6,0-12,5.4-12,12s5.4,12,12,12s12-5.4,12-12V12.5c2.2,1.6,4.9,2.5,7.8,2.5V8.8C35,8.8,34,8.6,33.1,10.4z" fill="#FFF"/>
                                    </svg>TikTok
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/share/1Bq6LaMjwa" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{verticalAlign: "middle", marginRight: "6px"}}>
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                                    </svg>Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/odezuluigbotv" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style={{verticalAlign: "middle", marginRight: "6px"}}>
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#FFF"/>
                                    </svg>X (Twitter)
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 Odezuluigbo Global Ltd. All Rights Reserved.</p>
                    <p>Designed with <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign: "middle"}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> for the Igbo people worldwide.</p>
                </div>
            </div>
        </footer>
    );
}