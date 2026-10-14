"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function CheckInButton({ code }: { code: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleCheckIn() {
    setError(null);
    const res = await fetch("/api/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Check-in failed");
      return;
    }

    setDone(true);
    // Re-fetch the server component so the page shows "Already Checked In"
    startTransition(() => router.refresh());
  }

  if (done) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "18px",
          borderRadius: "var(--radius)",
          background: "#22c55e22",
          border: "1px solid #22c55e55",
          color: "#22c55e",
          fontWeight: 600,
        }}
      >
        ✅ Entry Confirmed
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleCheckIn}
        disabled={pending}
        className="btn btn-gold btn-full"
        style={{ padding: "16px", fontSize: "1rem" }}
      >
        {pending ? "Confirming…" : "Confirm Entry"}
      </button>
      {error && (
        <p
          style={{
            color: "#ef4444",
            fontSize: ".82rem",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          {error}
        </p>
      )}
    </>
  );
}