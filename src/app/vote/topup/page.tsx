
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getVoteContextForEvents } from "@/lib/voting-server";
import { TopUpTab } from "../_components/TopUpTab";
import { ToastTrigger } from "../_components/ToastTrigger";

export const dynamic = "force-dynamic";

interface TopUpPageProps {
  searchParams: Promise<{ credited?: string }>;
}

export default async function TopUpPage({ searchParams }: TopUpPageProps) {
  const session = await auth();
  const userId = session?.user?.id ?? null;

  const { credited } = await searchParams;

  const creditPackages = await prisma.creditPackage.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  let walletBalance = 0;

  if (userId) {
    const events = await prisma.event.findMany({
      where: {
        status: {
          in: ["APPROVED", "LIVE", "SUSPENDED", "COMPLETED"],
        },
      },
      select: { id: true },
    });

    const voteContext = await getVoteContextForEvents(
      userId,
      events.map((event) => event.id),
    );

    walletBalance = voteContext.walletBalance;
  }

  return (
    <>
        {credited === "1" && <ToastTrigger message="Credit purchased successfully." />}
        <TopUpTab
            packages={creditPackages}
            walletBalance={walletBalance}
            isLoggedIn={!!userId}
        />
    </>
  );
}
