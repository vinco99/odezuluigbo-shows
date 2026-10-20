"use client";

import { useState } from "react";
import { CreditPurchaseButton } from "./CreditPurchaseButton";
import { VOTE_PRICE_NAIRA } from "@/lib/voting-config";

export function TopUpTab({
  packages,
  walletBalance,
  isLoggedIn,
}: {
  packages: { id: string; name: string; votes: number; amount: number }[];
  walletBalance: number;
  isLoggedIn: boolean;
}) {
  const [adhocQty, setAdhocQty] = useState(500);

  return (
    <div className="vote-tab-content active">
      <div className="section-header">
        <span className="section-badge">Top Up</span>
        <h2 className="section-title">Fund Your Vote Wallet</h2>
        <p className="section-sub">
          Buy Vote Credits once — spend them on any contestant, in any show. 1 Credit = 1 Vote.
        </p>
      </div>

      {!isLoggedIn && (
        <p style={{ color: "var(--w70)", textAlign: "center", marginBottom: 24 }}>
          <a href="/login?next=/vote" style={{ color: "var(--gold)", textDecoration: "underline" }}>
            Sign in
          </a>{" "}
          to buy credits.
        </p>
      )}

      {packages.length > 0 && (
        <div className="vote-packages">
          {packages.map((pkg, i) => {
            const featured = i === Math.floor(packages.length / 2);
            return (
              <div key={pkg.id} className={`vote-pkg ${featured ? "feat-pkg" : ""}`}>
                {featured && <div className="pkg-badge-top">MOST POPULAR</div>}
                <h3>{pkg.name}</h3>
                <div className="pkg-price">₦{pkg.amount.toLocaleString()}</div>
                <ul>
                  <li>{pkg.votes.toLocaleString()} Vote Credits</li>
                  <li>Never expires</li>
                  <li>Use on any contestant</li>
                  <li>Works across all shows</li>
                </ul>
                <CreditPurchaseButton
                  credits={pkg.votes}
                  className={featured ? "btn btn-gold btn-full" : "btn btn-outline btn-full"}
                  disabled={!isLoggedIn}
                >
                  Get Started →
                </CreditPurchaseButton>
              </div>
            );
          })}
        </div>
      )}

      {/* Adhoc credit purchase */}
      <div
        style={{
          background: "var(--dark-2)",
          border: "1px solid var(--g20)",
          borderRadius: "var(--radius-lg)",
          padding: "28px",
          marginTop: "24px",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontFamily: "var(--fh)", fontSize: "1.3rem", marginBottom: "10px" }}>
          Buy Any Amount
        </h3>
        <p style={{ color: "var(--w70)", fontSize: ".88rem", marginBottom: "20px" }}>
          Credits at{" "}
          <strong style={{ color: "var(--gold)" }}>₦{VOTE_PRICE_NAIRA} per credit</strong>.
          Unlimited. Instant Paystack payment.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="number"
            min={1}
            value={adhocQty}
            onChange={(e) => setAdhocQty(Math.max(1, Number(e.target.value) || 10))}
            style={{
              background: "var(--w10)",
              border: "1px solid var(--w10)",
              color: "var(--white)",
              padding: "12px 16px",
              borderRadius: "var(--radius)",
              fontSize: ".88rem",
              width: "180px",
            }}
          />
          <CreditPurchaseButton
            credits={adhocQty}
            className="btn btn-gold"
            disabled={!isLoggedIn}
          >
            Buy {adhocQty.toLocaleString()} credits · ₦
            {(adhocQty * VOTE_PRICE_NAIRA).toLocaleString()}
          </CreditPurchaseButton>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 20, color: "var(--w30)", fontSize: ".8rem" }}>
        Current balance: <strong style={{ color: "var(--gold)" }}>{walletBalance.toLocaleString()}</strong> credits
      </div>
    </div>
  );
}