"use client";

import { useTransition } from "react";
import { deleteSession } from "../_actions";

export type Session = {
  id: string;
  name: string;
  startsAt: Date;
  endsAt: Date;
  creditLimitPerUser: number | null;
};

function statusOf(s: Session) {
  const now = Date.now();
  const start = new Date(s.startsAt).getTime();
  const end = new Date(s.endsAt).getTime();
  if (now < start) {
    return { label: "Upcoming", color: "var(--gold)", bg: "rgba(201,168,76,.15)" };
  }
  if (now > end) {
    return { label: "Ended", color: "var(--w30)", bg: "var(--w10)" };
  }
  return { label: "Live", color: "#2e8b2e", bg: "rgba(46,139,46,.15)" };
}

export function SessionsTable({
  sessions,
  onEdit,
}: {
  sessions: Session[];
  onEdit: (s: Session) => void;
}) {
  if (sessions.length === 0) {
    return (
      <div className="form-box">
        <p className="section-sub" style={{ margin: 0, textAlign: "center" }}>
          No sessions configured. Votes are unrestricted for this event (subject to the
          event-level cap above).
        </p>
      </div>
    );
  }

  return (
    <div className="form-box" style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: ".85rem",
          minWidth: 640,
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "1px solid var(--w10)",
              textAlign: "left",
              color: "var(--gold)",
              fontFamily: "var(--fd)",
              fontSize: ".72rem",
              letterSpacing: ".1em",
              textTransform: "uppercase",
            }}
          >
            <th style={thCell}>Session</th>
            <th style={thCell}>Window</th>
            <th style={thCell}>Credit Cap</th>
            <th style={thCell}>Status</th>
            <th style={thCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <Row key={s.id} session={s} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Row({
  session,
  onEdit,
}: {
  session: Session;
  onEdit: (s: Session) => void;
}) {
  const [pending, startTransition] = useTransition();
  const st = statusOf(session);
  const isEnded = st.label === "Ended";

  return (
    <tr style={{ borderBottom: "1px solid var(--w10)" }}>
      <td style={td}>
        <strong>{session.name}</strong>
      </td>
      <td style={{ ...td, fontSize: ".8rem", color: "var(--w70)" }}>
        {new Date(session.startsAt).toLocaleString()}
        <br />
        <span style={{ color: "var(--w30)" }}>→</span>{" "}
        {new Date(session.endsAt).toLocaleString()}
      </td>
      <td style={td}>
        {session.creditLimitPerUser != null ? (
          session.creditLimitPerUser
        ) : (
          <span style={{ color: "var(--w30)" }}>inherit</span>
        )}
      </td>
      <td style={td}>
        <span
          style={{
            background: st.bg,
            color: st.color,
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: ".72rem",
          }}
        >
          {st.label}
        </span>
      </td>
      <td style={{ ...td, whiteSpace: "nowrap" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            className="btn btn-outline btn-xs"
            onClick={() => onEdit(session)}
            disabled={pending}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline btn-xs"
            disabled={pending || isEnded}
            title={isEnded ? "Ended sessions cannot be deleted" : "Delete"}
            onClick={() => {
              if (!confirm(`Delete "${session.name}"?`)) return;
              startTransition(async () => {
                const res = await deleteSession(session.id);
                if (!res.ok) alert(res.error);
              });
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

const thCell: React.CSSProperties = { padding: 10 };
const td: React.CSSProperties = { padding: 10 };