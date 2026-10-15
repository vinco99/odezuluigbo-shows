import { Prisma } from "@/generated/prisma/client"; 

export function EventStats({
  votes,
  revenue,
  contestants,
}: {
  votes: number;
  revenue: Prisma.Decimal | number;
  contestants: number;
}) {
  return (
    <div className="tv-show-stats" style={{ marginBottom: 32 }}>
      <div className="tv-stat">
        <span className="tv-val">{votes.toLocaleString()}</span>
        <small>Total Votes</small>
      </div>
      <div className="tv-stat">
        <span className="tv-val">₦{revenue.toLocaleString()}</span>
        <small>Paid Revenue</small>
      </div>
      <div className="tv-stat">
        <span className="tv-val">{contestants.toLocaleString()}</span>
        <small>Contestants</small>
      </div>
    </div>
  );
}