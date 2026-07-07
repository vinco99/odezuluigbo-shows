"use client";

import React, { useState } from 'react';


export default function VoteModal({ contestant, onClose }: { contestant: string; onClose: () => void }) {
  return (
    <div className="modal-overlay" id="voteModal">
        <div className="modal-box">
            <span className="modal-close" id="modalClose">✕</span>
            <h3>Vote for <span id="voteModalName">Contestant</span></h3>
            <p>Choose your voting package to proceed with payment via Paystack.</p>
            <div style={{display: "flex", flexDirection: "column", gap: "11px", marginBottom: "22px"}}>
            <div style={{background: "var(--g10)", border: "1px solid var(--g20)", borderRadius: "var(--radius)", padding: "14px", display: "flex", justifyContent:"space-between", alignItems: "center", cursor: "pointer"}} onClick={}>
                <span>Starter Pack — 500 Votes</span><strong style={{ color: "var(--gold)" }}>₦2,500</strong>
            </div>
            <div style={{background: "var(--g10)", border: "1px solid var(--g20)", borderRadius: "var(--radius)", padding: "14px", display: "flex", justifyContent:"space-between", alignItems: "center", cursor: "pointer"}} onClick={}>
                <span>Single Vote</span><strong style={{ color: "var(--gold)" }}>₦50 / vote</strong>
            </div>
            </div>
            <button className="btn btn-gold btn-full" onClick={}>Proceed to Payment →</button>

            <div id="voteSuccess" style={{display: "none", marginTop: "20px", textAlign: "center"}}>
                <div style={{display: "inline-flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "50%", background: "linear-gradient(135deg, var(--gold-dark), var(--gold-light))", marginBottom: "12px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h4 style={{ color: "var(--gold)", margin: "0 0 8px" }}>Payment Successful!</h4>
                <p id="voteSuccessMsg" style={{ color: "var(--w70)", fontSize: ".88rem", margin: "0 0 4px" }}></p>
                <p style={{ color: "var(--w70)", fontSize: ".78rem", margin: "0 0 16px" }}>A confirmation email has been sent to your email address by Paystack.</p>
                <button className="btn btn-gold btn-full" onClick={() => closeVoteSuccess()}>Done</button>
            </div>
        </div>
    </div>
  );
}