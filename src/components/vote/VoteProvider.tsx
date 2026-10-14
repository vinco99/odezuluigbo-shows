"use client";

import { useCallback, useMemo, useState } from "react";
import { VoteContext } from "./useVote";
import { VoteModal, type VoteTarget } from "./Votemodal";

export function VoteProvider({
  walletBalance,
  sessionInfoByEvent,
  isLoggedIn,
  children,
}: {
  walletBalance: number;
  sessionInfoByEvent: Record<string, { spent: number; cap: number | null }>;
  isLoggedIn: boolean;
  children: React.ReactNode;
}) {
  const [target, setTarget] = useState<VoteTarget | null>(null);

  const open = useCallback(
    (t: VoteTarget) => {
      if (!isLoggedIn) {
        window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
        return;
      }
      setTarget(t);
    },
    [isLoggedIn],
  );

  const close = useCallback(() => setTarget(null), []);

  const value = useMemo(
    () => ({ open, close, walletBalance }),
    [open, close, walletBalance],
  );

  return (
    <VoteContext.Provider value={value}>
      {children}
      <VoteModal
        target={target}
        walletBalance={walletBalance}
        sessionCreditsSpent={target ? sessionInfoByEvent[target.eventId]?.spent ?? 0 : 0}
        sessionCreditCap={target ? sessionInfoByEvent[target.eventId]?.cap ?? null : null}
        onClose={close}
      />
    </VoteContext.Provider>
  );
}