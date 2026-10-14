"use client";

import { useState, useTransition } from "react";
import { saveEventVideo } from "../../_actions";
import { parseYouTubeId, youTubeThumbnailUrl } from "@/lib/youtube";
import type { AdminEventVideo } from "./VideosPanel";

const KINDS: { value: AdminEventVideo["kind"]; label: string }[] = [
  { value: "LIVE",      label: "Live — currently broadcasting" },
  { value: "UPCOMING",  label: "Upcoming — starting soon" },
  { value: "REPLAY",    label: "Replay — recorded" },
  { value: "HIGHLIGHT", label: "Highlight clip" },
  { value: "OTHER",     label: "Other" },
];

export function VideoForm({
  eventId,
  video,
  onClose,
}: {
  eventId: string;
  video: AdminEventVideo | null;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState(video?.youtubeId ?? "");
  const isEdit = !!video;
  const previewId = parseYouTubeId(url);

  function submit(formData: FormData) {
    setError(null);
    formData.set("eventId", eventId);
    formData.set("youtubeUrl", url);
    if (!formData.has("active")) formData.set("active", "false");
    if (!formData.has("isPrimary")) formData.set("isPrimary", "false");

    startTransition(async () => {
      const res = await saveEventVideo(formData);
      if (res.ok) onClose();
      else setError(res.error);
    });
  }

  return (
    <form
      action={submit}
      className="form-box"
      style={{ marginBottom: 24, borderColor: "var(--gold)" }}
    >
      <div className="section-header" style={{ marginBottom: 16 }}>
        <span className="section-badge">{isEdit ? "Edit" : "New"}</span>
        <h3 className="section-title" style={{ fontSize: "1.1rem" }}>
          {isEdit ? "Edit Video" : "Add Video"}
        </h3>
      </div>

      {isEdit && <input type="hidden" name="id" value={video!.id} />}

      <Field
        label="YouTube URL or video ID"
        hint="Accepts watch URLs, youtu.be, /live/, /embed/, /shorts/, or a bare 11-char ID."
      >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          required
          style={inputStyle}
        />
      </Field>

      {url && (
        <div style={{ marginBottom: 12 }}>
          {previewId ? (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={youTubeThumbnailUrl(previewId)}
                alt="Preview"
                style={{
                  width: 160,
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 4,
                  background: "var(--w10)",
                }}
              />
              <p style={{ color: "#2e8b2e", fontSize: ".8rem", margin: 0 }}>
                ✓ Valid — will embed {previewId}
              </p>
            </div>
          ) : (
            <p style={{ color: "#c94c4c", fontSize: ".8rem", margin: 0 }}>
              Doesn&apos;t look like a YouTube link or video ID.
            </p>
          )}
        </div>
      )}

      <Field label="Title">
        <input
          name="title"
          required
          maxLength={120}
          defaultValue={video?.title ?? ""}
          placeholder="Grand Finale Live"
          style={inputStyle}
        />
      </Field>

      <Field label="Description (optional)">
        <textarea
          name="description"
          rows={2}
          maxLength={500}
          defaultValue={video?.description ?? ""}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Kind">
          <select name="kind" defaultValue={video?.kind ?? "OTHER"} style={inputStyle}>
            {KINDS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Sort order">
          <input
            name="sortOrder"
            type="number"
            defaultValue={video?.sortOrder ?? 0}
            style={inputStyle}
          />
        </Field>
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="checkbox"
            name="active"
            value="true"
            defaultChecked={video?.active ?? true}
          />
          <span>Visible on event page</span>
        </label>

        <label
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            opacity: previewId ? 1 : 0.5,
          }}
        >
          <input
            type="checkbox"
            name="isPrimary"
            value="true"
            disabled={!previewId}
            defaultChecked={video?.isPrimary ?? false}
          />
          <span>
            Set as primary
            {!previewId && (
              <span style={{ color: "var(--w30)", marginLeft: 6 }}>
                (add a valid URL first)
              </span>
            )}
          </span>
        </label>
      </div>

      {error && <p style={{ color: "#c94c4c", fontSize: ".85rem", marginTop: 12 }}>{error}</p>}

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button type="submit" className="btn btn-gold btn-sm" disabled={pending}>
          {pending ? "Saving…" : isEdit ? "Save Changes" : "Add Video"}
        </button>
        <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "grid", gap: 6, marginBottom: 12 }}>
      <span
        style={{
          fontSize: ".72rem",
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--w30)",
        }}
      >
        {label}
      </span>
      {children}
      {hint && (
        <span style={{ color: "var(--w30)", fontSize: ".72rem" }}>{hint}</span>
      )}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--w10)",
  border: "1px solid var(--w10)",
  color: "var(--white)",
  padding: "10px 12px",
  borderRadius: "var(--radius)",
  fontSize: ".85rem",
};