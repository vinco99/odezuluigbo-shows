import { Prisma } from "@/generated/prisma/client";

type PaymentRow = Prisma.PaymentGetPayload<{
  include: {
    user: { select: { name: true; email: true } };
    event: { select: { title: true } };
  };
}>;
export function PaymentTable({ payments }: { payments: PaymentRow[] }) {

    return (
        <div className="form-box" style={{ overflowX: "auto", marginBottom: "16px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: "700px" }}>
                <thead>
                    <tr style={{ borderBottom: "1px solid var(--w10)", textAlign: "left", color: "var(--gold)" }}>
                        <th style={{ padding: "10px" }}>User</th>
                        <th style={{ padding: "10px" }}>Event</th>
                        <th style={{ padding: "10px" }}>Type</th>
                        <th style={{ padding: "10px" }}>Amount</th>
                        <th style={{ padding: "10px" }}>Reference</th>
                        <th style={{ padding: "10px" }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => 
                        <tr key={payment.id} style={{ borderBottom: "1px solid var(--w10)" }}>
                            <td style={{ padding: "10px" }}>{payment.user?.name || payment.user?.email || "—"}</td>
                            <td style={{ padding: "10px", color: payment.event ? "inherit" : "var(--w30)" }}>
                                {payment.event?.title ?? (
                                    payment.type === "CREDIT_PURCHASE" ? "Credit purchase (wallet)" : "—"
                                )}
                            </td>
                            <td style={{ padding: "10px" }}>{payment.type.replaceAll("_", " ")}</td>
                            <td style={{ padding: "10px" }}>₦{payment.amount.toString()}</td>
                            <td style={{ padding: "10px", color: "var(--w30)" }}>{payment.reference}</td>
                            <td style={{ padding: "10px" }}>
                                <span className="status-badge approved">{payment.status.toLocaleLowerCase()}</span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {payments.length === 0 && 
                <p className="section-sub">No payments recorded yet.</p>
            }
        </div>
    );
}
