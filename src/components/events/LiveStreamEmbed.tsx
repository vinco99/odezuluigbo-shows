import { youTubeEmbedUrl } from "@/lib/youtube";

export function LiveStreamEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string | null;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span
            className="section-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(201,76,76,.15)",
              color: "#e05252",
            }}
          >
            <span/>
            Watch Now
          </span>
          <h2 className="section-title">{title ?? "Live Stream"}</h2>
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 960,
            margin: "0 auto",
            aspectRatio: "16 / 9",
            background: "#000",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            border: "1px solid var(--w10)",
          }}
        >
          <iframe
            src={youTubeEmbedUrl(videoId)}
            title={title ?? "Live stream"}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        </div>
      </div>
    </section>
  );
}