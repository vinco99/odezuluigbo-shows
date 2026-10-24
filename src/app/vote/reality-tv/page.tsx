
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getVoteContextForEvents } from "@/lib/voting-server";
import { VoteProvider } from "@/components/vote/VoteProvider";
import { ContestantsTab } from "../_components/ContestantsTab";

export const dynamic = "force-dynamic";

export default async function RealityVotesPage() {
  const session = await auth();
  const userId = session?.user?.id ?? null;

  const events = await prisma.event.findMany({
    where: {
      type: "REALITY_SHOW",
      status: {
        in: ["APPROVED", "LIVE", "SUSPENDED", "COMPLETED"],
      },
    },
    include: {
      contestants: {
        where: { applicationStatus: "APPROVED" },
        include: {
          votes: { where: { status: "PAID" } },
        },
      },
    },
    orderBy: { eventDate: "desc" },
  });

  const { walletBalance, sessionInfoByEvent } =
    await getVoteContextForEvents(
      userId,
      events.map((event) => event.id),
    );

  return (
    <>
        <VoteProvider
        walletBalance={walletBalance}
        sessionInfoByEvent={sessionInfoByEvent}
        isLoggedIn={!!userId}
        >
        <ContestantsTab
            title="Reality TV Contestants"
            badge="Reality TV"
            events={events}
            sessionInfoByEvent={sessionInfoByEvent}
        />
        </VoteProvider>
    </>
  );
}
