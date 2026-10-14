import Link from "next/link";

type Session = {
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
  if (now < start) return { label: "Upcoming", color: "var(--gold)", bg: "rgba(201,168,76,.15)" };
  if (now > end) return { label: "Ended", color: "var(--w30)", bg: "var(--w10)" };
  return { label: "Live", color: "#2e8b2e", bg: "rgba(46,139,46,.15)" };
}

export function VotingSessionsPanel({
  eventId,
  sessions,
  eventCap,
}: {
  eventId: string;
  sessions: Session[];
  eventCap: number | null;
}) {
  return (
    <section style={{ marginBottom: 32 }}>
      <div
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <span className="section-badge">Voting Schedule</span>
          <h2 className="section-title" style={{ fontSize: "1.3rem" }}>
            Sessions
          </h2>
          <p className="section-sub" style={{ marginTop: 4 }}>
            Credit cap per session:{" "}
            <strong style={{ color: "var(--gold)" }}>{eventCap ?? 100}</strong>{" "}
            credits per user (money votes bypass this).
          </p>
        </div>
        <Link
          href={`/admin/events/${eventId}/sessions`}
          className="btn btn-outline btn-sm"
        >
          Manage Sessions
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="form-box">
          <p className="section-sub" style={{ margin: 0 }}>
            No sessions configured. Votes are unrestricted for this event.
          </p>
        </div>
      ) : (
        <div className="form-box" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 520 }}>
            <thead>
              <tr style={th}>
                <th style={thCell}>Session</th>
                <th style={thCell}>Window</th>
                <th style={thCell}>Credit Cap</th>
                <th style={thCell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => {
                const st = statusOf(s);
                return (
                  <tr key={s.id} style={{ borderBottom: "1px solid var(--w10)" }}>
                    <td style={td}>{s.name}</td>
                    <td style={td}>
                      {new Date(s.startsAt).toLocaleString()} →{" "}
                      {new Date(s.endsAt).toLocaleString()}
                    </td>
                    <td style={td}>{s.creditLimitPerUser ?? eventCap ?? "—"}</td>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

const th: React.CSSProperties = {
  borderBottom: "1px solid var(--w10)",
  textAlign: "left",
  color: "var(--gold)",
  fontFamily: "var(--fd)",
  fontSize: ".72rem",
  letterSpacing: ".1em",
  textTransform: "uppercase",
};
const thCell: React.CSSProperties = { padding: 10 };
const td: React.CSSProperties = { padding: 10 };