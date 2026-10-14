import "server-only";
import { prisma } from "@/lib/prisma";
import { getActiveSession } from "@/lib/voting";

export type SessionInfoByEvent = Record<string, { spent: number; cap: number | null }>;

export async function getVoteContextForEvents(
  userId: string | null | undefined,
  eventIds: string[],
): Promise<{ walletBalance: number; sessionInfoByEvent: SessionInfoByEvent }> {
  if (!userId) return { walletBalance: 0, sessionInfoByEvent: {} };

  const [user, realityEvents, activeSessions] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { creditBalance: true },
    }),
    prisma.event.findMany({
      where: { id: { in: eventIds }, type: "REALITY_SHOW" },
      select: { id: true, creditLimitPerSession: true },
    }),
    prisma.voteSession.findMany({
      where: {
        eventId: { in: eventIds },
        startsAt: { lte: new Date() },
        endsAt: { gte: new Date() },
      },
      orderBy: { startsAt: "desc" },
    }),
  ]);

  const sessionInfoByEvent: SessionInfoByEvent = {};
  const activeByEvent = new Map(activeSessions.map((s) => [s.eventId, s]));

  for (const event of realityEvents) {
    const active = activeByEvent.get(event.id);
    if (!active) {
      sessionInfoByEvent[event.id] = { spent: 0, cap: null };
      continue;
    }
    const spent = await prisma.vote.aggregate({
      where: { voterId: userId, sessionId: active.id, status: "PAID" },
      _sum: { creditsUsed: true },
    });
    sessionInfoByEvent[event.id] = {
      spent: spent._sum.creditsUsed ?? 0,
      cap: active.creditLimitPerUser ?? event.creditLimitPerSession ?? 100,
    };
  }

  return {
    walletBalance: user?.creditBalance ?? 0,
    sessionInfoByEvent,
  };
}