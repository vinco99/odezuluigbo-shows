"use client";

import { useState, useTransition } from "react";
import { saveTicket } from "../_actions";
import type { AdminTicketPkg } from "./TicketsManager";


export function TicketsForm({
  eventId,
  ticketPackage,
  onClose,
}: {
  eventId: string;
  ticketPackage: AdminTicketPkg | null;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!ticketPackage;

  function submit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      const res = await saveTicket(formData);
      if (res.ok) onClose();
      else setError(res.error);
    });
  }

  return (
    <form
      action={submit}
      className="form-box"
      style={{ maxWidth: 560, marginBottom: 32, borderColor: "var(--gold)" }}
    >
      <div className="section-header" style={{ marginBottom: 16 }}>
        <span className="section-badge">{isEdit ? "Edit" : "New"}</span>
        <h3 className="section-title" style={{ fontSize: "1.1rem" }}>
          {isEdit ? "Edit Ticket" : "Add Ticket"}
        </h3>
      </div>

      <input type="hidden" name="eventId" value={eventId} />

      {isEdit && <input type="hidden" name="id" value={ticketPackage!.id} />}

      <div className="form-group">
        <label>Name</label>
        <input name="name" type="text" required defaultValue={ticketPackage?.name ?? ""}/>
      </div>

      <div className="form-group">
        <label>Price</label>
        <input name="price"type="number" placeholder="3000" defaultValue={ticketPackage?.price ?? ""} required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description"  defaultValue={ticketPackage?.description ?? ""} required/>
      </div>

        <div className="form-group">
            <label>Perks (separate with commas)</label>
            <textarea
                name="perks"
                placeholder="VIP seating, Free drink, Meet and greet"
                defaultValue={ticketPackage?.perks.join(", ") ?? ""}
                required
            />
        </div>

      <div className="form-group">
        <label>Max Quantity (leave empty for unlimited)</label>
        <input name="maxQuantity"type="number"  min="1" step="1" placeholder="100" defaultValue={ticketPackage?.maxQuantity ?? ""}
        />
      </div>

      <label style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
        <input type="checkbox" name="active" defaultChecked={ticketPackage?.active ?? true} />
        <span>Show on event page</span>
      </label>

      {error && <p style={{ color: "#c94c4c", fontSize: ".85rem", marginTop: 12 }}>{error}</p>}

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button type="submit" className="btn btn-gold btn-sm" disabled={pending}>
          {pending ? "Saving…" : isEdit ? "Save Changes" : "Add Ticket"}
        </button>
        <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: ".72rem",
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "var(--w30)",
};