import { prisma } from "@/lib/prisma";

/* ---------- Types ---------- */

export type VoteHistoryItem = {
  id: string;           // reference
  event: string;        // contestant name
  category: string;     // event title
  round: string;        // event type (formatted)
  date: string;
  votes: number;
  credits: number;      // creditsUsed
  amount: number;       // cash paid (₦) when creditsUsed is 0
  status: "Counted" | "Pending" | "Failed" | "Refunded";
};

export type CreditTransactionItem = {
  id: string;
  title: string;
  detail: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
};

export type TicketItem = {
  id: string;           // ticket code
  event: string;
  ticketType: string;
  eventDate: string;
  purchasedAt: string;
  quantity: number;
  status: "Confirmed" | "Used" | "Pending" | "Cancelled" | "Refunded";
};

export type WalletSummary = {
  balance: number;
  votesThisMonth: number;
  monthlyCreditsAdded: number;
};

export type DashboardData = {
  wallet: WalletSummary;
  votes: VoteHistoryItem[];
  transactions: CreditTransactionItem[];
  tickets: TicketItem[];
  counts: { votes: number; transactions: number; tickets: number };
};

/* ---------- Mappers ---------- */

const VOTE_STATUS: Record<string, VoteHistoryItem["status"]> = {
  PAID: "Counted",
  PENDING: "Pending",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

const TX_STATUS: Record<string, CreditTransactionItem["status"]> = {
  COMPLETED: "Completed",
  PENDING: "Pending",
  FAILED: "Failed",
};

const TICKET_STATUS: Record<string, TicketItem["status"]> = {
  VALID: "Confirmed",
  PENDING: "Pending",
  CHECKED_IN: "Used",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

const fmt = (d: Date) =>
  d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

/* ---------- Query ---------- */

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    user,
    votes,
    transactions,
    tickets,
    votesThisMonth,
    creditsThisMonth,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { creditBalance: true },
    }),

    prisma.vote.findMany({
      where: { voterId: userId },
      include: {
        contestant: {
          include: { event: { select: { title: true, type: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    }),

    prisma.creditTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),

    prisma.ticket.findMany({
      where: { buyerId: userId },
      include: {
        event: { select: { title: true, eventDate: true } },
        package: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    }),

    prisma.vote.aggregate({
      where: { voterId: userId, status: "PAID", createdAt: { gte: monthStart } },
      _sum: { quantity: true },
    }),

    prisma.creditTransaction.aggregate({
      where: {
        userId,
        amount: { gt: 0 },
        status: "COMPLETED",
        createdAt: { gte: monthStart },
      },
      _sum: { amount: true },
    }),
  ]);

  const voteItems: VoteHistoryItem[] = votes.map((v) => ({
    id: v.reference,
    event: v.contestant.name,
    category: v.contestant.event.title,
    round: v.contestant.event.type.replaceAll("_", " "),
    date: fmt(v.createdAt),
    votes: v.quantity,
    credits: v.creditsUsed,
    amount: v.amount,
    status: VOTE_STATUS[v.status] ?? "Pending",
  }));

  const txItems: CreditTransactionItem[] = transactions.map((t) => ({
    id: t.reference ?? t.id.slice(-8).toUpperCase(),
    title: t.title,
    detail: t.detail ?? t.type.replaceAll("_", " "),
    date: fmt(t.createdAt),
    amount: t.amount,
    status: TX_STATUS[t.status] ?? "Pending",
  }));

  const ticketItems: TicketItem[] = tickets.map((t) => ({
    id: t.code,
    event: t.event.title,
    ticketType: t.package.name,
    eventDate: t.event.eventDate ? fmt(t.event.eventDate) : "TBA",
    purchasedAt: fmt(t.createdAt),
    quantity: 1,
    status: TICKET_STATUS[t.status] ?? "Pending",
  }));

  return {
    wallet: {
      balance: user?.creditBalance ?? 0,
      votesThisMonth: votesThisMonth._sum.quantity ?? 0,
      monthlyCreditsAdded: creditsThisMonth._sum.amount ?? 0,
    },
    votes: voteItems,
    transactions: txItems,
    tickets: ticketItems,
    counts: {
      votes: voteItems.length,
      transactions: txItems.length,
      tickets: ticketItems.length,
    },
  };
}