"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const OTP_LENGTH = 6;
const CODE_TTL = 300; // 5 minutes, in seconds

function maskContact(method, contact) {
  if (!contact) return method === "email" ? "your email" : "your phone";

  if (method === "email") {
    const [name, domain] = contact.split("@");
    if (!domain) return contact;
    const head = name.slice(0, 1);
    return `${head}${"*".repeat(Math.max(name.length - 1, 3))}@${domain}`;
  }

  return contact.length > 4
    ? `${"*".repeat(contact.length - 4)}${contact.slice(-4)}`
    : contact;
}

function formatTime(total) {
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function OtpPage({
  method = "email",     // "email" | "phone"
  contact = "",         // the address/number the code went to
  onVerified,           // (code) => void
  onChangeMethod,       // () => void  — omit to fall back to a link
}) {
  const [digits, setDigits] = useState(() => Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(CODE_TTL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const inputsRef = useRef([]);
  const code = digits.join("");
  const isComplete = code.length === OTP_LENGTH;
  const expired = secondsLeft === 0;

  /* ---- countdown ---- */
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  /* ---- focus first box on mount ---- */
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  /* ---- clear the "code sent" notice after a moment ---- */
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(id);
  }, [notice]);

  function setDigitAt(index, value) {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function fillFrom(startIndex, text) {
    const chars = text.replace(/\D/g, "").slice(0, OTP_LENGTH - startIndex).split("");
    if (!chars.length) return;

    setDigits((prev) => {
      const next = [...prev];
      chars.forEach((c, i) => {
        next[startIndex + i] = c;
      });
      return next;
    });

    const lastFilled = Math.min(startIndex + chars.length, OTP_LENGTH - 1);
    inputsRef.current[lastFilled]?.focus();
  }

  function handleChange(index, e) {
    const raw = e.target.value.replace(/\D/g, "");
    setError("");

    if (!raw) {
      setDigitAt(index, "");
      return;
    }

    if (raw.length > 1) {
      fillFrom(index, raw);
      return;
    }

    setDigitAt(index, raw);
    if (index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        setDigitAt(index, "");
      } else if (index > 0) {
        e.preventDefault();
        setDigitAt(index - 1, "");
        inputsRef.current[index - 1]?.focus();
      }
      return;
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handlePaste(e) {
    const text = e.clipboardData.getData("text");
    if (!/\d/.test(text)) return;
    e.preventDefault();

    const firstEmpty = digits.findIndex((d) => !d);
    fillFrom(firstEmpty === -1 ? 0 : firstEmpty, text);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!isComplete) {
      setError("Please enter all 6 digits.");
      return;
    }
    if (expired) {
      setError("This code has expired. Request a new one.");
      return;
    }

    setLoading(true);
    try {
      // const res = await fetch("/api/verify-otp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ method, contact, code }),
      // });
      // if (!res.ok) throw new Error("invalid");
      onVerified?.(code);
    } catch {
      setError("That code didn't work. Please try again.");
      setDigits(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (secondsLeft > 0 || loading) return;

    setError("");
    setDigits(Array(OTP_LENGTH).fill(""));
    setSecondsLeft(CODE_TTL);
    setNotice(`A new code was sent to ${maskContact(method, contact)}`);
    inputsRef.current[0]?.focus();

    // await fetch("/api/send-otp", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ method, contact }),
    // });
  }

  return (
    <div id="fpStep2">
      <h2 className="auth-title">Enter Code</h2>
      <p className="auth-subtitle" id="fpSentTo">
            We sent a 6-digit code to your {method === "email" ? "email" : "phone"}
            {contact ? ` (${maskContact(method, contact)})` : ""}
      </p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 6, }}>
          {digits.map((digit, i) => (
            <input key={i} ref={(el) => { inputsRef.current[i] = el; }} className="otp-box" type="text" inputMode="numeric" pattern="[0-9]*" maxLength={1} autoComplete={i === 0 ? "one-time-code" : "off"}
              value={digit}
              aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}
        {!error && notice && <p className="auth-notice">{notice}</p>}

        <p style={{ textAlign: "center", color: "var(--w30)", fontSize: ".72rem", marginBottom: 18, }}>
          {expired ? ( "Your code has expired") : 
          (
            <>
              Code expires in <span id="fpTimer">{formatTime(secondsLeft)}</span>
            </>
          )}
        </p>

        <button className="btn btn-gold btn-full" type="submit" disabled={loading || !isComplete || expired}>
          {loading ? "Verifying…" : "Verify Code"}
        </button>
      </form>

      <p className="auth-link">
        Didn&apos;t get a code?{" "}
        {secondsLeft > 0 ? (
          <span style={{ opacity: 0.6 }}>
            Resend in {formatTime(secondsLeft)}
          </span>
        ) : (
          <button type="button" className="link-btn" onClick={handleResend}>
            Resend
          </button>
        )}
        {" · "}
        {onChangeMethod ? (
          <button type="button" className="link-btn" onClick={onChangeMethod}>
            Change method
          </button>
        ) : (
          <Link href="/forgotten">Change method</Link>
        )}
      </p>
    </div>
  );
}