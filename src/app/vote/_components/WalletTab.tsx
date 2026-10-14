"use client";

export function WalletTab({
  balance,
  transactions,
  onTopUp,
}: {
  balance: number;
  transactions: {
    id: string;
    amount: number;
    type: string;
    title: string;
    detail: string | null;
    status: string;
    createdAt: Date | string;
  }[];
  onTopUp: () => void;
}) {
  return (
    <div className="vote-tab-content active">
      <div className="section-header">
        <span className="section-badge">My Wallet</span>
        <h2 className="section-title">Vote Wallet</h2>
        <p className="section-sub">
          Your credits work across every Odezuluigbo show — top up once, vote anywhere.
        </p>
      </div>

      <div
        style={{
          maxWidth: 520,
          margin: "0 auto 32px",
          background: "linear-gradient(135deg,var(--dark-2),var(--dark-3))",
          border: "1px solid var(--gold)",
          borderRadius: "var(--radius-lg)",
          padding: 36,
          textAlign: "center",
        }}
      >
        <p style={eyebrow}>Current Balance</p>
        <p
          style={{
            fontFamily: "var(--fh)",
            fontSize: "clamp(1.6rem,8vw,3rem)",
            color: "var(--gold)",
            margin: "0 0 6px",
            wordBreak: "break-word",
            lineHeight: 1.2,
          }}
        >
          {balance.toLocaleString()}
        </p>
        <p style={{ color: "var(--w70)", fontSize: ".85rem", margin: "0 0 22px" }}>
          Vote Credits · 1 Credit = 1 Vote
        </p>
        <button className="btn btn-gold" onClick={onTopUp} type="button">
          Top Up Wallet →
        </button>
      </div>

      <div className="form-box" style={{ maxWidth: 640, margin: "0 auto", overflowX: "auto" }}>
        <h3 style={{ fontFamily: "var(--fh)", fontSize: "1.1rem", marginBottom: 12 }}>
          Transaction History
        </h3>
        {transactions.length === 0 ? (
          <p className="section-sub">No credit activity yet.</p>
        ) : (
          <div className="dashboard-list">
            {transactions.map((tx) => {
              const positive = tx.amount > 0;
              return (
                <div className="dashboard-row" key={tx.id}>
                  <div>
                    <strong>{tx.title}</strong>
                    <small>
                      {tx.detail ?? tx.type.replaceAll("_", " ")} ·{" "}
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <strong
                      style={{
                        color: positive ? "#2e8b2e" : "var(--white)",
                      }}
                    >
                      {positive ? "+" : "−"}
                      {Math.abs(tx.amount).toLocaleString()}
                    </strong>
                    <small style={{ display: "block", color: "var(--w30)" }}>
                      {tx.status}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const eyebrow: React.CSSProperties = {
  fontSize: ".7rem",
  letterSpacing: ".15em",
  textTransform: "uppercase",
  color: "var(--w30)",
  margin: "0 0 8px",
};