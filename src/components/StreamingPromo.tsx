import { prisma } from "@/lib/prisma";

const PLATFORM_LABEL: Record<string, string> = {
  "youtube-music": "Stream on YouTube Music",
  spotify: "Listen on Spotify",
  "apple-music": "Listen on Apple Music",
  audiomack: "Listen on Audiomack",
  boomplay: "Listen on Boomplay",
  other: "Listen Now",
};

export async function StreamingPromo() {
  const songs = await prisma.song.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: 2, // ⬅️ hard cap at two
  });

  if (songs.length === 0) return null;

  return (
    <section className="section" style={{ paddingTop: 50, paddingBottom: 50 }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns:
              songs.length === 1
                ? "1fr"
                : "repeat(auto-fit, minmax(360px, 1fr))",
          }}
        >
          {songs.map((song) => {
            const label = PLATFORM_LABEL[song.platform] ?? "Listen Now";
            return (
              <div className="streaming-promo" key={song.id}>
                {song.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={song.coverImage}
                    alt={`${song.title} — ${song.artist}`}
                    className="streaming-promo-img"
                  />
                ) : (
                  <div
                    className="streaming-promo-img"
                    style={{
                      background: "var(--dark-3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--gold)",
                      fontSize: "2rem",
                    }}
                    aria-hidden="true"
                  >
                    ♪
                  </div>
                )}

                <div className="streaming-promo-text">
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "var(--g10)",
                      color: "var(--gold)",
                      fontSize: ".68rem",
                      letterSpacing: ".15rem",
                      textTransform: "uppercase",
                      padding: "5px 14px",
                      borderRadius: 20,
                      marginBottom: 12,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="9"
                      height="9"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Now Streaming
                  </span>

                  <h3
                    style={{
                      fontFamily: "var(--fh)",
                      fontSize: "1.5rem",
                      marginBottom: 4,
                      color: "var(--white)",
                    }}
                  >
                    {song.title}
                  </h3>
                  <p style={{ color: "var(--w70)", fontSize: ".9rem", marginBottom: 18 }}>
                    by {song.artist}
                  </p>

                  <a
                    href={song.streamingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      textDecoration: "none",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm4.8 12.6-6.6 3.6a.6.6 0 0 1-.9-.52V8.32a.6.6 0 0 1 .9-.52l6.6 3.6a.6.6 0 0 1 0 1.04z" />
                    </svg>
                    {label}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}