"use client";

import { useState } from "react";
import Link from "next/link";
import type { AdPlacement } from "@/lib/ad-placements";

type AdRow = {
  id: string;
  placementKey: string;
  title: string;
  type: "IMAGE" | "HTML" | "ADSENSE";
  active: boolean;
  startAt: Date | null;
  endAt: Date | null;
  impressions: number;
  clicks: number;
};

export function PlacementsOverview({
  placements,
  adsByPlacement,
  now,
}: {
  placements: AdPlacement[];
  adsByPlacement: Record<string, AdRow[]>;
  now: Date;
}) {
  return (
    <div className="form-box" style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: 720 }}>
        <thead>
          <tr style={th}>
            <th style={thCell}>Placement</th>
            <th style={thCell}>Size</th>
            <th style={thCell}>Live ad</th>
            <th style={thCell}>Impr. / Clicks</th>
            <th style={thCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {placements.map((p) => {
            const ads = adsByPlacement[p.key] ?? [];
            const live = ads.find(
              (a) =>
                a.active &&
                (!a.startAt || a.startAt <= now) &&
                (!a.endAt || a.endAt >= now),
            );

            return (
              <tr key={p.key} style={{ borderBottom: "1px solid var(--w10)" }}>
                <td style={td}>
                  <strong>{p.name}</strong>
                  <div style={{ color: "var(--w30)", fontSize: ".72rem" }}>{p.key}</div>
                </td>
                <td style={td}>
                  {p.width}×{p.height}
                </td>
                <td style={td}>
                  {live ? (
                    <>
                      <strong>{live.title}</strong>
                      <div style={{ color: "var(--w30)", fontSize: ".72rem" }}>
                        {live.type}
                      </div>
                    </>
                  ) : (
                    <span style={{ color: "var(--w30)" }}>No active ad</span>
                  )}
                </td>
                <td style={td}>
                  {live ? `${live.impressions} / ${live.clicks}` : "—"}
                </td>
                <td style={td}>
                  <Link
                    href={`/admin/ads/${p.key}`}
                    className="btn btn-outline btn-xs"
                  >
                    Manage Ads ({ads.length})
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
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