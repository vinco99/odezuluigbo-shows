import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { VoteProvider } from "./vote/VoteProvider";
import { VoteButton } from "./vote/VoteButton";
import { DEFAULT_VOTING_FEE_NAIRA } from "@/lib/voting-config";
import { getVoteContextForEvents } from "@/lib/voting-server";
import ScrollReveal from "./ScrollReveal";
import "./new-contestant-grid.css";

export async function ContestantPreview() {
  const session = await auth();

  const contestants = await prisma.contestant.findMany({
    where: {
      applicationStatus: "APPROVED",
      event: {
        status: {
          in: ["APPROVED", "LIVE", "COMPLETED"],
        },
      },
    },
    select: {
      id: true,
      name: true,
      portrait: true,
      state: true,
      event: {
        select: {
          id: true,
          title: true,
          slug: true,
          type: true,
          votingFee: true,
          status: true,
          isVotingOpen: true,
          eventDate: true,
        },
      },
      votes: {
        where: { status: "PAID" },
        select: { quantity: true },
      },
    },
    orderBy: {
      event: {
        eventDate: "asc",
      },
    },
    take: 8,
  });

  const topContestants = contestants
  .map((contestant) => ({
    ...contestant,
    totalVotes: contestant.votes.reduce(
      (total, vote) => total + vote.quantity,
      0
    ),
  })).sort((a, b) => b.totalVotes - a.totalVotes).slice(0, 8);

  

  if (contestants.length === 0) {
    return (
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Stars</span>
          <h2 className="section-title">Featured Contestants</h2>
          <p className="section-sub">No contestants are currently competing.</p>
        </div>
      </div>
    );
  }

  // ⬇️ collect unique event IDs from the contestants
  const eventIds = [...new Set(contestants.map((c) => c.event.id))];

  // ⬇️ one query for the whole set
  const { walletBalance, sessionInfoByEvent } = await getVoteContextForEvents(
    session?.user?.id ?? null,
    eventIds,
  );

  // ⬇️ per-event totals so each contestant's percentage is relative to their own event
  const totalsByEvent = new Map<string, number>();
  for (const c of contestants) {
    const eventId = c.event.id;
    const add = c.votes.reduce((s, v) => s + v.quantity, 0);
    totalsByEvent.set(eventId, (totalsByEvent.get(eventId) ?? 0) + add);
  }

  return (
    <VoteProvider
      walletBalance={walletBalance}
      sessionInfoByEvent={sessionInfoByEvent}
      isLoggedIn={!!session?.user?.id}
    >
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Stars</span>
          <h2 className="section-title">Featured Contestants</h2>
          <p className="section-sub">
            Meet the talented individuals competing for glory
          </p>
        </div>

        <div className="contestants-grid active">
          {topContestants.map((contestant, index) => {
            const voteCount = contestant.totalVotes;
            const eventTotal = totalsByEvent.get(contestant.event.id) ?? 0;

            const percent = eventTotal === 0 ? 0 : Math.round((voteCount / eventTotal) * 100);

            return (
              <ScrollReveal key={contestant.id} delay={index * 120}>
                <div className="contestant-card">
                  <img
                    src={
                      contestant.portrait ??
                      "https://oss-macaron-user.macaron.im/photo/aa93cb00-3a6a-4502-8fbb-e4a98441d4c0.png"
                    }
                    alt={contestant.name}
                    className="c-img"
                    style={{
                      width: "100%",
                      height: "235px",
                      objectFit: "cover",
                      objectPosition: "top center",
                    }}
                  />
                  <div className="card-content">
                    <span className="event-title">{contestant.event.title}</span>
                    <h3 className="contestant-name">{contestant.name}</h3>
                    <p className="contestant-state">{contestant.state}</p>
                    
                    <div className="vote-metrics">
                      <span className="vote-percentage">{percent}%</span>
                      <span className="vote-count">{voteCount.toLocaleString()} votes</span>
                    </div>
                    <div className="vote-bar-container">
                      <div className="vote-bar-fill" style={{ width: `${percent}%` }} />
                    </div>
                    {contestant.event.status === "LIVE" && (
                      <VoteButton
                        contestantId={contestant.id}
                        contestantName={contestant.name}
                        eventId={contestant.event.id}
                        eventTitle={contestant.event.title}
                        isRealityShow={contestant.event.type === "REALITY_SHOW"}
                        votingFee={
                          contestant.event.votingFee > 0
                            ? contestant.event.votingFee
                            : DEFAULT_VOTING_FEE_NAIRA
                        }
                      />
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="section-cta">
          <Link href="/vote" className="btn btn-gold">
            Vote for Your Favourite →
          </Link>
        </div>
      </div>
    </VoteProvider>
  );
}