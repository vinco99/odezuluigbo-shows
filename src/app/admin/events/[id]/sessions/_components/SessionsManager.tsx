"use client";

import { useState, useTransition } from "react";
import { updateEventCap } from "../_actions";
import { SessionsTable, type Session } from "./SessionsTable";
import { SessionForm } from "./SessionForm";

export function SessionsManager({
  eventId,
  eventCap,
  sessions,
}: {
  eventId: string;
  eventCap: number | null;
  sessions: Session[];
}) {
  const [editing, setEditing] = useState<Session | "new" | null>(null);

  return (
    <>
      <EventCapEditor eventId={eventId} initialCap={eventCap ?? 100} />

      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <button
          type="button"
          className="btn btn-gold btn-sm"
          onClick={() => setEditing("new")}
        >
          + Add Session
        </button>
      </div>

      {editing !== null && (
        <SessionForm
          eventId={eventId}
          session={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}

      <SessionsTable sessions={sessions} onEdit={setEditing} />
    </>
  );
}

function EventCapEditor({
  eventId,
  initialCap,
}: {
  eventId: string;
  initialCap: number;
}) {
  const [cap, setCap] = useState(initialCap);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function save() {
    const form = new FormData();
    form.set("eventId", eventId);
    form.set("creditLimitPerSession", String(cap));
    startTransition(async () => {
      const res = await updateEventCap(form);
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        alert(res.error);
      }
    });
  }

  return (
    <div
      className="form-box"
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 24,
      }}
    >
      <div style={{ flex: 1, minWidth: 240 }}>
        <p
          style={{
            fontSize: ".7rem",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "var(--w30)",
            margin: 0,
          }}
        >
          Event-level credit cap
        </p>
        <p style={{ color: "var(--w70)", fontSize: ".82rem", margin: "4px 0 0" }}>
          Applied per session unless a session overrides it. Set to 0 to remove the cap
          entirely.
        </p>
      </div>

      <input
        type="number"
        min={0}
        value={cap}
        onChange={(e) => setCap(Math.max(0, Number(e.target.value) || 0))}
        style={{
          width: 120,
          background: "var(--w10)",
          border: "1px solid var(--w10)",
          color: "var(--white)",
          padding: "10px 12px",
          borderRadius: "var(--radius)",
          fontSize: ".9rem",
        }}
      />

      <button
        type="button"
        className="btn btn-gold btn-sm"
        onClick={save}
        disabled={pending || cap === initialCap}
      >
        {pending ? "Saving…" : saved ? "Saved ✓" : "Save cap"}
      </button>
    </div>
  );
}