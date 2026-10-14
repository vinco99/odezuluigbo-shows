import Footer from "@/components/Footer";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getVoteContextForEvents } from "@/lib/voting-server";
import { VoteTabs } from "./_components/VoteTabs";

export const dynamic = "force-dynamic";

export default async function VotePage() {
  const session = await auth();
  const userId = session?.user?.id ?? null;

  // Live events with their approved contestants
  const events = await prisma.event.findMany({
    where: { status: "APPROVED", isVotingOpen: true },
    include: {
      contestants: {
        where: { applicationStatus: "APPROVED" },
        include: { votes: { where: { status: "PAID" } } },
      },
    },
    orderBy: { eventDate: "asc" },
  });

  // Credit packages (admin-configurable, global)
  const creditPackages = await prisma.creditPackage.findMany({
  where: { active: true },
  orderBy: { sortOrder: "asc" },
});
  // If you store them per-event for now, drop the eventId filter and dedupe by name.

  // Active tasks (global + per-event)
  const tasks = await prisma.task.findMany({
    where: { active: true },
    orderBy: { reward: "asc" },
  });

  // Wallet + per-event session cap info
  const { walletBalance, sessionInfoByEvent } = await getVoteContextForEvents(
    userId,
    events.map((e) => e.id),
  );

  // Credit transaction history for the wallet tab
  const transactions = userId
    ? await prisma.creditTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 50,
      })
    : [];

  // Which tasks has this user already completed (for cooldown display)
  const completions = userId
    ? await prisma.userTaskCompletion.findMany({
        where: { userId },
        select: { taskId: true, status: true, createdAt: true },
      })
    : [];

  return (
    <div className="page active" id="page-voting">
      <div className="page-hero">
        <div className="container">
          <span className="section-badge">Cast Your Vote</span>
          <h1>Vote Now</h1>
          <p>Support your favourite contestants</p>
        </div>
      </div>

      <section className="section">
        <VoteTabs
          userId={userId}
          walletBalance={walletBalance}
          sessionInfoByEvent={sessionInfoByEvent}
          events={events}
          creditPackages={creditPackages}
          tasks={tasks}
          transactions={transactions}
          completions={completions}
        />
      </section>

      <Footer />
    </div>
  );
}