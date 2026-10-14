"use client";

import { useTransition } from "react";
import { reviewTaskCompletion } from "../_actions";

export type PendingRow = {
  id: string;
  proof: string | null;
  rewardAmount: number;
  createdAt: Date;
  user: { id: string; name: string | null; email: string };
  task: { id: string; title: string; reward: number };
};

function ReviewButtons({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  function decide(decision: "APPROVED" | "REJECTED") {
    const note = decision === "REJECTED" ? prompt("Reason (optional)") ?? undefined : undefined;
    startTransition(async () => {
      await reviewTaskCompletion(id, decision, note);
    });
  }

  return (
    <div style={{ display: "flex", gap: "6px" }}>
      <button
        className="btn btn-gold btn-xs"
        disabled={pending}
        onClick={() => decide("APPROVED")}
        type="button"
      >
        Approve
      </button>
      <button
        className="btn btn-outline btn-xs"
        disabled={pending}
        onClick={() => decide("REJECTED")}
        type="button"
      >
        Reject
      </button>
    </div>
  );
}

export function PendingSubmissions({ rows }: { rows: PendingRow[] }) {
  if (rows.length === 0) return null;

  return (
    <div style={{ marginTop: "36px" }}>
      <div className="section-header">
        <span className="section-badge">Review Queue</span>
        <h2 className="section-title">Pending Submissions</h2>
        <p className="section-sub">
          {rows.length} task{rows.length === 1 ? "" : "s"} awaiting manual approval
        </p>
      </div>

      <div className="form-box" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: "560px" }}>
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
              <th style={{ padding: "10px" }}>User</th>
              <th style={{ padding: "10px" }}>Task</th>
              <th style={{ padding: "10px" }}>Proof</th>
              <th style={{ padding: "10px" }}>Reward</th>
              <th style={{ padding: "10px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ borderBottom: "1px solid var(--w10)" }}>
                <td style={{ padding: "10px" }}>{r.user.name || r.user.email}</td>
                <td style={{ padding: "10px" }}>{r.task.title}</td>
                <td style={{ padding: "10px", maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {r.proof ? (
                    r.proof.startsWith("http") ? (
                      <a href={r.proof} target="_blank" rel="noreferrer" style={{ color: "var(--gold)" }}>
                        Open proof
                      </a>
                    ) : (
                      r.proof
                    )
                  ) : (
                    <span style={{ color: "var(--w30)" }}>—</span>
                  )}
                </td>
                <td style={{ padding: "10px" }}>+{r.rewardAmount}</td>
                <td style={{ padding: "10px" }}>
                  <ReviewButtons id={r.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}