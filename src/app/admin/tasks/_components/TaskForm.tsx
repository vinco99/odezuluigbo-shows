"use client";

import { useState, useTransition } from "react";
import { saveTask } from "../_actions";
import type { AdminTask } from "./TaskTable";

export function TaskForm({
  task,
  events,
  onClose,
}: {
  task: AdminTask | null;
  events: { id: string; title: string }[];
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const isEdit = task !== null;

  function submit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await saveTask(formData);
      if (result.ok) onClose();
      else setError(result.error);
    });
  }

  return (
    <div className="form-box" style={{ marginBottom: "24px", borderColor: "var(--gold)" }}>
      <div className="section-header" style={{ marginBottom: "16px" }}>
        <span className="section-badge">{isEdit ? "Edit" : "New"}</span>
        <h3 className="section-title" style={{ fontSize: "1.1rem" }}>
          {isEdit ? "Edit Task" : "Create Task"}
        </h3>
      </div>

      <form action={submit} style={{ display: "grid", gap: "12px" }}>
        {isEdit && <input type="hidden" name="id" value={task.id} />}

        <Field label="Title">
          <input
            name="title"
            required
            defaultValue={task?.title ?? ""}
            maxLength={120}
            style={inputStyle}
          />
        </Field>

        <Field label="Description (optional)">
          <textarea
            name="description"
            defaultValue={task?.description ?? ""}
            maxLength={500}
            rows={2}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          <Field label="Reward (credits)">
            <input
              name="reward"
              type="number"
              required
              min={1}
              defaultValue={task?.reward ?? 30}
              style={inputStyle}
            />
          </Field>

          <Field label="Kind">
            <select name="kind" defaultValue={task?.kind ?? "CUSTOM"} style={inputStyle}>
              <option value="VIDEO">Watch video</option>
              <option value="SOCIAL">Social share</option>
              <option value="SURVEY">Survey</option>
              <option value="CUSTOM">Custom</option>
            </select>
          </Field>

          <Field label="Verification">
            <select
              name="verification"
              defaultValue={task?.verification ?? "AUTO"}
              style={inputStyle}
            >
              <option value="AUTO">Automatic</option>
              <option value="TIMED">Timed</option>
              <option value="MANUAL">Manual review</option>
            </select>
          </Field>
        </div>

        <Field label="Action URL (optional)">
          <input
            name="actionUrl"
            type="url"
            placeholder="https://..."
            defaultValue={task?.actionUrl ?? ""}
            style={inputStyle}
          />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          <Field label="Min seconds (TIMED only)">
            <input
              name="minSeconds"
              type="number"
              min={1}
              defaultValue={task?.minSeconds ?? ""}
              style={inputStyle}
            />
          </Field>

          <Field label="Cooldown (hours)">
            <input
              name="cooldownHours"
              type="number"
              min={1}
              placeholder="blank = one-time"
              defaultValue={task?.cooldownHours ?? ""}
              style={inputStyle}
            />
          </Field>

          <Field label="Max per user">
            <input
              name="maxCompletions"
              type="number"
              min={1}
              placeholder="blank = unlimited"
              defaultValue={task?.maxCompletions ?? ""}
              style={inputStyle}
            />
          </Field>
        </div>

        <Field label="Event (leave blank for global)">
          <select name="eventId" defaultValue={task?.eventId ?? ""} style={inputStyle}>
            <option value="">— Global —</option>
            {events.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>
        </Field>

        <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input type="checkbox" name="active" defaultChecked={task?.active ?? true} />
          <span>Active</span>
        </label>

        {error && (
          <p style={{ color: "#c94c4c", fontSize: ".85rem" }}>{error}</p>
        )}

        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-gold btn-sm" disabled={pending}>
            {pending ? "Saving..." : isEdit ? "Save changes" : "Create task"}
          </button>
        </div>
      </form>
    </div>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: "6px" }}>
      <span style={{ fontSize: ".72rem", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--w30)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}