"use client";

import { useState, useTransition } from "react";
import { saveSession } from "../_actions";
import type { Session } from "./SessionsTable";

function toLocalInput(d: Date | string): string {
  const date = new Date(d);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`;
}

export function SessionForm({
  eventId,
  session,
  onClose,
}: {
  eventId: string;
  session: Session | null;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!session;

  function submit(formData: FormData) {
    setError(null);
    formData.set("eventId", eventId);

    // datetime-local values are local time; convert to ISO strings for the server
    const startsAt = formData.get("startsAt");
    const endsAt = formData.get("endsAt");
    if (typeof startsAt === "string" && startsAt) {
      formData.set("startsAt", new Date(startsAt).toISOString());
    }
    if (typeof endsAt === "string" && endsAt) {
      formData.set("endsAt", new Date(endsAt).toISOString());
    }

    startTransition(async () => {
      const res = await saveSession(formData);
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
          {isEdit ? "Edit Session" : "Create Session"}
        </h3>
      </div>

      {isEdit && <input type="hidden" name="id" value={session!.id} />}

      <div style={{ display: "grid", gap: 12 }}>
        <Field label="Name">
          <input
            name="name"
            required
            maxLength={80}
            placeholder="Session 1 & 2"
            defaultValue={session?.name ?? ""}
            style={inputStyle}
          />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Starts at">
            <input
              name="startsAt"
              type="datetime-local"
              required
              defaultValue={session ? toLocalInput(session.startsAt) : ""}
              style={inputStyle}
            />
          </Field>
          <Field label="Ends at">
            <input
              name="endsAt"
              type="datetime-local"
              required
              defaultValue={session ? toLocalInput(session.endsAt) : ""}
              style={inputStyle}
            />
          </Field>
        </div>

        <Field label="Credit limit per user (blank = inherit from event)">
          <input
            name="creditLimitPerUser"
            type="number"
            min={0}
            placeholder="100"
            defaultValue={session?.creditLimitPerUser ?? ""}
            style={inputStyle}
          />
        </Field>
      </div>

      {error && (
        <p style={{ color: "#c94c4c", fontSize: ".85rem", marginTop: 12 }}>{error}</p>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button type="submit" className="btn btn-gold btn-sm" disabled={pending}>
          {pending ? "Saving…" : isEdit ? "Save Changes" : "Create Session"}
        </button>
        <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
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