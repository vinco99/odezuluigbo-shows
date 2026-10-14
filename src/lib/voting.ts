import { prisma } from "@/lib/prisma";

/** Fixed price for buy-with-real-money votes. */
export const VOTE_PRICE_NAIRA = 50;

/** Default credit cap per session for reality shows if not set on the event. */
export const DEFAULT_SESSION_CREDIT_CAP = 100;

export const DEFAULT_VOTING_FEE_NAIRA = 50;

export async function getActiveSession(eventId: string) {
  const now = new Date();
  return prisma.voteSession.findFirst({
    where: { eventId, startsAt: { lte: now }, endsAt: { gte: now } },
    orderBy: { startsAt: "desc" },
  });
}

/**
 * Credits the user has already spent this session (across all contestants
 * in this event). Returns 0 if no active session or event has no cap.
 */
export async function getSessionCreditsSpent(
  userId: string,
  eventId: string,
  sessionId: string | null,
) {
  if (!sessionId) return 0;
  const result = await prisma.vote.aggregate({
    where: {
      voterId: userId,
      sessionId,
      status: "PAID",
      contestant: { eventId },
    },
    _sum: { creditsUsed: true },
  });
  return result._sum.creditsUsed ?? 0;
}

export async function getSessionCreditCap(eventId: string, sessionId: string | null) {
  if (!sessionId) return null;
  const session = await prisma.voteSession.findUnique({ where: { id: sessionId } });
  if (!session) return null;
  if (session.creditLimitPerUser != null) return session.creditLimitPerUser;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { type: true, creditLimitPerSession: true },
  });
  if (event?.type !== "REALITY_SHOW") return null;   // cap only for reality shows
  return event.creditLimitPerSession ?? DEFAULT_SESSION_CREDIT_CAP;
}