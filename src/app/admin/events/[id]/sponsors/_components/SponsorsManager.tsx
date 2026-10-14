"use client";

import { useState, useTransition } from "react";
import { SponsorTier } from "@/lib/SponsorTiers";
import { deleteSponsor, toggleSponsorActive } from "../_actions";
import { SponsorForm } from "./SponsorForm";

export type AdminSponsor = {
  id: string;
  name: string;
  tier: SponsorTier;
  website: string | null;
  logo: string | null;
  logoPublicId: string | null;
  sortOrder: number;
  active: boolean;
  eventId: string;
  createdAt: Date;
};

export function SponsorsManager({
  eventId,
  sponsors,
}: {
  eventId: string;
  sponsors: AdminSponsor[];
}) {
  const [editing, setEditing] = useState<AdminSponsor | "new" | null>(null);

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <button className="btn btn-gold btn-sm" onClick={() => setEditing("new")} type="button">
          + Add Sponsor
        </button>
      </div>

      {editing !== null && (
        <SponsorForm
          eventId={eventId}
          sponsor={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}

      <div className="form-box" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
          <thead>
            <tr style={th}>
              <th style={thCell}>Sponsor</th>
              <th style={thCell}>Tier</th>
              <th style={thCell}>Website</th>
              <th style={thCell}>Status</th>
              <th style={thCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((s) => (
              <Row key={s.id} sponsor={s} eventId={eventId} onEdit={setEditing} />
            ))}
            {sponsors.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 20, textAlign: "center", color: "var(--w30)" }}>
                  No Sponsors yet for this event.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Row({
  sponsor,
  eventId,
  onEdit,
}: {
  sponsor: AdminSponsor;
  eventId: string;
  onEdit: (j: AdminSponsor) => void;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <tr style={{ borderBottom: "1px solid var(--w10)" }}>
      <td style={td}>{sponsor.name}</td>
      <td style={td}>{sponsor.tier}</td>
      <td style={td}>{sponsor.website}</td>
      <td style={td}>
        <span
          style={{
            background: sponsor.active ? "rgba(46,139,46,.15)" : "var(--w10)",
            color: sponsor.active ? "#2e8b2e" : "var(--w30)",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: ".72rem",
          }}
        >
          {sponsor.active ? "Active" : "Hidden"}
        </span>
      </td>
      <td style={{ ...td, display: "flex", gap: 6 }}>
        <button className="btn btn-outline btn-xs" type="button" onClick={() => onEdit(sponsor)}>
          Edit
        </button>
        <button
          className="btn btn-outline btn-xs"
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(() =>
              toggleSponsorActive(sponsor.id, !sponsor.active, eventId).then(() => {}),
            )
          }
        >
          {sponsor.active ? "Hide" : "Show"}
        </button>
        <button
          className="btn btn-outline btn-xs"
          type="button"
          disabled={pending}
          onClick={() => {
            if (!confirm(`Delete "${sponsor.name}"?`)) return;
            startTransition(() => deleteSponsor(sponsor.id, eventId).then(() => {}));
          }}
        >
          Delete
        </button>
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
const td: React.CSSProperties = { padding: 10 };