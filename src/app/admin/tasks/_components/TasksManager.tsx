"use client";

import { useState } from "react";
import { TaskTable, type AdminTask } from "./TaskTable";
import { TaskForm } from "./TaskForm";
import { PendingSubmissions, type PendingRow } from "./PendingSubmissions";

export function TasksManager({
  tasks,
  events,
  pending,
}: {
  tasks: AdminTask[];
  events: { id: string; title: string }[];
  pending: PendingRow[];
}) {
  const [editing, setEditing] = useState<AdminTask | "new" | null>(null);

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: "16px" }}>
        <button
          className="btn btn-gold btn-sm"
          onClick={() => setEditing("new")}
          type="button"
        >
          + Add New Task
        </button>
      </div>

      {editing !== null && (
        <TaskForm
          task={editing === "new" ? null : editing}
          events={events}
          onClose={() => setEditing(null)}
        />
      )}

      <TaskTable tasks={tasks} onEdit={setEditing} />

      <PendingSubmissions rows={pending} />
    </>
  );
}