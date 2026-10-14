"use client";

import { useState } from "react";
import { VoteProvider } from "@/components/vote/VoteProvider";
import { TopUpTab } from "./TopUpTab";
import { WalletTab } from "./WalletTab";
import { ContestantsTab } from "./ContestantsTab";
import { TasksTab } from "./TasksTab";
import { AdSlot } from "@/components/ads/AdSlot";

type TabKey = "topup" | "wallet" | "pageant" | "reality" | "tasks";

const TAB_LABELS: { key: TabKey; label: string }[] = [
  { key: "topup", label: "Top Up Wallet" },
  { key: "wallet", label: "My Wallet" },
  { key: "pageant", label: "Pageant Votes" },
  { key: "reality", label: "Reality TV Votes" },
  { key: "tasks", label: "Earn Free Votes" },
];

export function VoteTabs({
  userId,
  walletBalance,
  sessionInfoByEvent,
  events,
  creditPackages,
  tasks,
  transactions,
  completions,
}: {
  userId: string | null;
  walletBalance: number;
  sessionInfoByEvent: Record<string, { spent: number; cap: number | null }>;
  events: any[];
  creditPackages: any[];
  tasks: any[];
  transactions: any[];
  completions: any[];
}) {
  const [active, setActive] = useState<TabKey>("topup");

  const pageantEvents = events.filter((e) => e.type !== "REALITY_SHOW");
  const realityEvents = events.filter((e) => e.type === "REALITY_SHOW");

  return (
    <VoteProvider
      walletBalance={walletBalance}
      sessionInfoByEvent={sessionInfoByEvent}
      isLoggedIn={!!userId}
    >
      <div className="container">
        <div className="container" style={{ margin: "32px auto" }}>
          <AdSlot placementKey="vote-banner" />
        </div>

        <div className="vote-tabs" role="tablist">
          {TAB_LABELS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={active === t.key}
              className={`vote-tab ${active === t.key ? "active" : ""}`}
              onClick={() => setActive(t.key)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>

        {active === "topup" && (
          <TopUpTab
            packages={creditPackages}
            walletBalance={walletBalance}
            isLoggedIn={!!userId}
          />
        )}

        {active === "wallet" && (
          <WalletTab
            balance={walletBalance}
            transactions={transactions}
            onTopUp={() => setActive("topup")}
          />
        )}

        {active === "pageant" && (
          <ContestantsTab
            title="AdaomaIgbonile Contestants"
            badge="Pageant"
            events={pageantEvents}
            sessionInfoByEvent={sessionInfoByEvent}
          />
        )}

        {active === "reality" && (
          <ContestantsTab
            title="Odenigwe Contestants"
            badge="Reality TV"
            events={realityEvents}
            sessionInfoByEvent={sessionInfoByEvent}
          />
        )}

        {active === "tasks" && (
          <TasksTab tasks={tasks} completions={completions} isLoggedIn={!!userId} />
        )}
      </div>
    </VoteProvider>
  );
}