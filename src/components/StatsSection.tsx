import { prisma } from "@/lib/prisma";
import { EDITORIAL_STATS } from "@/lib/site-stats";
import StatsCounter from "./StatsCounter";

const COUNTED_STATUSES = ["APPROVED", "LIVE", "COMPLETED"] as const;

export async function StatsSection() {
  const [contestantCount, eventCount, prizeAgg] = await Promise.all([
    prisma.contestant.count({
      where: { applicationStatus: "APPROVED" },
    }),

    prisma.event.count({
      where: { status: { in: [...COUNTED_STATUSES] } },
    }),

    prisma.event.aggregate({
      where: { status: { in: [...COUNTED_STATUSES] } },
      _sum: { prize1st: true, prize2nd: true, prize3rd: true },
    }),
  ]);

  const totalPrizePool =
    (prizeAgg._sum.prize1st ?? 0) +
    (prizeAgg._sum.prize2nd ?? 0) +
    (prizeAgg._sum.prize3rd ?? 0);

  const formatPrize = (n: number) => {
    if (n >= 1_000_000_000) return `₦${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
    if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    if (n >= 1_000) return `₦${(n / 1_000).toFixed(0)}K`;
    return `₦${n.toLocaleString()}`;
  };

  const stats = [
    {
      key: "contestants",
      value: contestantCount.toString(),
      suffix: "+",
      label: "Contestants",
      animate: true,
    },
    {
      key: "weeks",
      value: String(EDITORIAL_STATS.weeksLiveTv),
      suffix: null,
      label: "Weeks of Live TV",
      animate: true,
    },
    {
      key: "prize-pool",
      value: totalPrizePool > 0 ? formatPrize(totalPrizePool) : "—",
      suffix: totalPrizePool > 0 ? "+" : null,
      label: "Total Prize Pool",
      animate: false,
    },
    {
      key: "events",
      value: eventCount.toString(),
      suffix: "+",
      label: "Major Events",
      animate: true,
    },
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-item" key={s.key}>
              <StatsCounter
                value={s.value}
                suffix={s.suffix}
                animate={s.animate}
              />

              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}