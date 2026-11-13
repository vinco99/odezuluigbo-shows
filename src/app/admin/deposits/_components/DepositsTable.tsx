"use client";

import { useState } from "react";
import { RefundDialog } from "./RefundDialog";

export type DepositRow = {
    id: string;
    reference: string;
    amount: number;
    type: string;
    status: string;
    createdAt: string;
    customer: string;
    customerEmail: string | null;
    event: string | null;
    refund: {
        status: "PROCESSING" | "PENDING" | "PROCESSED" | "FAILED";
        reason: string;
        failureReason: string | null;
        createdAt: string;
        processedAt: string | null;
        by: string;
    } | null;
};

const REFUND_LABEL: Record<NonNullable<DepositRow["refund"]>["status"], { text: string; cls: string }> = {
    PROCESSING: { text: "refund processing", cls: "pending" },
    PENDING: { text: "refund pending", cls: "pending" },
    PROCESSED: { text: "refunded", cls: "refunded" },
    FAILED: { text: "refund failed", cls: "failed" },
};

const WHAT_IS_REVERSED: Record<string, string> = {
    CREDIT_PURCHASE: "The credits from this purchase are taken back from the user's wallet. Blocked if they've already spent them.",
    EVENT_TICKET: "The ticket is cancelled and can't be used for entry. Blocked if it was already checked in.",
    VOTE: "These paid votes stop counting for the contestant.",
    CONTESTANT_REGISTRATION: "The contestant's application is set to rejected.",
};

const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export function DepositsTable({ rows }: { rows: DepositRow[] }) {
    const [active, setActive] = useState<DepositRow | null>(null);

    return (
        <div className="form-box" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: "860px" }}>
                <thead>
                    <tr style={{ borderBottom: "1px solid var(--w10)", textAlign: "left", color: "var(--gold)" }}>
                        <th style={{ padding: "10px" }}>Date</th>
                        <th style={{ padding: "10px" }}>Customer</th>
                        <th style={{ padding: "10px" }}>For</th>
                        <th style={{ padding: "10px" }}>Amount</th>
                        <th style={{ padding: "10px" }}>Reference</th>
                        <th style={{ padding: "10px" }}>Status</th>
                        <th style={{ padding: "10px" }}>Refund</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r) => {
                        const refundable = r.status === "PAID" && (!r.refund || r.refund.status === "FAILED");
                        const label = r.refund ? REFUND_LABEL[r.refund.status] : null;
                        return (
                            <tr key={r.id} style={{ borderBottom: "1px solid var(--w10)", verticalAlign: "top" }}>
                                <td style={{ padding: "10px", whiteSpace: "nowrap" }}>{fmtDate(r.createdAt)}</td>
                                <td style={{ padding: "10px" }}>
                                    {r.customer}
                                    {r.customerEmail && r.customerEmail !== r.customer && (
                                        <div style={{ color: "var(--w30)", fontSize: ".75rem" }}>{r.customerEmail}</div>
                                    )}
                                </td>
                                <td style={{ padding: "10px" }}>
                                    {r.type.replaceAll("_", " ").toLowerCase()}
                                    {r.event && <div style={{ color: "var(--w30)", fontSize: ".75rem" }}>{r.event}</div>}
                                </td>
                                <td style={{ padding: "10px", whiteSpace: "nowrap" }}>₦{r.amount.toLocaleString()}</td>
                                <td style={{ padding: "10px", color: "var(--w30)", wordBreak: "break-all" }}>{r.reference}</td>
                                <td style={{ padding: "10px" }}>
                                    <span className={`payment-status payment-status-${r.status.toLowerCase()}`}>
                                        <span className="payment-status-dot" />
                                        {r.status.toLowerCase()}
                                    </span>
                                </td>
                                <td style={{ padding: "10px", minWidth: "170px" }}>
                                    {label && r.refund && (
                                        <div style={{ marginBottom: refundable ? "8px" : 0 }}>
                                            <span className={`payment-status payment-status-${label.cls}`}>
                                                <span className="payment-status-dot" />
                                                {label.text}
                                            </span>
                                            <div style={{ color: "var(--w30)", fontSize: ".75rem", marginTop: "4px" }}>
                                                by {r.refund.by} · {fmtDate(r.refund.processedAt ?? r.refund.createdAt)}
                                                <br />“{r.refund.reason}”
                                                {r.refund.failureReason && <><br /><span style={{ color: "var(--red, #e66)" }}>{r.refund.failureReason}</span></>}
                                            </div>
                                        </div>
                                    )}
                                    {refundable && (
                                        <button type="button" className="btn btn-outline btn-xs" onClick={() => setActive(r)}>
                                            {r.refund ? "Retry refund" : "Refund"}
                                        </button>
                                    )}
                                    {!label && !refundable && <span style={{ color: "var(--w30)" }}>—</span>}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {rows.length === 0 && <p className="section-sub">No deposits match.</p>}

            {active && (
                <RefundDialog
                    deposit={active}
                    reversalNote={WHAT_IS_REVERSED[active.type] ?? "Nothing else changes in the app."}
                    onClose={() => setActive(null)}
                />
            )}
        </div>
    );
}
