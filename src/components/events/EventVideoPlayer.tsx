"use client";

import { useState } from "react";
import { youTubeEmbedUrl, youTubeThumbnailUrl } from "@/lib/youtube";

type Video = {
  id: string;
  youtubeId: string;
  title: string;
  description: string | null;
  kind: string;
};

const KIND_BADGE: Record<string, { label: string; color: string; bg: string; pulse: boolean }> = {
  LIVE:      { label: "Live Now",     color: "#e05252",      bg: "rgba(201,76,76,.15)",  pulse: true },
  UPCOMING:  { label: "Starting Soon", color: "var(--gold)",  bg: "rgba(201,168,76,.15)", pulse: false },
  REPLAY:    { label: "Replay",        color: "var(--w30)",   bg: "var(--w10)",           pulse: false },
  HIGHLIGHT: { label: "Highlight",     color: "var(--gold)",  bg: "rgba(201,168,76,.15)", pulse: false },
  OTHER:     { label: "Watch",         color: "var(--w30)",   bg: "var(--w10)",           pulse: false },
};

export function EventVideoPlayer({
  primary,
  others,
}: {
  primary: Video;
  others: Video[];
}) {
  const [current, setCurrent] = useState<Video>(primary);
  const badge = KIND_BADGE[current.kind] ?? KIND_BADGE.OTHER;

  return (
    <>
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
          key={current.id}
          src={youTubeEmbedUrl(current.youtubeId)}
          title={current.title}
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

      <div style={{ maxWidth: 960, margin: "16px auto 0" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: badge.bg,
            color: badge.color,
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: ".72rem",
          }}
        >
          {badge.pulse && (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: badge.color,
                boxShadow: `0 0 0 3px ${badge.color}40`,
                animation: "pulse 1.6s ease-in-out infinite",
              }}
            />
          )}
          {badge.label}
        </span>

        <h3
          style={{
            fontFamily: "var(--fh)",
            fontSize: "1.2rem",
            margin: "8px 0 4px",
            color: "var(--white)",
          }}
        >
          {current.title}
        </h3>

        {current.description && (
          <p style={{ color: "var(--w70)", fontSize: ".88rem", margin: 0 }}>
            {current.description}
          </p>
        )}
      </div>

      {others.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 12,
            maxWidth: 960,
            margin: "24px auto 0",
          }}
        >
          {others.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setCurrent(v)}
              style={{
                background: "var(--dark-2)",
                border:
                  current.id === v.id
                    ? "1px solid var(--gold)"
                    : "1px solid var(--w10)",
                borderRadius: "var(--radius)",
                padding: 8,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={youTubeThumbnailUrl(v.youtubeId)}
                alt={v.title}
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  objectFit: "cover",
                  borderRadius: 4,
                  background: "var(--w10)",
                }}
                loading="lazy"
              />
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: ".82rem",
                  color: "var(--white)",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {v.title}
              </p>
            </button>
          ))}
        </div>
      )}
    </>
  );
}