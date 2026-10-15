import { Prisma } from "@/generated/prisma/client";

type CreditLedgerRow = {
  user: { 
    id: string; 
    name: string | null; 
    email: string 
};
  balance: number;
  creditsPurchased: number;
  purchaseCount: number;
  creditsEarned: number;
  earnCount: number;
};

export function CreditLedgerTable({ rows }: { rows: CreditLedgerRow[] }) {
  return (
    <div className="form-box" style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".85rem", minWidth: "680px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--w10)", textAlign: "left", color: "var(--gold)" }}>
            <th style={{ padding: "10px" }}>User</th>
            <th style={{ padding: "10px", textAlign: "right" }}>Purchased</th>
            <th style={{ padding: "10px", textAlign: "right" }}>Earned</th>
            <th style={{ padding: "10px", textAlign: "right" }}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.user.id} style={{ borderBottom: "1px solid var(--w10)" }}>
              <td style={{ padding: "10px" }}>{r.user.name || r.user.email}</td>
              <td style={{ padding: "10px", textAlign: "right", color: "var(--gold)", fontWeight: 600 }}>
                {r.creditsPurchased.toLocaleString()}
                {r.purchaseCount > 1 && (
                  <small style={{ display: "block", color: "var(--w30)", fontWeight: 400 }}>
                    {r.purchaseCount} txns
                  </small>
                )}
              </td>
              <td style={{ padding: "10px", textAlign: "right" }}>
                {r.creditsEarned.toLocaleString()}
                {r.earnCount > 1 && (
                  <small style={{ display: "block", color: "var(--w30)" }}>
                    {r.earnCount} rewards
                  </small>
                )}
              </td>
              <td style={{ padding: "10px", textAlign: "right" }}>
                {r.balance.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="section-sub">No credit activity yet.</p>}
    </div>
  );
}