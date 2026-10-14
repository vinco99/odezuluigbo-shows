"use client";

import { useTransition } from "react";
import { deleteTask, toggleTaskActive } from "../_actions";
import { describeReward, TASK_KIND_LABEL, TASK_VERIFICATION_LABEL } from "@/lib/tasks";

export type AdminTask = {
  id: string;
  title: string;
  description: string | null;
  reward: number;
  kind: "VIDEO" | "SOCIAL" | "SURVEY" | "CUSTOM";
  verification: "AUTO" | "TIMED" | "MANUAL";
  actionUrl: string | null;
  minSeconds: number | null;
  cooldownHours: number | null;
  maxCompletions: number | null;
  eventId: string | null;
  active: boolean;
  event: { id: string; title: string } | null;
  _count: { completions: number };
};

function StatusPill({ active }: { active: boolean }) {
  const color = active ? "#2e8b2e" : "var(--w30)";
  const bg = active ? "rgba(46,139,46,.15)" : "var(--w10)";
  return (
    <span style={{ background: bg, color, padding: "4px 12px", borderRadius: 20, fontSize: ".72rem" }}>
      {active ? "Active" : "Paused"}
    </span>
  );
}

function RowActions({ task, onEdit }: { task: AdminTask; onEdit: (t: AdminTask) => void }) {
  const [pending, startTransition] = useTransition();

  return (
    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
      <button className="btn btn-outline btn-xs" onClick={() => onEdit(task)} type="button">
        Edit
      </button>
      <button
        className="btn btn-outline btn-xs"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await toggleTaskActive(task.id, !task.active);
          })
        }
        type="button"
      >
        {task.active ? "Pause" : "Activate"}
      </button>
      <button
        className="btn btn-outline btn-xs"
        disabled={pending}
        onClick={() => {
          if (!confirm(`Delete "${task.title}"? This cannot be undone.`)) return;
          startTransition(async () => {
            await deleteTask(task.id);
          });
        }}
        type="button"
      >
        Delete
      </button>
    </div>
  );
}

export function TaskTable({
  tasks,
  onEdit,
}: {
  tasks: AdminTask[];
  onEdit: (t: AdminTask) => void;
}) {
  return (
    <div className="form-box" style={{ overflowX: "auto", marginBottom: "32px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: ".85rem",
          minWidth: "720px",
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "1px solid var(--w10)",
              textAlign: "left",
              color: "var(--gold)",
              fontFamily: "var(--fd)",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <th style={{ padding: "10px" }}>Task</th>
            <th style={{ padding: "10px" }}>Reward</th>
            <th style={{ padding: "10px" }}>Verification</th>
            <th style={{ padding: "10px" }}>Scope</th>
            <th style={{ padding: "10px", textAlign: "right" }}>Completions</th>
            <th style={{ padding: "10px" }}>Status</th>
            <th style={{ padding: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} style={{ borderBottom: "1px solid var(--w10)" }}>
              <td style={{ padding: "10px" }}>
                <strong>{task.title}</strong>
                <div style={{ color: "var(--w30)", fontSize: ".75rem" }}>
                  {TASK_KIND_LABEL[task.kind]}
                </div>
              </td>
              <td style={{ padding: "10px" }}>+{task.reward} credits</td>
              <td style={{ padding: "10px" }}>
                {TASK_VERIFICATION_LABEL[task.verification]}
                {task.verification === "TIMED" && task.minSeconds && (
                  <div style={{ color: "var(--w30)", fontSize: ".72rem" }}>
                    {task.minSeconds}s min
                  </div>
                )}
              </td>
              <td style={{ padding: "10px", color: "var(--w30)" }}>
                {task.event?.title ?? "Global"}
              </td>
              <td style={{ padding: "10px", textAlign: "right" }}>
                {task._count.completions}
              </td>
              <td style={{ padding: "10px" }}>
                <StatusPill active={task.active} />
              </td>
              <td style={{ padding: "10px" }}>
                <RowActions task={task} onEdit={onEdit} />
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td colSpan={7} style={{ padding: "20px", textAlign: "center", color: "var(--w30)" }}>
                No tasks yet. Create one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}