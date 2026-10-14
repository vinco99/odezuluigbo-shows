"use client";

import { useState, useTransition } from "react";
import { deleteAd, toggleAdActive } from "../../_actions";
import { AdForm, type AdminAd } from "./AdForm";
import type { AdPlacement } from "@/lib/ad-placements";

/* ---------- status derivation ---------- */

type AdStatus = "Live" | "Scheduled" | "Ended" | "Paused";

function statusOf(ad: AdminAd): AdStatus {
  if (!ad.active) return "Paused";
  const now = Date.now();
  if (ad.startAt && new Date(ad.startAt).getTime() > now) return "Scheduled";
  if (ad.endAt && new Date(ad.endAt).getTime() < now) return "Ended";
  return "Live";
}

const STATUS_STYLE: Record<AdStatus, { color: string; bg: string }> = {
  Live:      { color: "#2e8b2e", bg: "rgba(46,139,46,.15)" },
  Scheduled: { color: "var(--gold)", bg: "rgba(201,168,76,.15)" },
  Ended:     { color: "var(--w30)", bg: "var(--w10)" },
  Paused:    { color: "#c94c4c", bg: "rgba(201,76,76,.15)" },
};

/* ---------- main editor ---------- */

export function AdsEditor({
  placement,
  ads,
}: {
  placement: AdPlacement;
  ads: AdminAd[];
}) {
  const [editing, setEditing] = useState<AdminAd | "new" | null>(null);

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <button
          className="btn btn-gold btn-sm"
          onClick={() => setEditing("new")}
          type="button"
        >
          + Add Ad
        </button>
      </div>

      {editing !== null && (
        <AdForm
          placement={placement}
          ad={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}

      {ads.length === 0 ? (
        <div className="form-box">
          <p className="section-sub" style={{ textAlign: "center", margin: 0 }}>
            No ads for this placement yet.
          </p>
        </div>
      ) : (
        <div className="form-box" style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: ".85rem",
              minWidth: 720,
            }}
          >
            <thead>
              <tr style={th}>
                <th style={thCell}>Title</th>
                <th style={thCell}>Type</th>
                <th style={thCell}>Schedule</th>
                <th style={thCell}>Status</th>
                <th style={thCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <AdRow
                  key={ad.id}
                  ad={ad}
                  placement={placement}
                  onEdit={setEditing}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

/* ---------- row ---------- */

function AdRow({
  ad,
  placement,
  onEdit,
}: {
  ad: AdminAd;
  placement: AdPlacement;
  onEdit: (a: AdminAd) => void;
}) {
  const [pending, startTransition] = useTransition();
  const status = statusOf(ad);
  const style = STATUS_STYLE[status];

  function handleDelete() {
    if (!confirm(`Delete "${ad.title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const res = await deleteAd(ad.id, placement.key);
      if (!res.ok) alert(res.error);
    });
  }

  function handleToggle() {
    startTransition(async () => {
      const res = await toggleAdActive(ad.id, !ad.active, placement.key);
      if (!res.ok) alert(res.error);
    });
  }

  return (
    <tr style={{ borderBottom: "1px solid var(--w10)" }}>
      {/* Title */}
      <td style={td}>
        <strong>{ad.title}</strong>
        {ad.linkUrl && (
          <div style={{ color: "var(--w30)", fontSize: ".72rem", marginTop: 2 }}>
            → {new URL(ad.linkUrl).hostname}
          </div>
        )}
      </td>

      {/* Type */}
      <td style={td}>
        <span style={{ color: "var(--w70)", fontSize: ".8rem" }}>
          {ad.type}
        </span>
      </td>

      {/* Schedule */}
      <td style={td}>
        <ScheduleLabel startAt={ad.startAt} endAt={ad.endAt} />
      </td>

      {/* Status */}
      <td style={td}>
        <span
          style={{
            background: style.bg,
            color: style.color,
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: ".72rem",
          }}
        >
          {status}
        </span>
      </td>

      {/* Actions */}
      <td style={{ ...td, whiteSpace: "nowrap" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            className="btn btn-outline btn-xs"
            onClick={() => onEdit(ad)}
            disabled={pending}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline btn-xs"
            onClick={handleToggle}
            disabled={pending}
            title={ad.active ? "Hide this ad" : "Show this ad"}
          >
            {ad.active ? "Pause" : "Activate"}
          </button>
          <button
            type="button"
            className="btn btn-outline btn-xs"
            onClick={handleDelete}
            disabled={pending}
            style={{ color: "#c94c4c", borderColor: "rgba(201,76,76,.4)" }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ---------- schedule formatter ---------- */

function ScheduleLabel({
  startAt,
  endAt,
}: {
  startAt: Date | null;
  endAt: Date | null;
}) {
  const fmt = (d: Date) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (!startAt && !endAt) {
    return <span style={{ color: "var(--w30)", fontSize: ".78rem" }}>Always</span>;
  }

  return (
    <div style={{ fontSize: ".78rem", color: "var(--w70)", lineHeight: 1.4 }}>
      {startAt ? fmt(startAt) : <span style={{ color: "var(--w30)" }}>anytime</span>}
      <span style={{ color: "var(--w30)" }}> → </span>
      {endAt ? fmt(endAt) : <span style={{ color: "var(--w30)" }}>ongoing</span>}
    </div>
  );
}

/* ---------- styles ---------- */

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
const td: React.CSSProperties = { padding: 10, verticalAlign: "top" };