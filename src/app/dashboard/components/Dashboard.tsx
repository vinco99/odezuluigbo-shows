"use client";

import { useState } from "react";
import HistorySection from "./HistorySection";
import Sidebar from "./Sidebar";
import WalletCard from "./WalletCard";
import LogoutButton from "@/components/auth/LogoutButton";
import type { DashboardData } from "@/lib/dashboard-queries";

type DashboardTab = "votes" | "transactions" | "tickets";
type DashboardSection = "overview" | DashboardTab;

export default function Dashboard({
  user, data,
}: {
  user: { name: string; email: string };
  data: DashboardData;
}) {
  const [activeTab, setActiveTab] = useState<DashboardTab>("votes");
  const [activeSection, setActiveSection] = useState<DashboardSection>("overview");

  function scrollToHistory() {
    window.requestAnimationFrame(() => {
      document
        .getElementById("activity-history")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function navigateTo(section: DashboardSection) {
    setActiveSection(section);
    if (section === "overview") {
      setActiveTab("votes");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setActiveTab(section);
    scrollToHistory();
  }

  function changeTab(tab: DashboardTab) {
    setActiveTab(tab);
    setActiveSection(tab);
  }

  return (
    <div className="app-shell" id="overview">
      <Sidebar
        activeSection={activeSection}
        onNavigate={navigateTo}
        counts={data.counts}
      />
      <main className="main-content">
        <div className="content-wrap">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" /> DASHBOARD
              </div>
              <h1 id="page-title">
                Your voice, <span>at a glance.</span>
              </h1>
              <p className="welcome-copy">
                A considered view of your credits and voting activity.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="sample-badge">
                <span className="sample-badge-dot" />
                {user.name}
              </div>
              <LogoutButton />
            </div>
          </section>

          <WalletCard
            wallet={data.wallet}
            onViewTransactions={() => navigateTo("transactions")}
          />

          <HistorySection
            activeTab={activeTab}
            onTabChange={changeTab}
            votes={data.votes}
            transactions={data.transactions}
            tickets={data.tickets}
          />

          <footer className="footer">
            <div className="container">
              <div className="footer-bottom">
                <p>© 2026 Odezuluigbo Global Ltd. All Rights Reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}