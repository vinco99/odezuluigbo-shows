"use client";

import { useState, useTransition } from "react";
import { deletePackage, savePackage, togglePackageActive } from "../_actions";

type Pkg = {
  id: string;
  name: string;
  credits: number;
  amount: number;
  active: boolean;
  featured: boolean;
  sortOrder: number;
};

export function CreditPackagesManager({ packages }: { packages: Pkg[] }) {
  const [editing, setEditing] = useState<Pkg | "new" | null>(null);

  return (
    <>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <button className="btn btn-gold btn-sm" onClick={() => setEditing("new")} type="button">
          + Add Package
        </button>
      </div>

      {editing !== null && (
        <PackageForm pkg={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}

      <div className="form-box" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
          <thead>
            <tr style={th}>
              <th style={thCell}>Name</th>
              <th style={thCell}>Credits</th>
              <th style={thCell}>Price</th>
              <th style={thCell}>₦/credit</th>
              <th style={thCell}>Featured</th>
              <th style={thCell}>Status</th>
              <th style={thCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <Row key={p.id} pkg={p} onEdit={setEditing} />
            ))}
            {packages.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: 20, textAlign: "center", color: "var(--w30)" }}>
                  No packages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Row({ pkg, onEdit }: { pkg: Pkg; onEdit: (p: Pkg) => void }) {
  const [pending, startTransition] = useTransition();
  const perCredit = pkg.amount / pkg.credits;

  return (
    <tr style={{ borderBottom: "1px solid var(--w10)" }}>
      <td style={td}>{pkg.name}</td>
      <td style={td}>{pkg.credits.toLocaleString()}</td>
      <td style={td}>₦{pkg.amount.toLocaleString()}</td>
      <td style={td}>₦{perCredit.toFixed(2)}</td>
      <td style={td}>{pkg.featured ? "★" : "—"}</td>
      <td style={td}>
        <span
          style={{
            background: pkg.active ? "rgba(46,139,46,.15)" : "var(--w10)",
            color: pkg.active ? "#2e8b2e" : "var(--w30)",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: ".72rem",
          }}
        >
          {pkg.active ? "Active" : "Paused"}
        </span>
      </td>
      <td style={{ ...td, display: "flex", gap: 6 }}>
        <button className="btn btn-outline btn-xs" type="button" onClick={() => onEdit(pkg)}>
          Edit
        </button>
        <button
          className="btn btn-outline btn-xs"
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(() => togglePackageActive(pkg.id, !pkg.active).then(() => {}))
          }
        >
          {pkg.active ? "Pause" : "Activate"}
        </button>
        <button
          className="btn btn-outline btn-xs"
          type="button"
          disabled={pending}
          onClick={() => {
            if (!confirm(`Delete "${pkg.name}"?`)) return;
            startTransition(() => deletePackage(pkg.id).then(() => {}));
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

function PackageForm({ pkg, onClose }: { pkg: Pkg | null; onClose: () => void }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!pkg;

  function submit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await savePackage(formData);
      if (res.ok) onClose();
      else setError(res.error);
    });
  }

  return (
    <form action={submit} className="form-box" style={{ marginBottom: 24, borderColor: "var(--gold)" }}>
      {isEdit && <input type="hidden" name="id" value={pkg!.id} />}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 12 }}>
        <Field label="Name">
          <input name="name" required defaultValue={pkg?.name ?? ""} style={input} />
        </Field>
        <Field label="Credits">
          <input
            name="credits"
            type="number"
            min={1}
            required
            defaultValue={pkg?.credits ?? 500}
            style={input}
          />
        </Field>
        <Field label="Price (₦)">
          <input
            name="amount"
            type="number"
            min={1}
            required
            defaultValue={pkg?.amount ?? 2500}
            style={input}
          />
        </Field>
        <Field label="Sort order">
          <input
            name="sortOrder"
            type="number"
            defaultValue={pkg?.sortOrder ?? 0}
            style={input}
          />
        </Field>
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" name="active" defaultChecked={pkg?.active ?? true} />
          <span>Active</span>
        </label>
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" name="featured" defaultChecked={pkg?.featured ?? false} />
          <span>Featured (Most Popular)</span>
        </label>
      </div>

      {error && <p style={{ color: "#c94c4c", fontSize: ".85rem", marginTop: 12 }}>{error}</p>}

      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
        <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-gold btn-sm" disabled={pending}>
          {pending ? "Saving…" : isEdit ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: ".72rem", textTransform: "uppercase", color: "var(--w30)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const input: React.CSSProperties = {
  width: "100%",
  background: "var(--w10)",
  border: "1px solid var(--w10)",
  color: "var(--white)",
  padding: "10px 12px",
  borderRadius: "var(--radius)",
  fontSize: ".85rem",
};
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