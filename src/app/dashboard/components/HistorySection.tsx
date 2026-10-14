"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import Icon from "./Icon";
import type {
  CreditTransactionItem,
  TicketItem,
  VoteHistoryItem,
} from "@/lib/dashboard-queries";

type DashboardTab = "votes" | "transactions" | "tickets";

function escapeCsv(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

export default function HistorySection({
  activeTab,
  onTabChange,
  votes,
  transactions,
  tickets,
}: {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  votes: VoteHistoryItem[];
  transactions: CreditTransactionItem[];
  tickets: TicketItem[];
}) {
  const [query, setQuery] = useState("");
  const isVotes = activeTab === "votes";
  const isTransactions = activeTab === "transactions";

  const q = query.trim().toLowerCase();

  const filteredVotes = useMemo(
    () =>
      votes.filter((r) =>
        `${r.event} ${r.category} ${r.round} ${r.id} ${r.date} ${r.status}`
          .toLowerCase()
          .includes(q),
      ),
    [votes, q],
  );

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((r) =>
        `${r.title} ${r.detail} ${r.id} ${r.date} ${r.status}`
          .toLowerCase()
          .includes(q),
      ),
    [transactions, q],
  );

  const filteredTickets = useMemo(
    () =>
      tickets.filter((r) =>
        `${r.event} ${r.ticketType} ${r.eventDate} ${r.purchasedAt} ${r.id} ${r.status}`
          .toLowerCase()
          .includes(q),
      ),
    [tickets, q],
  );

  const count = isVotes
    ? filteredVotes.length
    : isTransactions
    ? filteredTransactions.length
    : filteredTickets.length;

  function changeTab(tab: DashboardTab) {
    if (tab !== activeTab) setQuery("");
    onTabChange(tab);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const order: DashboardTab[] = ["votes", "transactions", "tickets"];
    const current = order.indexOf(activeTab);
    let nextIndex = current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      nextIndex = (current + 1) % order.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      nextIndex = (current + order.length - 1) % order.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = order.length - 1;
    else return;
    event.preventDefault();
    const nextTab = order[nextIndex];
    changeTab(nextTab);
    document.getElementById(`history-tab-${nextTab}`)?.focus();
  }

  function exportCsv() {
    const rows = isVotes
      ? [
          ["Reference", "Contestant", "Event", "Type", "Date", "Votes", "Credits", "Status"],
          ...filteredVotes.map((r) => [
            r.id, r.event, r.category, r.round, r.date, r.votes, r.credits, r.status,
          ]),
        ]
      : isTransactions
      ? [
          ["Reference", "Activity", "Details", "Date", "Credit change", "Status"],
          ...filteredTransactions.map((r) => [
            r.id, r.title, r.detail, r.date, r.amount, r.status,
          ]),
        ]
      : [
          ["Order reference", "Event", "Ticket type", "Event date", "Purchased on", "Quantity", "Status"],
          ...filteredTickets.map((r) => [
            r.id, r.event, r.ticketType, r.eventDate, r.purchasedAt, r.quantity, r.status,
          ]),
        ];

    const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n");
    const objectUrl = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const download = document.createElement("a");
    download.href = objectUrl;
    download.download = `odezuluigbo-${activeTab}-history.csv`;
    download.click();
    URL.revokeObjectURL(objectUrl);
  }

  return (
    <section className="history-section" id="activity-history" aria-labelledby="history-heading">
      <div className="section-heading-row">
        <div>
          <div className="section-kicker">
            <span className="kicker-dash" /> YOUR ACCOUNT
          </div>
          <h2 id="history-heading">Activity history</h2>
          <p className="section-description">
            Every vote and credit, in one clear timeline.
          </p>
        </div>
        <button className="export-button" onClick={exportCsv} type="button">
          <Icon name="download" size={16} />
          <span>Export</span>
        </button>
      </div>

      <div className="history-panel">
        <div className="history-toolbar">
          <div
            className="history-tabs"
            role="tablist"
            aria-label="Account activity"
            onKeyDown={handleTabKeyDown}
          >
            <button
              type="button"
              className={`history-tab ${isVotes ? "is-selected" : ""}`}
              role="tab"
              id="history-tab-votes"
              aria-selected={isVotes}
              aria-controls="history-panel-content"
              tabIndex={isVotes ? 0 : -1}
              onClick={() => changeTab("votes")}
            >
              <Icon name="vote" size={16} /> Vote history{" "}
              <span className="tab-count">{votes.length.toString().padStart(2, "0")}</span>
            </button>
            <button
              type="button"
              className={`history-tab ${isTransactions ? "is-selected" : ""}`}
              role="tab"
              id="history-tab-transactions"
              aria-selected={isTransactions}
              aria-controls="history-panel-content"
              tabIndex={isTransactions ? 0 : -1}
              onClick={() => changeTab("transactions")}
            >
              <Icon name="history" size={16} /> Transactions{" "}
              <span className="tab-count">
                {transactions.length.toString().padStart(2, "0")}
              </span>
            </button>
            <button
              type="button"
              className={`history-tab ${activeTab === "tickets" ? "is-selected" : ""}`}
              role="tab"
              id="history-tab-tickets"
              aria-selected={activeTab === "tickets"}
              aria-controls="history-panel-content"
              tabIndex={activeTab === "tickets" ? 0 : -1}
              onClick={() => changeTab("tickets")}
            >
              <Icon name="ticket" size={16} /> Tickets{" "}
              <span className="tab-count">
                {tickets.length.toString().padStart(2, "0")}
              </span>
            </button>
          </div>

          <label className="history-search">
            <Icon name="search" size={17} />
            <span className="visually-hidden">
              Search {isVotes ? "vote" : isTransactions ? "transaction" : "ticket"} history
            </span>
            <input
              type="search"
              placeholder="Search activity..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>

        <div className="history-column-labels" aria-hidden="true">
          <span>ACTIVITY</span>
          <span>
            {isVotes ? "VOTES CAST" : isTransactions ? "CREDIT CHANGE" : "TICKETS"}
          </span>
          <span>{activeTab === "tickets" ? "PURCHASED" : "DATE"}</span>
          <span>STATUS</span>
        </div>

        <div
          className="history-list"
          id="history-panel-content"
          role="tabpanel"
          aria-labelledby={`history-tab-${activeTab}`}
          tabIndex={0}
        >
          {isVotes
            ? filteredVotes.map((record) => (
                <article className="history-row" key={record.id}>
                  <div className="activity-cell">
                    <span className="activity-mark vote-mark">
                      <Icon name="vote" size={18} />
                    </span>
                    <div className="activity-copy">
                      <span className="activity-title">{record.event}</span>
                      <span className="activity-subtitle">
                        {record.category} <span className="subtitle-divider">·</span>{" "}
                        {record.round}
                      </span>
                      <span className="activity-reference">REF {record.id}</span>
                    </div>
                  </div>
                  <div className="amount-cell">
                    <strong className="vote-amount">
                      {record.votes.toString().padStart(2, "0")}
                    </strong>
                    <span className="amount-note">
                      {record.credits > 0
                        ? `−${record.credits} credits`
                        : `₦${record.amount.toLocaleString("en-US")}`}
                    </span>
                  </div>
                  <div className="date-cell">
                    <Icon name="calendar" size={15} />
                    <span>{record.date}</span>
                  </div>
                  <div className="status-cell">
                    <span
                      className={`status-badge ${
                        record.status === "Counted"
                          ? "status-success"
                          : record.status === "Refunded"
                          ? "status-refunded"
                          : "status-pending"
                      }`}
                    >
                      <span className="status-dot" />
                      {record.status}
                    </span>
                  </div>
                </article>
              ))
            : isTransactions
            ? filteredTransactions.map((record) => {
                const isCreditAdded = record.amount > 0;
                return (
                  <article className="history-row transaction-row" key={record.id}>
                    <div className="activity-cell">
                      <span
                        className={`activity-mark ${
                          isCreditAdded ? "credit-mark" : "debit-mark"
                        }`}
                      >
                        <Icon name={isCreditAdded ? "arrowDown" : "arrowUp"} size={17} />
                      </span>
                      <div className="activity-copy">
                        <span className="activity-title">{record.title}</span>
                        <span className="activity-subtitle">{record.detail}</span>
                        <span className="activity-reference">REF {record.id}</span>
                      </div>
                    </div>
                    <div className="amount-cell">
                      <strong
                        className={
                          isCreditAdded ? "transaction-positive" : "transaction-negative"
                        }
                      >
                        {isCreditAdded ? "+" : "−"}
                        {Math.abs(record.amount).toLocaleString("en-US")}
                      </strong>
                      <span className="amount-note">credits</span>
                    </div>
                    <div className="date-cell">
                      <Icon name="calendar" size={15} />
                      <span>{record.date}</span>
                    </div>
                    <div className="status-cell">
                      <span
                        className={`status-badge ${
                          record.status === "Completed"
                            ? "status-success"
                            : "status-pending"
                        }`}
                      >
                        <span className="status-dot" />
                        {record.status}
                      </span>
                    </div>
                  </article>
                );
              })
            : filteredTickets.map((record) => (
                <article className="history-row ticket-row" key={record.id}>
                  <div className="activity-cell">
                    <span className="activity-mark ticket-mark">
                      <Icon name="ticket" size={18} />
                    </span>
                    <div className="activity-copy">
                      <span className="activity-title">{record.event}</span>
                      <span className="activity-subtitle">
                        {record.ticketType} <span className="subtitle-divider">·</span>{" "}
                        {record.eventDate}
                      </span>
                      <span className="activity-reference">ORDER {record.id}</span>
                    </div>
                  </div>
                  <div className="amount-cell">
                    <strong className="ticket-quantity">{record.quantity}</strong>
                    <span className="amount-note">
                      {record.quantity === 1 ? "ticket" : "tickets"}
                    </span>
                  </div>
                  <div className="date-cell">
                    <Icon name="calendar" size={15} />
                    <span>{record.purchasedAt}</span>
                  </div>
                  <div className="status-cell">
                    <span
                      className={`status-badge ${
                        record.status === "Confirmed" || record.status === "Used"
                          ? "status-success"
                          : record.status === "Refunded"
                          ? "status-refunded"
                          : "status-pending"
                      }`}
                    >
                      <span className="status-dot" />
                      {record.status}
                    </span>
                  </div>
                </article>
              ))}

          {count === 0 && (
            <div className="empty-state">
              <span className="empty-state-icon">
                <Icon name="search" size={20} />
              </span>
              <strong>No matching activity</strong>
              <span>Try another search term to find a record.</span>
              {query && (
                <button onClick={() => setQuery("")} type="button">
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        <div className="history-panel-footer">
          <span>
            Showing <strong>{count}</strong> of{" "}
            <strong>
              {isVotes
                ? votes.length
                : isTransactions
                ? transactions.length
                : tickets.length}
            </strong>{" "}
            records
          </span>
          <span className="history-footer-note">
            <span className="footer-lock">
              <Icon name="shield" size={13} />
            </span>{" "}
            Live account data
          </span>
        </div>
      </div>
    </section>
  );
}