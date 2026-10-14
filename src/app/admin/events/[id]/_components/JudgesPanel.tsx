import Link from "next/link";

type Judge = {
  id: string;
  name: string;
  title: string | null;
  image: string | null;
};

export function JudgesPanel({
  eventId,
  judges,
}: {
  eventId: string;
  judges: Judge[];
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
          <span className="section-badge">Judging Panel</span>
          <h2 className="section-title" style={{ fontSize: "1.3rem" }}>
            Judges
          </h2>
          {judges.length > 0 && (
            <p className="section-sub" style={{ marginTop: 4 }}>
              {judges.length} judge{judges.length === 1 ? "" : "s"} on this event
            </p>
          )}
        </div>
        <Link
          href={`/admin/events/${eventId}/judges`}
          className="btn btn-outline btn-sm"
        >
          Manage Judges
        </Link>
      </div>

      {judges.length === 0 ? (
        <div className="form-box">
          <p className="section-sub" style={{ margin: 0 }}>
            No judges added yet.
          </p>
        </div>
      ) : (
        <div className="judges-grid">
          {judges.map((j) => (
            <article key={j.id} className="judge-card">
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  margin: "0 auto 12px",
                  background: "var(--w10)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold)",
                  fontFamily: "var(--fh)",
                  fontSize: "1.5rem",
                  border: "1px solid var(--g20)",
                }}
              >
                {j.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={j.image}
                    alt={j.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  j.name[0]?.toUpperCase() ?? "?"
                )}
              </div>
              <h4
                style={{
                  fontFamily: "var(--fh)",
                  fontSize: "1rem",
                  margin: "0 0 4px",
                  color: "var(--white)",
                  textAlign: "center",
                }}
              >
                {j.name}
              </h4>
              {j.title && (
                <p
                  style={{
                    margin: 0,
                    color: "var(--w30)",
                    fontSize: ".78rem",
                    textAlign: "center",
                  }}
                >
                  {j.title}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}