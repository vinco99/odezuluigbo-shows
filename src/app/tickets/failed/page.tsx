// app/tickets/failed/page.tsx
import Link from "next/link";

export default async function TicketFailed({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const { reference } = await searchParams;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: "8px" }}>⚠️</div>
      <div className="section-header">
        <span className="section-badge">Payment Not Completed</span>
        <h2 className="section-title">Something went wrong</h2>
      </div>

      <p style={{ color: "var(--w70)", marginBottom: "24px", lineHeight: 1.6 }}>
        Your payment wasn't completed, or we couldn't confirm it. If you were
        charged, don't worry — your ticket will arrive by email within a few
        minutes. If it doesn't, contact support with the reference below.
      </p>

      {reference && (
        <div
          style={{
            background: "var(--g10)",
            border: "1px solid var(--g20)",
            borderRadius: "var(--radius)",
            padding: "14px 16px",
            marginBottom: "24px",
          }}
        >
          <p style={{ fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--w30)", margin: "0 0 6px" }}>
            Reference
          </p>
          <p style={{ margin: 0, fontFamily: "'Courier New', monospace", color: "var(--gold)", fontSize: ".9rem", wordBreak: "break-all" }}>
            {reference}
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <Link href="/tickets" className="btn btn-gold btn-sm">
          Try Again
        </Link>
        <Link href="/" className="btn btn-outline btn-sm">
          Back Home
        </Link>
      </div>

      <p style={{ color: "var(--w30)", fontSize: ".72rem", marginTop: "24px" }}>
        Still charged but no ticket? Email <strong>support@odezuluigbo.com</strong> with your reference.
      </p>
    </div>
  );
}