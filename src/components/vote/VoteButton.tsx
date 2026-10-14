"use client";

import { useVote } from "./useVote";
import type { VoteTarget } from "./Votemodal";

export function VoteButton({
  contestantId,
  contestantName,
  eventId,
  eventTitle,
  votingFee,
  isRealityShow,
  className = "btn btn-gold btn-sm",
  label = "Vote",
}: VoteTarget & { className?: string; label?: string }) {
  const { open } = useVote();

  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        open({ contestantId, contestantName, eventId, eventTitle, isRealityShow, votingFee })
      }
    >
      {label}
    </button>
  );
}