// app/tickets/success/[ticketId]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function TicketSuccess({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { event: true, package: true, payment: true },
  });

  if (!ticket) notFound();

  const eventDate = ticket.event.eventDate
    ? ticket.event.eventDate.toLocaleString("en-NG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "To be announced";

  const venue = [ticket.event.venue, ticket.event.state, ticket.event.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: "8px" }}>✅</div>
      <div className="section-header">
        <span className="section-badge">Payment Successful</span>
        <h2 className="section-title">You're in!</h2>
      </div>
      <p style={{ color: "var(--w70)", marginBottom: "28px" }}>
        A confirmation with your QR code has been sent to{" "}
        <strong style={{ color: "var(--white)" }}>{ticket.holderEmail}</strong>.
      </p>

      <div
        style={{
          background: "var(--g10)",
          border: "1px solid var(--g20)",
          borderRadius: "var(--radius)",
          padding: "20px",
          textAlign: "left",
          marginBottom: "24px",
        }}
      >
        <h3 style={{ margin: "0 0 12px", color: "var(--white)" }}>
          {ticket.event.title}
        </h3>
        <p style={{ color: "var(--w70)", fontSize: ".85rem", margin: "0 0 4px" }}>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:"middle",marginRight:"4px", flexShrink: "0"}} >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                </svg> {eventDate}
            </span>
        </p>
        {venue && (
          <p style={{ color: "var(--w70)", fontSize: ".85rem", margin: "0 0 16px" }}>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{verticalAlign:"middle",marginRight:"4px", flexShrink: "0"}}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
                </svg> {venue}
            </span>
          </p>
        )}

        <div style={{ borderTop: "1px solid var(--w10)", paddingTop: "14px" }}>
          <Row label="Holder" value={ticket.holderName} />
          <Row label="Package" value={ticket.package.name} />
          <Row
            label="Amount Paid"
            value={`₦ ${ticket.payment.amount.toLocaleString()}`}
            gold
          />
          <Row label="Reference" value={ticket.payment.reference} mono />
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <Link href="/tickets" className="btn btn-outline btn-sm">
          Buy Another
        </Link>
        <Link href="/" className="btn btn-gold btn-sm">
          Back Home
        </Link>
      </div>

      <p style={{ color: "var(--w30)", fontSize: ".72rem", marginTop: "24px" }}>
        Didn't get the email? Check spam, or contact support with your reference.
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  gold,
  mono,
}: {
  label: string;
  value: string;
  gold?: boolean;
  mono?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 0",
        fontSize: ".85rem",
      }}
    >
      <span style={{ color: "var(--w30)" }}>{label}</span>
      <span
        style={{
          color: gold ? "var(--gold)" : "var(--white)",
          fontFamily: mono ? "'Courier New', monospace" : undefined,
          fontSize: mono ? ".78rem" : undefined,
        }}
      >
        {value}
      </span>
    </div>
  );
}