"use client";

import Icon from "./Icon";

type DashboardTab = "votes" | "transactions" | "tickets";
type DashboardSection = "overview" | DashboardTab;

export default function Sidebar({
  activeSection,
  onNavigate,
  counts,
}: {
  activeSection: DashboardSection;
  onNavigate: (section: DashboardSection) => void;
  counts: { votes: number; transactions: number; tickets: number };
}) {
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <a
        className="brand-lockup"
        href="#overview"
        onClick={(e) => {
          e.preventDefault();
          onNavigate("overview");
        }}
        aria-label="VoteHub dashboard home"
      >
      </a>

      <div className="nav-caption" >WORKSPACE</div>
      <nav className="nav-menu">
        <button
          className={`nav-item ${activeSection === "overview" ? "is-active" : ""}`}
          aria-current={activeSection === "overview" ? "page" : undefined}
          onClick={() => onNavigate("overview")}
        >
          <Icon name="grid" />
          <span>Overview</span>
          <span className="nav-active-indicator" />
        </button>

        <div className="nav-subgroup-label">ACTIVITY</div>

        <button
          className={`nav-item ${activeSection === "votes" ? "is-active" : ""}`}
          aria-current={activeSection === "votes" ? "page" : undefined}
          onClick={() => onNavigate("votes")}
        >
          <Icon name="vote" />
          <span>Vote history</span>
          <span className="nav-count">{pad(counts.votes)}</span>
        </button>

        <button
          className={`nav-item ${activeSection === "transactions" ? "is-active" : ""}`}
          aria-current={activeSection === "transactions" ? "page" : undefined}
          onClick={() => onNavigate("transactions")}
        >
          <Icon name="history" />
          <span>Transactions</span>
          <span className="nav-count">{pad(counts.transactions)}</span>
        </button>

        <button
          className={`nav-item ${activeSection === "tickets" ? "is-active" : ""}`}
          aria-current={activeSection === "tickets" ? "page" : undefined}
          onClick={() => onNavigate("tickets")}
        >
          <Icon name="ticket" />
          <span>Tickets</span>
          <span className="nav-count">{pad(counts.tickets)}</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-icon">
          <Icon name="shield" size={17} />
        </div>
        <p className="sidebar-footer-title">Your voice, accounted for.</p>
        <p className="sidebar-footer-copy">A clearer view of every vote and credit.</p>
      </div>

      <div className="sidebar-bottom">
        <span className="sidebar-status-dot" />
        <span>Live workspace</span>
        <span className="sidebar-footer-version">V 1.0</span>
      </div>
    </aside>
  );
}