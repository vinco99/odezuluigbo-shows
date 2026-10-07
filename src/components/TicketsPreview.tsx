"use client"

import Link from "next/link";

export function TicketsPreview(){

    return(
        <div className="container">
          <div style={{maxWidth: "900px", margin: "0 auto", background: "linear-gradient(135deg,var(--dark-2),var(--dark-3))", border: "1px solid var(--gold)", borderRadius: "var(--radius-lg)", padding: "36px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", textAlign: "left"}}>
            <div style={{flex: "1", minWidth: "220px"}}>
              <span className="section-badge">In-Person Events</span>
              <h3 style={{fontFamily: "var(--fh)", fontSize: "1.5rem", margin: "12px 0 6px"}}>Get Your Tickets</h3>
              <p style={{color: "var(--w70)", fontSize: ".9rem", margin: "0"}}>Reserve your seat or table at an Odezuluigbo show — pay securely and receive your ticket by email instantly.</p>
            </div>
            <Link href={"/tickets"} className="btn btn-gold"  style={{flexShrink: "0", display: "inline-flex", alignItems: "center", gap: "8px"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: "0"}}>
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
              <line x1="13" y1="5" x2="13" y2="19" stroke-dasharray="2,2"/>
              </svg>
              Buy Tickets →
            </Link>
          </div>
        </div>
    )
}