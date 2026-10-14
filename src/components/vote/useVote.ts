"use client";

import { createContext, useContext } from "react";
import type { VoteTarget } from "./Votemodal";

export type VoteContextValue = {
  open: (target: VoteTarget) => void;
  close: () => void;
  walletBalance: number;
};

export const VoteContext = createContext<VoteContextValue | null>(null);

export function useVote() {
  const ctx = useContext(VoteContext);
  if (!ctx) {
    throw new Error("useVote must be used inside <VoteProvider>");
  }
  return ctx;
}