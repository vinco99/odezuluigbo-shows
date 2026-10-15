"use client";

import { useVote } from "@/components/vote/useVote";
import { ShareButton } from "./ShareButton";

type EventWithContestants = {
  id: string;
  title: string;
  type: string;
  votingFee: number;
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

            <div className="contestants-grid">
              {event.contestants.map((c) => {
                const votes = c.votes.reduce((s, v) => s + v.quantity, 0);
                const percent =
                  totalVotesInEvent > 0 ? Math.round((votes / totalVotesInEvent) * 100) : 0;

                return (
                  <article className="contestant-card" key={c.id}>
                    <div className="img-placeholder c-img">
                      {c.portrait ? (
                        <img
                          src={c.portrait}
                          alt={c.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="ph-txt">{c.name}</span>
                      )}
                    </div>
                    <div className="c-info">
                      <h4>{c.name}</h4>
                      <span className="c-sub">{c.state ?? "Contestant"}</span>
                      <div className="vote-bar">
                        <div className="vote-fill" style={{ width: `${percent}%` }} />
                      </div>
                      <small>
                        {percent}% · {votes.toLocaleString()} votes
                      </small>

                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          marginTop: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          type="button"
                          className="btn btn-gold btn-xs"
                          onClick={() =>
                            open({
                              contestantId: c.id,
                              contestantName: c.name,
                              eventId: event.id,
                              eventTitle: event.title,
                              isRealityShow: event.type === "REALITY_SHOW",
                              votingFee: event.votingFee
                            })
                          }
                        >
                          Vote
                        </button>
                        <ShareButton contestantName={c.name} contestantId={c.id} />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}