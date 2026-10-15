"use client";

import { useState } from "react";
import { VoteModal, type VoteTarget } from "@/components/vote/Votemodal";

type EventWithRelations = {
  id: string;
  title: string;
  type: string;
  votingFee: number;            // ← add this
  contestants: {
    id: string;
    name: string;
    state: string | null;
    portrait: string | null;
    votes: { quantity: number }[];
  }[];
};

export function VotingExperience({
  events,
  walletBalance,
  sessionInfoByEvent,
  isLoggedIn,
}: {
  events: EventWithRelations[];
  walletBalance: number;
  sessionInfoByEvent: Record<string, { spent: number; cap: number | null }>;
  isLoggedIn: boolean;
}) {
  const [target, setTarget] = useState<VoteTarget | null>(null);

  function openVote(event: EventWithRelations, contestantId: string, contestantName: string) {
    if (!isLoggedIn) {
      window.location.href = `/login?next=/vote`;
      return;
    }
    setTarget({
      contestantId,
      contestantName,
      eventId: event.id,
      eventTitle: event.title,
      isRealityShow: event.type === "REALITY_SHOW",
      votingFee: event.votingFee, 
    });
  }

  return (
    <div className="container">
      {/* ...existing header + events loop, but replace VotePackageSelector with a Vote button... */}

      {target && (
        <VoteModal
          target={target}
          walletBalance={walletBalance}
          sessionCreditsSpent={sessionInfoByEvent[target.eventId]?.spent ?? 0}
          sessionCreditCap={sessionInfoByEvent[target.eventId]?.cap ?? null}
          onClose={() => setTarget(null)}
        />
      )}
    </div>
  );
}