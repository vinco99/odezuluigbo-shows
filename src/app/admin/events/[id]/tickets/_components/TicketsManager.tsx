"use client";

import { useState, useTransition } from "react";
import { deleteTicket, toggleTicketActive } from "../_actions";
import { TicketsForm } from "./TicketsForm";

export type AdminTicketPkg = {
  id: string;
  name: string;
  description: string;
  price: number;
  perks: string[];
  maxQuantity: number | null;
  active: boolean;
  eventId: string;
  createdAt: Date;
  sold: number;
};

export function TicketsManager({
  eventId,
  ticketPackages,
}: {
  eventId: string;
  ticketPackages: AdminTicketPkg[];
}) {
  const [editing, setEditing] = useState<AdminTicketPkg | "new" | null>(null);

  return (
    <> 
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <button className="btn btn-gold btn-sm" onClick={() => setEditing("new")} type="button">
          + Add Ticket
        </button>
      </div>

      {editing !== null && (
        <TicketsForm
          eventId={eventId}
          ticketPackage={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}

      <div className="form-box" style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem" }}>
          <thead>
            <tr style={th}>
              <th style={thCell}>Ticket</th>
              <th style={thCell}>Description</th>
              <th style={thCell}>Price</th>
              <th style={thCell}>Perks</th>
              <th style={thCell}>Max Quantity</th>
              <th style={thCell}>Sold</th>
              <th style={thCell}>Status</th>
              <th style={thCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {ticketPackages.map((s) => (
              <Row key={s.id} ticketPackage={s} eventId={eventId} onEdit={setEditing} />
            ))}
            {ticketPackages.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: 20, textAlign: "center", color: "var(--w30)" }}>
                  No Tickets yet for this event.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Row({
  ticketPackage,
  eventId,
  onEdit,
}: {
  ticketPackage: AdminTicketPkg;
  eventId: string;
  onEdit: (j: AdminTicketPkg) => void;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <tr style={{ borderBottom: "1px solid var(--w10)" }}>
      <td style={td}>{ticketPackage.name}</td>
      <td style={td}>{ticketPackage.description}</td>
      <td style={td}>{ticketPackage.price}</td>
      <td style={td}>{ticketPackage.perks.join(", ")}</td>
      <td style={td}>{ticketPackage.maxQuantity}</td>
      <td style={td}>{ticketPackage.sold.toLocaleString()}</td>
      <td style={td}>
        <span
          style={{
            background: ticketPackage.active ? "rgba(46,139,46,.15)" : "var(--w10)",
            color: ticketPackage.active ? "#2e8b2e" : "var(--w30)",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: ".72rem",
          }}
        >
          {ticketPackage.active ? "Active" : "Hidden"}
        </span>
      </td>
      <td style={{ ...td, display: "flex", gap: 6 }}>
        <button className="btn btn-outline btn-xs" type="button" onClick={() => onEdit(ticketPackage)}>
          Edit
        </button>
        <button
          className="btn btn-outline btn-xs"
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(() =>
              toggleTicketActive(ticketPackage.id, !ticketPackage.active, eventId).then(() => {}),
            )
          }
        >
          {ticketPackage.active ? "Hide" : "Show"}
        </button>
        <button
          className="btn btn-outline btn-xs"
          type="button"
          disabled={pending}
          onClick={() => {
            if (!confirm(`Delete "${ticketPackage.name}"?`)) return;
            startTransition(() => deleteTicket(ticketPackage.id, eventId).then(() => {}));
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

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