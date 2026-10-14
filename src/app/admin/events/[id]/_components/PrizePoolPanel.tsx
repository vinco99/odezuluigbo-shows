"use client";

import { useState, useTransition } from "react";
import { saveEventPrizes } from "../../_actions";

export function PrizePoolPanel({
  eventId,
  prize1st,
  prize2nd,
  prize3rd,
}: {
  eventId: string;
  prize1st: number | null;
  prize2nd: number | null;
  prize3rd: number | null;
}) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const total = (prize1st ?? 0) + (prize2nd ?? 0) + (prize3rd ?? 0);
  const hasAny = total > 0;

  function submit(formData: FormData) {
        setError(null);
        formData.set("eventId", eventId);
        
        startTransition(async () => {
            const res = await saveEventPrizes(formData);
            if (res.ok) setEditing(false);
            else setError(res.error);
        });
  }

  return (
    <section style={{ marginBottom: 32 }}>
      <div
        className="section-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <span className="section-badge">Prizes</span>
          <h2 className="section-title" style={{ fontSize: "1.3rem" }}>
            Prize Pool
          </h2>
          {hasAny && (
            <p className="section-sub" style={{ marginTop: 4 }}>
              Total:{" "}
              <strong style={{ color: "var(--gold)" }}>
                ₦{total.toLocaleString()}
              </strong>
            </p>
          )}
        </div>
        {!editing && (
          <button
            className="btn btn-outline btn-sm"
            type="button"
            onClick={() => setEditing(true)}
          >
            {hasAny ? "Edit Prizes" : "Add Prizes"}
          </button>
        )}
      </div>

      {!editing ? (
        hasAny ? (
          <div className="tv-show-stats">
            <div className="tv-stat">
              <span className="tv-val">
                {prize1st != null ? `₦${prize1st.toLocaleString()}` : "—"}
              </span>
              <small>Winner (Grand Prize)</small>
            </div>
            <div className="tv-stat">
              <span className="tv-val">
                {prize2nd != null ? `₦${prize2nd.toLocaleString()}` : "—"}
              </span>
              <small>1st Runner-up</small>
            </div>
            <div className="tv-stat">
              <span className="tv-val">
                {prize3rd != null ? `₦${prize3rd.toLocaleString()}` : "—"}
              </span>
              <small>2nd Runner-up</small>
            </div>
          </div>
        ) : (
          <div className="form-box">
            <p className="section-sub" style={{ margin: 0 }}>
              No prizes set. Add them so they appear on the event page and count toward the
              platform's total prize pool.
            </p>
          </div>
        )
      ) : (
        <form
          action={submit}
          className="form-box"
          style={{ borderColor: "var(--gold)" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            <Field label="Winner (₦)">
              <input
                name="prize1st"
                type="number"
                min={0}
                step={1000}
                placeholder="e.g. 5000000"
                defaultValue={prize1st ?? ""}
                style={inputStyle}
              />
            </Field>
            <Field label="1st Runner-up (₦)">
              <input
                name="prize2nd"
                type="number"
                min={0}
                step={1000}
                placeholder="e.g. 2000000"
                defaultValue={prize2nd ?? ""}
                style={inputStyle}
              />
            </Field>
            <Field label="2nd Runner-up (₦)">
              <input
                name="prize3rd"
                type="number"
                min={0}
                step={1000}
                placeholder="e.g. 1000000"
                defaultValue={prize3rd ?? ""}
                style={inputStyle}
              />
            </Field>
          </div>

          {error && (
            <p style={{ color: "#c94c4c", fontSize: ".85rem", marginTop: 12 }}>
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button type="submit" className="btn btn-gold btn-sm" disabled={pending}>
              {pending ? "Saving…" : "Save Prizes"}
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => {
                setEditing(false);
                setError(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
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