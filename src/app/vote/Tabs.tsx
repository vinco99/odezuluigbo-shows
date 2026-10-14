import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getActiveSession } from "@/lib/voting";
import { VotingExperience } from "./VotingExperience";

export default async function Tabs() {
  const session = await auth();

  const events = await prisma.event.findMany({
    where: { status: "APPROVED", isVotingOpen: true },
    include: {
      contestants: {
        where: { applicationStatus: "APPROVED" },
        include: { votes: { where: { status: "PAID" } } },
      },
      votePackages: { where: { active: true }, orderBy: { amount: "asc" } },
    },
    orderBy: { eventDate: "asc" },
  });

  // Wallet + current-session spend (only needed for logged-in users)
  let walletBalance = 0;
  const sessionInfoByEvent: Record<string, { spent: number; cap: number | null }> = {};

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { creditBalance: true },
    });
    walletBalance = user?.creditBalance ?? 0;

    for (const event of events) {
      if (event.type !== "REALITY_SHOW") continue;
      const active = await getActiveSession(event.id);
      if (!active) {
        sessionInfoByEvent[event.id] = { spent: 0, cap: null };
        continue;
      }
      const spent = await prisma.vote.aggregate({
        where: {
          voterId: session.user.id,
          sessionId: active.id,
          status: "PAID",
          contestant: { eventId: event.id },
        },
        _sum: { creditsUsed: true },
      });
      sessionInfoByEvent[event.id] = {
        spent: spent._sum.creditsUsed ?? 0,
        cap: active.creditLimitPerUser ?? event.creditLimitPerSession ?? 100,
      };
    }
  }

  return (
    <VotingExperience
      events={events}
      walletBalance={walletBalance}
      sessionInfoByEvent={sessionInfoByEvent}
      isLoggedIn={!!session?.user?.id}
    />
  );
}