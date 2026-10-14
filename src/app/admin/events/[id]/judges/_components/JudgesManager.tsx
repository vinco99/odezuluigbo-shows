"use client";

import { useState, useTransition } from "react";
import { deleteJudge, toggleJudgeActive } from "../_actions";
import { JudgeForm } from "./JudgeForm";

export type AdminJudge = {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  image: string | null;
  imagePublicId: string | null;
  sortOrder: number;
  active: boolean;
};

export function JudgesManager({
  eventId,
  judges,
}: {
  eventId: string;
  judges: AdminJudge[];
}) {
  const [editing, setEditing] = useState<AdminJudge | "new" | null>(null);

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <button className="btn btn-gold btn-sm" onClick={() => setEditing("new")} type="button">
          + Add Judge
        </button>
      </div>

      {editing !== null && (
        <JudgeForm
          eventId={eventId}
          judge={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}

      <div className="form-box" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
          <thead>
            <tr style={th}>
              <th style={thCell}>Judge</th>
              <th style={thCell}>Title</th>
              <th style={thCell}>Status</th>
              <th style={thCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {judges.map((j) => (
              <Row key={j.id} judge={j} eventId={eventId} onEdit={setEditing} />
            ))}
            {judges.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 20, textAlign: "center", color: "var(--w30)" }}>
                  No judges yet for this event.
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
  judge,
  eventId,
  onEdit,
}: {
  judge: AdminJudge;
  eventId: string;
  onEdit: (j: AdminJudge) => void;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <tr style={{ borderBottom: "1px solid var(--w10)" }}>
      <td style={td}>{judge.name}</td>
      <td style={td}>{judge.title ?? "—"}</td>
      <td style={td}>
        <span
          style={{
            background: judge.active ? "rgba(46,139,46,.15)" : "var(--w10)",
            color: judge.active ? "#2e8b2e" : "var(--w30)",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: ".72rem",
          }}
        >
          {judge.active ? "Active" : "Hidden"}
        </span>
      </td>
      <td style={{ ...td, display: "flex", gap: 6 }}>
        <button className="btn btn-outline btn-xs" type="button" onClick={() => onEdit(judge)}>
          Edit
        </button>
        <button
          className="btn btn-outline btn-xs"
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(() =>
              toggleJudgeActive(judge.id, !judge.active, eventId).then(() => {}),
            )
          }
        >
          {judge.active ? "Hide" : "Show"}
        </button>
        <button
          className="btn btn-outline btn-xs"
          type="button"
          disabled={pending}
          onClick={() => {
            if (!confirm(`Delete "${judge.name}"?`)) return;
            startTransition(() => deleteJudge(judge.id, eventId).then(() => {}));
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