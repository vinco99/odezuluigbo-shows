"use client";

import Link from "next/link";
import Icon from "./Icon";
import type { WalletSummary } from "@/lib/dashboard-queries";

export default function WalletCard({
  wallet,
  onViewTransactions,
}: {
  wallet: WalletSummary;
  onViewTransactions: () => void;
}) {
  return (
    <section className="wallet-card" id="wallet" aria-labelledby="wallet-title">
      <div className="wallet-grid-glow" aria-hidden="true" />

      <div className="wallet-main">
        <div className="wallet-eyebrow-row">
          <span className="wallet-icon-box">
            <Icon name="wallet" size={19} />
          </span>
          <span className="wallet-eyebrow">YOUR VOTE WALLET</span>
          <span className="wallet-live-dot" />
        </div>

        <p className="wallet-balance-label" id="wallet-title">
          Available balance
        </p>
        <div className="balance-line">
          <span className="wallet-balance">
            {wallet.balance.toLocaleString("en-US")}
          </span>
          <span className="balance-unit">credits</span>
        </div>

        <p className="wallet-description">
          Ready whenever you are. Every credit gives your vote a voice.
        </p>

        <div className="flex gap-3 mt-4 flex-wrap">
          <Link href="/vote" className="wallet-link">
            <span>Buy vote credits</span>
            <Icon name="plus" size={16} />
          </Link>
          <button className="wallet-link" onClick={onViewTransactions} type="button">
            <span>View credit activity</span>
            <Icon name="arrowUpRight" size={16} />
          </button>
        </div>
      </div>

      <div className="wallet-aside" aria-label="Wallet activity">
        <div className="wallet-aside-heading">
          <span className="wallet-aside-label">THIS MONTH</span>
          <span className="wallet-aside-icon">
            <Icon name="activity" size={16} />
          </span>
        </div>

        <div className="wallet-stat-row">
          <div>
            <span className="wallet-stat-number">{wallet.votesThisMonth}</span>
            <span className="wallet-stat-suffix"> votes</span>
          </div>
          <span className="wallet-stat-trend">
            <Icon name="arrowUpRight" size={13} /> active
          </span>
        </div>

        <div className="wallet-stat-rule" />

        <div className="wallet-monthly-foot">
          <span>Credits added</span>
          <strong>+{wallet.monthlyCreditsAdded.toLocaleString("en-US")}</strong>
        </div>
        <div className="wallet-monthly-foot">
          <span>Voting status</span>
          <strong className="wallet-status">
            <span className="wallet-status-dot" /> Ready
          </strong>
        </div>
      </div>

      <div className="wallet-card-corner" aria-hidden="true">
        <Icon name="spark" size={21} />
      </div>
    </section>
  );
}