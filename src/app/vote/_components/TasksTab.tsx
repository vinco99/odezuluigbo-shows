"use client";

import { useMemo } from "react";
import { claimTask } from "@/app/vote/_actions";

type Task = {
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
};

type Completion = {
  taskId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date | string;
};

const ICONS: Record<Task["kind"], string> = {
  VIDEO: "🎬",
  SOCIAL: "📣",
  SURVEY: "📋",
  CUSTOM: "✨",
};

const CTA: Record<Task["kind"], string> = {
  VIDEO: "Watch",
  SOCIAL: "Share",
  SURVEY: "Take Survey",
  CUSTOM: "Start",
};

export function TasksTab({
  tasks,
  completions,
  isLoggedIn,
}: {
  tasks: Task[];
  completions: Completion[];
  isLoggedIn: boolean;
}) {
  const stateByTask = useMemo(() => {
    const map = new Map<string, { count: number; lastAt: Date | null; pending: boolean }>();
    for (const c of completions) {
      const prev = map.get(c.taskId) ?? { count: 0, lastAt: null, pending: false };
      const at = new Date(c.createdAt);
      prev.count += c.status === "APPROVED" ? 1 : 0;
      prev.pending = prev.pending || c.status === "PENDING";
      if (!prev.lastAt || at > prev.lastAt) prev.lastAt = at;
      map.set(c.taskId, prev);
    }
    return map;
  }, [completions]);

  function availableIn(task: Task, lastAt: Date | null) {
    if (!task.cooldownHours || !lastAt) return false;
    const ready = new Date(lastAt.getTime() + task.cooldownHours * 3600_000);
    return ready > new Date() ? ready : false;
  }

  return (
    <div className="vote-tab-content active">
      <div className="section-header">
        <span className="section-badge">Free Votes</span>
        <h2 className="section-title">Earn Bonus Votes</h2>
        <p className="section-sub">
          Complete tasks to earn free credits you can spend on any contestant.
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="form-box">
          <p className="section-sub">No tasks available right now. Check back soon.</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => {
            const state = stateByTask.get(task.id);
            const pending = state?.pending ?? false;
            const cool = availableIn(task, state?.lastAt ?? null);
            const maxed =
              task.maxCompletions != null &&
              (state?.count ?? 0) >= task.maxCompletions;

            let disabled = pending || maxed || !!cool;
            if (!isLoggedIn) disabled = true;

            const buttonLabel = !isLoggedIn
              ? "Sign in"
              : pending
              ? "Pending review"
              : maxed
              ? "Completed"
              : cool
              ? `Ready ${cool.toLocaleDateString()}`
              : CTA[task.kind];

            return (
              <div className="task-item" key={task.id}>
                <span className="task-icon">{ICONS[task.kind]}</span>
                <div className="task-info">
                  <h4>{task.title}</h4>
                  <span>
                    +{task.reward} credit{task.reward === 1 ? "" : "s"}
                    {task.cooldownHours ? ` · every ${task.cooldownHours}h` : ""}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-gold btn-xs"
                  disabled={disabled}
                  onClick={async () => {
                    if (!isLoggedIn) {
                      window.location.href = "/login?next=/vote";
                      return;
                    }
                    const form = new FormData();
                    form.set("taskId", task.id);
                    const res = await claimTask(form);
                    if (!res.ok) {
                      alert(res.error);
                      return;
                    }
                    if ("authorizationUrl" in res && res.authorizationUrl) {
                      window.location.href = res.authorizationUrl;
                    } else {
                      window.location.reload();
                    }
                  }}
                >
                  {buttonLabel}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}