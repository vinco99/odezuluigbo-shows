"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const MIN_LENGTH = 8;

function NewPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const tooShort = password.length > 0 && password.length < MIN_LENGTH;
  const mismatch = confirm.length > 0 && password !== confirm;
  const canSubmit =
    password.length >= MIN_LENGTH && password === confirm && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < MIN_LENGTH) {
      setError(`Password must be at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) throw new Error("reset failed");

      setDone(true);
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Couldn't reset your password. The link may have expired.");
    } finally {
      setLoading(false);
    }
  }

  /* --- no token = user skipped the OTP step --- */
  if (!token) {
    return (
      <div id="fpStep3">
        <h2 className="auth-title">Link Expired</h2>
        <p className="auth-subtitle">
          This password reset link is no longer valid. Please start again.
        </p>
        <p className="auth-link">
          <Link href="/forgotten">Start over</Link>
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div id="fpStep3">
        <h2 className="auth-title">Password Reset</h2>
        <p className="auth-subtitle">
          Your password has been updated. Redirecting you to sign in…
        </p>
        <p className="auth-link">
          <Link href="/login">Go to sign in</Link>
        </p>
      </div>
    );
  }

  return (
    <div id="fpStep3">
      <h2 className="auth-title">Set New Password</h2>
      <p className="auth-subtitle">
        Choose a strong new password for your account
      </p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <input className={`auth-input ${tooShort ? "auth-input-error" : ""}`}
            type={show ? "text" : "password"}
            id="fpNewPass"
            placeholder="New password"
            autoComplete="new-password"
            minLength={MIN_LENGTH}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
          />
          {tooShort && (
            <span className="auth-hint">
              At least {MIN_LENGTH} characters ({password.length} so far)
            </span>
          )}
        </div>

        <div className="auth-field">
          <input
            className={`auth-input ${mismatch ? "auth-input-error" : ""}`}
            type={show ? "text" : "password"}
            id="fpConfirmPass"
            placeholder="Confirm new password"
            autoComplete="new-password"
            minLength={MIN_LENGTH}
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              setError("");
            }}
            required
          />
          {mismatch && (
            <span className="auth-hint auth-hint-error">
              Passwords don&apos;t match
            </span>
          )}
        </div>

        <label className="auth-checkbox">
          <input
            type="checkbox"
            checked={show}
            onChange={(e) => setShow(e.target.checked)}
          />
          Show passwords
        </label>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <button
          className="btn btn-gold btn-full"
          type="submit"
          disabled={!canSubmit}
        >
          {loading ? "Resetting…" : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

/* useSearchParams needs a Suspense boundary in the App Router */
export default function NewPasswordPage() {
  return (
    <Suspense fallback={null}>
      <NewPasswordForm />
    </Suspense>
  );
}