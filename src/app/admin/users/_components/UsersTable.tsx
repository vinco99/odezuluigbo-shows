"use client";

import { useTransition } from "react";
import { toggleUserSuspension } from "../_actions/toggleUserSuspension";

export type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "CONTESTANT" | "ORGANIZER" | "JUDGE" | "ADMIN";
  creditBalance: number;
  suspended: boolean;
  createdAt: Date;
};

const ROLE_LABEL: Record<AdminUser["role"], string> = {
  USER: "Voter",
  CONTESTANT: "Contestant",
  ORGANIZER: "Organizer",
  JUDGE: "Judge",
  ADMIN: "Staff",
};

function RoleBadge({ role }: { role: AdminUser["role"] }) {
  const isStaff = role === "ADMIN";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: ".72rem",
        background: isStaff ? "rgba(201,168,76,.15)" : "var(--w10)",
        color: isStaff ? "var(--gold)" : "var(--white)",
      }}
    >
      {ROLE_LABEL[role]}
    </span>
  );
}

function StatusBadge({ suspended }: { suspended: boolean }) {
  const color = suspended ? "#c94c4c" : "#2e8b2e";
  const bg = suspended ? "rgba(201,76,76,.15)" : "rgba(46,139,46,.15)";
  return (
    <span
      className="user-status-badge"
      style={{
        background: bg,
        color,
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "0.72rem",
      }}
    >
      {suspended ? "Suspended" : "Active"}
    </span>
  );
}

function SuspendButton({ user }: { user: AdminUser }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="btn btn-outline btn-xs"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await toggleUserSuspension(user.id, !user.suspended);
        })
      }
    >
      {pending ? "..." : user.suspended ? "Reinstate" : "Suspend"}
    </button>
  );
}

export function UsersTable({ users }: { users: AdminUser[] }) {
  return (
    <div className="form-box" style={{ overflowX: "auto", marginBottom: "16px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.85rem",
          minWidth: "680px",
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
            <th style={{ padding: "10px" }}>Name</th>
            <th style={{ padding: "10px" }}>Email</th>
            <th style={{ padding: "10px" }}>Role</th>
            <th style={{ padding: "10px", textAlign: "right" }}>Wallet</th>
            <th style={{ padding: "10px" }}>Status</th>
            <th style={{ padding: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="admin-user-row"
              style={{ borderBottom: "1px solid var(--w10)" }}
            >
              <td style={{ padding: "10px" }}>{user.name ?? "—"}</td>
              <td style={{ padding: "10px" }}>{user.email}</td>
              <td style={{ padding: "10px" }}>
                <RoleBadge role={user.role} />
              </td>
              <td style={{ padding: "10px", textAlign: "right" }}>
                {user.creditBalance.toLocaleString()}
              </td>
              <td style={{ padding: "10px" }}>
                <StatusBadge suspended={user.suspended} />
              </td>
              <td style={{ padding: "10px" }}>
                <SuspendButton user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}