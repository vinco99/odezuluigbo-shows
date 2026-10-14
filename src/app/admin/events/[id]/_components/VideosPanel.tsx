"use client";

import { useState, useTransition } from "react";
import {
  deleteEventVideo,
  setPrimaryVideo,
  toggleEventVideoActive,
} from "../../_actions";
import { VideoForm } from "./VideoForm";
import { youTubeThumbnailUrl } from "@/lib/youtube";

export type AdminEventVideo = {
  id: string;
  youtubeId: string;
  title: string;
  description: string | null;
  kind: "LIVE" | "UPCOMING" | "REPLAY" | "HIGHLIGHT" | "OTHER";
  isPrimary: boolean;
  active: boolean;
  sortOrder: number;
};

const KIND_LABEL: Record<AdminEventVideo["kind"], string> = {
  LIVE: "Live",
  UPCOMING: "Upcoming",
  REPLAY: "Replay",
  HIGHLIGHT: "Highlight",
  OTHER: "Other",
};

export function VideosPanel({
  eventId,
  videos,
}: {
  eventId: string;
  videos: AdminEventVideo[];
}) {
  const [editing, setEditing] = useState<AdminEventVideo | "new" | null>(null);

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
          <span className="section-badge">Broadcast</span>
          <h2 className="section-title" style={{ fontSize: "1.3rem" }}>
            Event Videos
          </h2>
          <p className="section-sub" style={{ marginTop: 4 }}>
            Live streams, replays, and highlight clips shown on the public event page.
          </p>
        </div>
        <button
          className="btn btn-gold btn-sm"
          type="button"
          onClick={() => setEditing("new")}
        >
          + Add Video
        </button>
      </div>

      {editing !== null && (
        <VideoForm
          eventId={eventId}
          video={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}

      {videos.length === 0 ? (
        <div className="form-box">
          <p className="section-sub" style={{ margin: 0 }}>
            No videos yet. Add a YouTube link to display it on the event page.
          </p>
        </div>
      ) : (
        <div className="form-box" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 640 }}>
            <thead>
              <tr style={th}>
                <th style={thCell}>Video</th>
                <th style={thCell}>Kind</th>
                <th style={thCell}>Primary</th>
                <th style={thCell}>Status</th>
                <th style={thCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v) => (
                <VideoRow
                  key={v.id}
                  video={v}
                  eventId={eventId}
                  onEdit={setEditing}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function VideoRow({
  video,
  eventId,
  onEdit,
}: {
  video: AdminEventVideo;
  eventId: string;
  onEdit: (v: AdminEventVideo) => void;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <tr style={{ borderBottom: "1px solid var(--w10)" }}>
      <td style={td}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={youTubeThumbnailUrl(video.youtubeId)}
            alt={video.title}
            style={{
              width: 80,
              height: 45,
              objectFit: "cover",
              borderRadius: 4,
              background: "var(--w10)",
              flexShrink: 0,
            }}
          />
          <div>
            <strong>{video.title}</strong>
            <div style={{ color: "var(--w30)", fontSize: ".72rem" }}>
              {video.youtubeId}
            </div>
          </div>
        </div>
      </td>

      <td style={td}>
        <span style={badgeStyle}>{KIND_LABEL[video.kind]}</span>
      </td>

      <td style={td}>
        {video.isPrimary ? (
          <span style={{ color: "var(--gold)", fontSize: ".78rem", fontWeight: 600 }}>
            ★ Primary
          </span>
        ) : (
          <button
            type="button"
            className="btn btn-outline btn-xs"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                const res = await setPrimaryVideo(video.id, eventId);
                if (!res.ok) alert(res.error);
              })
            }
          >
            Make primary
          </button>
        )}
      </td>

      <td style={td}>
        <span
          style={{
            background: video.active ? "rgba(46,139,46,.15)" : "var(--w10)",
            color: video.active ? "#2e8b2e" : "var(--w30)",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: ".72rem",
          }}
        >
          {video.active ? "Visible" : "Hidden"}
        </span>
      </td>

      <td style={{ ...td, whiteSpace: "nowrap" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            className="btn btn-outline btn-xs"
            onClick={() => onEdit(video)}
            disabled={pending}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline btn-xs"
            disabled={pending || video.isPrimary}
            title={
              video.isPrimary
                ? "Primary video must stay visible — set another as primary first"
                : video.active
                ? "Hide this video"
                : "Show this video"
            }
            onClick={() =>
              startTransition(async () => {
                const res = await toggleEventVideoActive(video.id, !video.active, eventId);
                if (!res.ok) alert(res.error);
              })
            }
          >
            {video.active ? "Hide" : "Show"}
          </button>
          <button
            type="button"
            className="btn btn-outline btn-xs"
            disabled={pending}
            style={{ color: "#c94c4c", borderColor: "rgba(201,76,76,.4)" }}
            onClick={() => {
              if (!confirm(`Delete "${video.title}"?`)) return;
              startTransition(async () => {
                const res = await deleteEventVideo(video.id, eventId);
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
const td: React.CSSProperties = { padding: 10, verticalAlign: "middle" };
const badgeStyle: React.CSSProperties = {
  background: "var(--w10)",
  color: "var(--w70)",
  padding: "3px 10px",
  borderRadius: 12,
  fontSize: ".7rem",
};