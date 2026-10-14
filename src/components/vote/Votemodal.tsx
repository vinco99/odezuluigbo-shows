"use client";

import { useState, useTransition, useEffect } from "react";
import { castCreditVote, initMoneyVote } from "../../app/vote/_actions";
import { VOTE_PRICE_NAIRA } from "@/lib/voting";

export type VoteTarget = {
  contestantId: string;
  contestantName: string;
  eventId: string;
  eventTitle: string;
  isRealityShow: boolean;
  votingFee: number;
};

export function VoteModal({
  target,
  walletBalance,
  sessionCreditsSpent,
  sessionCreditCap,
  onClose,
}: {
  target: VoteTarget | null;
  walletBalance: number;
  /** Credits already spent this session across the whole event (0 if not reality show). */
  sessionCreditsSpent: number;
  /** null = no cap */
  sessionCreditCap: number | null;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"credits" | "money">("credits");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // Reset on open
  useEffect(() => {
    if (target) {
      setMode("credits");
      setQuantity(1);
      setError(null);
    }
  }, [target]);

  // Close on Escape
  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [target, onClose]);

  if (!target) return null;

  const remainingCreditsThisSession =
    sessionCreditCap != null ? Math.max(0, sessionCreditCap - sessionCreditsSpent) : Infinity;

  const creditsOk =
    walletBalance >= quantity && remainingCreditsThisSession >= quantity;

  const moneyTotal = quantity * target.votingFee;

  function submitCredits() {
    setError(null);
    const form = new FormData();
    form.set("contestantId", target!.contestantId);
    form.set("quantity", String(quantity));
    startTransition(async () => {
      const res = await castCreditVote(form);
      if (res.ok) onClose();
      else setError(res.error);
    });
  }

  function submitMoney() {
    setError(null);
    const form = new FormData();
    form.set("contestantId", target!.contestantId);
    form.set("quantity", String(quantity));
    startTransition(async () => {
      const res = await initMoneyVote(form);
      if (res.ok) {
        window.location.href = res.authorizationUrl;
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose} aria-label="Close">✕</span>

        <h3>
          Vote for <span style={{ color: "var(--gold)" }}>{target.contestantName}</span>
        </h3>
        <p style={{ color: "var(--w70)", fontSize: ".85rem", marginTop: 4 }}>
          {target.eventTitle}
        </p>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: 8, margin: "18px 0" }}>
          <button
            type="button"
            onClick={() => setMode("credits")}
            className={mode === "credits" ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm"}
            style={{ flex: 1 }}
          >
            Use Credits
          </button>
          <button
            type="button"
            onClick={() => setMode("money")}
            className={mode === "money" ? "btn btn-gold btn-sm" : "btn btn-outline btn-sm"}
            style={{ flex: 1 }}
          >
            Buy with ₦ (Money)
          </button>
        </div>

        {/* Balance strip */}
        <div
          style={{
            background: "var(--g10)",
            border: "1px solid var(--g20)",
            borderRadius: "var(--radius)",
            padding: "14px",
            marginBottom: 14,
            textAlign: "center",
          }}
        >
          {mode === "credits" ? (
            <>
              <p style={eyebrow}>Wallet Balance</p>
              <p style={bigGold}>{walletBalance.toLocaleString()}</p>
              <p style={eyebrow}>Credits</p>
              {target.isRealityShow && sessionCreditCap != null && (
                <p style={{ color: "var(--w70)", fontSize: ".72rem", marginTop: 8 }}>
                  Session limit: {remainingCreditsThisSession} / {sessionCreditCap} remaining
                </p>
              )}
            </>
          ) : (
            <>
              <p style={eyebrow}>Total to pay</p>
              <p style={bigGold}>₦{moneyTotal.toLocaleString()}</p>
              <p style={eyebrow}>₦{target.votingFee} per vote · unlimited</p>
            </>
          )}
        </div>

        {/* Quantity stepper */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            marginBottom: 16,
          }}
        >
          <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} style={roundBtn}>
            −
          </button>
          <div style={{ textAlign: "center", minWidth: 80 }}>
            <span style={{ fontSize: "1.4rem", color: "var(--white)", fontFamily: "var(--fh)" }}>
              {quantity}
            </span>
            <p style={{ fontSize: ".68rem", color: "var(--w30)", margin: "2px 0 0", textTransform: "uppercase", letterSpacing: ".08em" }}>
              Vote{quantity === 1 ? "" : "s"}
            </p>
          </div>
          <button type="button" onClick={() => setQuantity((q) => q + 1)} style={roundBtn}>
            +
          </button>
        </div>

        {/* Quick picks */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 14, flexWrap: "wrap" }}>
          {[10, 50, 100, 500].map((n) => (
            <button
              key={n}
              type="button"
              className="btn btn-outline btn-xs"
              onClick={() => setQuantity(n)}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Errors */}
        {error && (
          <p style={{ color: "#e05252", fontSize: ".82rem", textAlign: "center", marginBottom: 12 }}>
            {error}
          </p>
        )}

        {/* Insufficient credits warning */}
        {mode === "credits" && !creditsOk && (
          <p style={{ color: "#e05252", fontSize: ".78rem", textAlign: "center", marginBottom: 12 }}>
            {walletBalance < quantity
              ? "Not enough credits. Switch to ₦ payment or top up your wallet."
              : `Session cap reached (${remainingCreditsThisSession} credits left). Buy with ₦ (Money) to bypass.`}
          </p>
        )}

        {/* Submit */}
        <button
          type="button"
          className="btn btn-gold btn-full"
          disabled={pending || (mode === "credits" && !creditsOk)}
          onClick={mode === "credits" ? submitCredits : submitMoney}
        >
          {pending
            ? "Processing..."
            : mode === "credits"
            ? `Vote ${quantity} with Credits`
            : `Pay ₦${moneyTotal.toLocaleString()} with Paystack`}
        </button>

        {mode === "credits" && (
          <p style={{ color: "var(--w30)", fontSize: ".72rem", textAlign: "center", marginTop: 12 }}>
            Need more credits? <a href="/vote?tab=topup" style={{ color: "var(--gold)", textDecoration: "underline" }}>Top up your wallet</a>
          </p>
        )}
      </div>
    </div>
  );
}

const eyebrow: React.CSSProperties = {
  fontSize: ".68rem",
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "var(--w30)",
  margin: 0,
};

const bigGold: React.CSSProperties = {
  fontSize: "clamp(1.2rem,6vw,1.7rem)",
  color: "var(--gold)",
  fontFamily: "var(--fh)",
  margin: "4px 0",
  wordBreak: "break-word",
};

const roundBtn: React.CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  border: "1px solid var(--g20)",
  background: "transparent",
  color: "var(--gold)",
  fontSize: "1.2rem",
  cursor: "pointer",
};