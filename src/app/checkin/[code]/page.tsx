import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; // your auth helper
import { CheckInButton } from "./CheckInButton";

type TicketStatus = "PENDING" | "VALID" | "CHECKED_IN" | "CANCELLED" | "REFUNDED";

const STATUS_UI: Record<
  TicketStatus,
  { icon: string; label: string; tone: "good" | "bad" | "warn"; note: string }
> = {
  VALID: {
    icon: "✅",
    label: "Valid Ticket",
    tone: "good",
    note: "Admit one. Tap Confirm Entry when the guest is at the door.",
  },
  CHECKED_IN: {
    icon: "🎟️",
    label: "Already Checked In",
    tone: "warn",
    note: "This ticket has already been used. Do not admit again.",
  },
  PENDING: {
    icon: "⏳",
    label: "Payment Not Completed",
    tone: "bad",
    note: "This ticket was never paid for and is not valid for entry.",
  },
  CANCELLED: {
    icon: "🚫",
    label: "Cancelled",
    tone: "bad",
    note: "This ticket has been cancelled and is not valid for entry.",
  },
  REFUNDED: {
    icon: "💸",
    label: "Refunded",
    tone: "bad",
    note: "This ticket was refunded and is not valid for entry.",
  },
};

const TONE_COLOR: Record<"good" | "bad" | "warn", string> = {
  good: "#22c55e",
  bad: "#ef4444",
  warn: "#f59e0b",
};

export default async function CheckInPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { code },
    include: {
      event: true,
      package: true,
      buyer: { select: { id: true } },
    },
  });

  if (!ticket) notFound();

  const session = await auth();
  const viewerId = session?.user?.id;
  const viewerRole = session?.user?.role;

  const isStaff =
    !!viewerId &&
    (viewerRole === "ADMIN" || ticket.event.organizerId === viewerId);

  const status = ticket.status as TicketStatus;
  const ui = STATUS_UI[status] ?? STATUS_UI.PENDING;

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
    <div className="page active" id="page-checkin">
      <section
        className="section"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        <div className="container" style={{ maxWidth: 520, margin: "0 auto" }}>
          {/* Status hero */}
          <div
            style={{
              textAlign: "center",
              padding: "28px 20px",
              borderRadius: "var(--radius)",
              border: `1px solid ${TONE_COLOR[ui.tone]}33`,
              background: `${TONE_COLOR[ui.tone]}12`,
              marginBottom: "24px",
            }}
          >
            <div style={{ fontSize: "3.5rem", lineHeight: 1, marginBottom: "10px" }}>
              {ui.icon}
            </div>
            <h1
              style={{
                margin: "0 0 6px",
                fontSize: "1.6rem",
                color: TONE_COLOR[ui.tone],
                fontFamily: "var(--fh)",
              }}
            >
              {ui.label}
            </h1>
            <p style={{ margin: 0, color: "var(--w70)", fontSize: ".85rem" }}>
              {ui.note}
            </p>
          </div>

          {/* Ticket details */}
          <div
            style={{
              background: "var(--g10)",
              border: "1px solid var(--g20)",
              borderRadius: "var(--radius)",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                fontSize: ".68rem",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "var(--w30)",
                margin: "0 0 8px",
              }}
            >
              {ticket.event.title}
            </p>
            <h2
              style={{
                margin: "0 0 4px",
                color: "var(--white)",
                fontFamily: "var(--fh)",
                fontSize: "1.3rem",
              }}
            >
              {ticket.holderName}
            </h2>
            <p
              style={{
                margin: "0 0 16px",
                color: "var(--gold)",
                fontSize: ".9rem",
              }}
            >
              {ticket.package.name}
            </p>

            <div
              style={{
                borderTop: "1px solid var(--w10)",
                paddingTop: "14px",
              }}
            >
              <DetailRow label="📅" value={eventDate} />
              {venue && <DetailRow label="📍" value={venue} />}
              <DetailRow
                label="Code"
                value={ticket.code.slice(0, 8).toUpperCase() + "…"}
                mono
              />
              {ticket.checkedInAt && (
                <DetailRow
                  label="Checked in"
                  value={ticket.checkedInAt.toLocaleString("en-NG")}
                  mono
                />
              )}
            </div>
          </div>

          {/* Staff action */}
          {isStaff && status === "VALID" && (
            <CheckInButton code={ticket.code} />
          )}

          {isStaff && status === "CHECKED_IN" && (
            <p
              style={{
                textAlign: "center",
                color: "var(--w30)",
                fontSize: ".78rem",
              }}
            >
              Already admitted
              {ticket.checkedInAt
                ? ` at ${ticket.checkedInAt.toLocaleTimeString("en-NG")}`
                : ""}
              .
            </p>
          )}

          {/* Public hint */}
          {!isStaff && status === "VALID" && (
            <p
              style={{
                textAlign: "center",
                color: "var(--w30)",
                fontSize: ".78rem",
              }}
            >
              Show this screen at the entrance. Staff will confirm your entry.
            </p>
          )}

          <div
            style={{
              textAlign: "center",
              marginTop: "28px",
            }}
          >
            <Link href="/" className="btn btn-outline btn-sm">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "16px",
        padding: "7px 0",
        fontSize: ".85rem",
      }}
    >
      <span style={{ color: "var(--w30)", flexShrink: 0 }}>{label}</span>
      <span
        style={{
          color: "var(--white)",
          textAlign: "right",
          fontFamily: mono ? "'Courier New', monospace" : undefined,
          fontSize: mono ? ".78rem" : undefined,
          wordBreak: "break-word",
        }}
      >
        {value}
      </span>
    </div>
  );
}