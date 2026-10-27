"use client";

import { useVote } from "@/components/vote/useVote";
import { ShareButton } from "./ShareButton";
import "./new-contestant-grid.css";

type EventWithContestants = {
  id: string;
  title: string;
  type: string;
  votingFee: number;
  status: string;
  contestants: {
    id: string;
    name: string;
    state: string | null;
    portrait: string | null;
    votes: { quantity: number }[];
  }[];
};

export function ContestantsTab({
  title,
  badge,
  events,
  sessionInfoByEvent,
}: {
  title: string;
  badge: string;
  events: EventWithContestants[];
  sessionInfoByEvent: Record<string, { spent: number; cap: number | null }>;
}) {
  const { open } = useVote();

  if (events.length === 0) {
    return (
      <div className="vote-tab-content active">
        <div className="section-header">
          <span className="section-badge">{badge}</span>
          <h2 className="section-title">{title}</h2>
        </div>
        <div className="form-box">
          <p className="section-sub">No live events in this category right now.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vote-tab-content active">
      {events.map((event) => {
        const info = sessionInfoByEvent[event.id];
        const totalVotesInEvent = event.contestants.reduce(
          (sum, c) => sum + c.votes.reduce((s, v) => s + v.quantity, 0),
          0,
        );
        const remaining =
          info?.cap != null ? Math.max(0, info.cap - info.spent) : null;

        return (
          <section key={event.id} style={{ marginBottom: 40 }}>
            <div className="section-header">
              <span className="section-badge">{badge}</span>
              <h2 className="section-title">{event.title || title}</h2>
              {remaining != null && (
                <p className="section-sub">
                  Session limit: <strong>{remaining}</strong> of {info!.cap} credits
                  remaining this session.
                </p>
              )}
            </div>

            <div className="contestants-grid active">
              {event.contestants.map((c) => {
                const votes = c.votes.reduce((s, v) => s + v.quantity, 0);
                const percent =
                  totalVotesInEvent > 0 ? Math.round((votes / totalVotesInEvent) * 100) : 0;

                return (
                  <div className="contestant-card" key={c.id}>
                      {c.portrait ? (
                        <img src={c.portrait} alt={c.name} className="c-img" 
                          style={{
                          width: "100%",
                          height: "235px",
                          objectFit: "cover",
                          objectPosition: "top center",
                          }} 
                        />
                      ) : (
                        <span className="ph-txt">{c.name}</span>
                      )}
                    <div className="card-content">
                      <span className="event-title">{event.title}</span>
                      <h3 className="contestant-name">{c.name}</h3>
                      <p className="contestant-state">{c.state}</p>

                      <div className="vote-metrics">
                        <span className="vote-percentage">{percent}%</span>
                        <span className="vote-coun">{votes.toLocaleString()} votes</span>
                      </div>
                      <div className="vote-bar-container">
                        <div className="vote-bar-fill" style={{ width: `${percent}%` }} />
                      </div>
                      {event.status === "LIVE" && (
                        <button
                          type="button"
                          className="btn btn-gold btn-sm"
                          onClick={() => {
                            console.log("Vote button clicked");
                            open({
                              contestantId: c.id,
                              contestantName: c.name,
                              eventId: event.id,
                              eventTitle: event.title,
                              isRealityShow: event.type === "REALITY_SHOW",
                              votingFee: event.votingFee,
                            });
                          }}
                        >
                          Vote
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}