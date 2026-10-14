const TIER_LABEL: Record<string, string> = {
  PLATINUM: "Platinum",
  GOLD: "Gold",
  SILVER: "Silver",
  BRONZE: "Bronze",
  PARTNER: "Partner",
};

type Sponsor = {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
  tier: string;
};

export function SponsorsPanel({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <section>
      <div className="section-header">
        <span className="section-badge">Powered By</span>
        <h2 className="section-title" style={{ fontSize: "1.3rem" }}>
          Sponsors
        </h2>
        {sponsors.length > 0 && (
          <p className="section-sub" style={{ marginTop: 4 }}>
            {sponsors.length} sponsor{sponsors.length === 1 ? "" : "s"}
          </p>
        )}
      </div>

      {sponsors.length === 0 ? (
        <div className="form-box">
          <p className="section-sub" style={{ margin: 0 }}>
            No sponsors added yet.
          </p>
        </div>
      ) : (
        <div className="sponsors-grid">
          {sponsors.map((s) => {
            const inner = (
              <>
                <div
                  style={{
                    width: "100%",
                    height: 72,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  {s.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.logo}
                      alt={s.name}
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                  ) : (
                    <span style={{ color: "var(--w30)", fontSize: ".75rem" }}>No logo</span>
                  )}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: ".82rem",
                    color: "var(--white)",
                    textAlign: "center",
                  }}
                >
                  {s.name}
                </p>
                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: ".68rem",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    textAlign: "center",
                  }}
                >
                  {TIER_LABEL[s.tier] ?? s.tier}
                </p>
              </>
            );

            return s.website ? (
              <a
                key={s.id}
                href={s.website}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-tile"
                style={{ textDecoration: "none" }}
              >
                {inner}
              </a>
            ) : (
              <div key={s.id} className="sponsor-tile">
                {inner}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}