"use client";

import { useMemo, useState } from "react";
import { UserSearch } from "./UserSearch";
import { UsersTable, type AdminUser } from "./UsersTable";

export function UsersManager({ users }: { users: AdminUser[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      `${u.name ?? ""} ${u.email}`.toLowerCase().includes(q),
    );
  }, [users, query]);

  return (
    <>
      <UserSearch value={query} onChange={setQuery} />
      <UsersTable users={filtered} />
      {filtered.length === 0 && (
        <p
          style={{
            color: "var(--w30)",
            fontSize: ".85rem",
            textAlign: "center",
            padding: "16px 0",
          }}
        >
          No users match that search.
        </p>
      )}
    </>
  );
}