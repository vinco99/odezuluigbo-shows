"use client";

import { useState, useTransition, useEffect } from "react";
import { castCreditVote, initMoneyVote } from "../../app/vote/_actions";

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
  sessionCreditsSpent: number;
  sessionCreditCap: number | null;
  onClose: () => void;
}) {
  
  const [mode, setMode] = useState<"credits" | "money">("credits");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (target) {
      setMode("credits");
      setQuantity(1);
      setError(null);
    }
  }, [target]);

  useEffect(() => {
    if (!target) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [target, onClose]);

  if(!target) return null;

  const remainingCreditsThisSession =
    sessionCreditCap !== null
      ? Math.max(0, sessionCreditCap - sessionCreditsSpent)
      : Infinity;

  const creditsOk =
    walletBalance >= quantity &&
    remainingCreditsThisSession >= quantity;

  const moneyTotal = quantity * target.votingFee;

  function submitCredits() {
    setError(null);
    if (!target) return;

    const form = new FormData();
    form.set("contestantId", target.contestantId);
    form.set("quantity", String(quantity));

    startTransition(async () => {
      try {
        const res = await castCreditVote(form);

        if (res.ok) {
          onClose();
        } else {
          setError(res.error || "Unable to cast your vote.");
        }
      } catch (err) {
        console.error("Credit voting failed:", err);
        setError("Something went wrong while casting your vote. Please try again.");
      }
    });
  }

  function submitMoney() {
    setError(null);
    if (!target) return;

    const form = new FormData();
    form.set("contestantId", target.contestantId);
    form.set("quantity", String(quantity));

    startTransition(async () => {
      try {
        const res = await initMoneyVote(form);

        if (res.ok && res.authorizationUrl) {
          window.location.href = res.authorizationUrl;
        } else {
          setError(res.ok ? "Payment authorization URL is missing." : res.error);
        }
      } catch (err) {
        console.error("Money vote initialization failed:", err);
        setError("Unable to start payment. Please try again.");
      }
    });
  }

  const eyebrow: React.CSSProperties = {
    fontSize: ".68rem",
    letterSpacing: ".1em",
    textTransform: "uppercase",
    color: "var(--w30)",
    margin: 0,
  };

  const bigGold: React.CSSProperties = {
    fontSize: "clamp(1.2rem, 6vw, 1.7rem)",
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

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vote-modal-title"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        padding: 16,
        background: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          zIndex: 1000000,
          width: "100%",
          maxWidth: 480,
          maxHeight: "calc(100dvh - 32px)",
          overflowY: "auto",
          background: "#1b1b1b",
          color: "white",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,.5)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close voting dialog"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            border: 0,
            background: "transparent",
            color: "white",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h3 id="vote-modal-title" style={{ paddingRight: 28 }}>
          Vote for{" "}
          <span style={{ color: "var(--gold)" }}>
            {target.contestantName}
          </span>
        </h3>

        <p style={{ color: "var(--w70)", fontSize: ".85rem", marginTop: 4 }}>
          {target.eventTitle}
        </p>

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

        <div
          style={{
            background: "var(--g10)",
            border: "1px solid var(--g20)",
            borderRadius: "var(--radius)",
            padding: 14,
            marginBottom: 14,
            textAlign: "center",
          }}
        >
          {mode === "credits" ? (
            <>
              <p style={eyebrow}>Wallet Balance</p>
              <p style={bigGold}>{walletBalance.toLocaleString()}</p>
              <p style={eyebrow}>Credits</p>

              {target.isRealityShow && sessionCreditCap !== null && (
                <p style={{ color: "var(--w70)", fontSize: ".72rem", marginTop: 8 }}>
                  Session limit: {remainingCreditsThisSession} / {sessionCreditCap} remaining
                </p>
              )}
            </>
          ) : (
            <>
              <p style={eyebrow}>Total to pay</p>
              <p style={bigGold}>₦{moneyTotal.toLocaleString()}</p>
              <p style={eyebrow}>
                ₦{target.votingFee} per vote · unlimited
              </p>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            marginBottom: 16,
          }}
        >
          <button
            type="button"
            aria-label="Decrease vote quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            style={roundBtn}
          >
            −
          </button>

          <div style={{ textAlign: "center", minWidth: 80 }}>
            <span style={{ fontSize: "1.4rem", color: "var(--white)", fontFamily: "var(--fh)" }}>
              {quantity}
            </span>
            <p
              style={{
                fontSize: ".68rem",
                color: "var(--w30)",
                margin: "2px 0 0",
                textTransform: "uppercase",
                letterSpacing: ".08em",
              }}
            >
              Vote{quantity === 1 ? "" : "s"}
            </p>
          </div>

          <button
            type="button"
            aria-label="Increase vote quantity"
            onClick={() => setQuantity((q) => q + 1)}
            style={roundBtn}
          >
            +
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
            marginBottom: 14,
            flexWrap: "wrap",
          }}
        >
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

        {error && (
          <p style={{ color: "#e05252", fontSize: ".82rem", textAlign: "center", marginBottom: 12 }}>
            {error}
          </p>
        )}

        {mode === "credits" && !creditsOk && (
          <p style={{ color: "#e05252", fontSize: ".78rem", textAlign: "center", marginBottom: 12 }}>
            {walletBalance < quantity
              ? "Not enough credits. Switch to ₦ payment or top up your wallet."
              : `Session cap reached (${remainingCreditsThisSession} credits left). Buy with ₦ (Money) to bypass.`}
          </p>
        )}

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
            Need more credits?{" "}
            <a href="/vote?tab=topup" style={{ color: "var(--gold)", textDecoration: "underline" }}>
              Top up your wallet
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
