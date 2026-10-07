"use client";
import Link from "next/link";
import { useState } from "react";

export default function ForgottenPage() {
  const [method, setMethod] = useState("email"); // "email" | "phone"
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const contact = method === "email" ? email.trim() : phone.trim();
    if (!contact) return;

    setLoading(true);
    try {
      // await fetch("/api/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ method, contact }),
      // });
      console.log("Send code via", method, "to", contact);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="fpStep1">
      <h2 className="auth-title">Reset Password</h2>
      <p className="auth-subtitle">
        Choose how you'd like to receive your verification code
      </p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "18px" }}>
        <button
          type="button"
          id="fpMethodEmail"
          className={`fp-method-btn ${method === "email" ? "active" : ""}`}
          aria-pressed={method === "email"}
          onClick={() => setMethod("email")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16v16H4z" />
            <path d="M22 6l-10 7L2 6" />
          </svg>
          Email
        </button>

        <button
          type="button"
          id="fpMethodPhone"
          className={`fp-method-btn ${method === "phone" ? "active" : ""}`}
          aria-pressed={method === "phone"}
          onClick={() => setMethod("phone")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Phone
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {method === "email" ? (
          <input
            className="auth-input"
            id="fpContactEmail"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        ) : (
          <input
            className="auth-input"
            id="fpContactPhone"
            type="tel"
            placeholder="Phone number e.g. 08012345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        )}

        <button className="btn btn-gold btn-full" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Verification Code"}
        </button>
      </form>

      <p className="auth-link">
        Remembered your password? <Link href="/login">Sign in</Link>
      </p>
    </div>
  );
}