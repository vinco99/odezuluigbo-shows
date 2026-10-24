
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getVoteContextForEvents } from "@/lib/voting-server";
import { WalletTab } from "../_components/WalletTab";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function WalletPage() {
  const session = await auth();
  const userId = session?.user?.id ?? null;

  if (!userId) {
    return (
      <div className="vote-tab-content active">
        <div className="section-header">
          <span className="section-badge">My Wallet</span>
          <h2 className="section-title">Vote Wallet</h2>
              <p className="section-sub">Please sign in to view your wallet and transactions.</p>
              <Link href="/login" className="btn btn-gold">Sign in</Link>
        </div>
      </div>
    );
  }

  const events = await prisma.event.findMany({
    where: {
      status: {
        in: ["APPROVED", "LIVE", "SUSPENDED", "COMPLETED"],
      },
    },
    select: { id: true },
  });

  const { walletBalance } = await getVoteContextForEvents(
    userId,
    events.map((event) => event.id),
  );

  const transactions = await prisma.creditTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <>
      <WalletTab
        balance={walletBalance}
        transactions={transactions}
      />
    </>
  );
}
