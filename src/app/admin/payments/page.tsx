import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { PaymentTable } from "./_components/PaymentsTable";
import { CreditLedgerTable } from "./_components/CreditPurchasesTable";

export default async function AdminPaymentPage() {
    await requireRole(["ADMIN",], "/");

    const payments = await prisma.payment.findMany(
        { 
            include: { user: { select: { name: true, email: true } }, 
            event: { select: { title: true } } }, 
            orderBy: { createdAt: "desc" } 
        }
    );
    const paid = payments.filter((payment) => payment.status === "PAID");
    const totalVotes = await prisma.vote.aggregate(
        { 
            where: { status: "PAID" }, 
            _sum: { quantity: true } 
        }
    );

    const [purchases, earned, users] = await Promise.all([
        prisma.creditTransaction.groupBy({
            by: ["userId"],
            where: { type: "PURCHASE", status: "COMPLETED" },
            _sum: { amount: true },
            _count: { _all: true },
        }),

        prisma.creditTransaction.groupBy({
            by: ["userId"],
            where: { type: "BONUS", status: "COMPLETED" },
            _sum: { amount: true },
            _count: { _all: true },
        }),

        prisma.user.findMany({
            select: { id: true, name: true, email: true, creditBalance: true },
        }),
    ]);

    const purchaseMap = new Map(purchases.map((r) => [r.userId, r]));
    const earnedMap = new Map(earned.map((r) => [r.userId, r]));

    const rows = users.map((u) => ({
        user: u,
        balance: u.creditBalance,
        creditsPurchased: purchaseMap.get(u.id)?._sum.amount ?? 0,
        purchaseCount: purchaseMap.get(u.id)?._count._all ?? 0,
        creditsEarned: earnedMap.get(u.id)?._sum.amount ?? 0,
        earnCount: earnedMap.get(u.id)?._count._all ?? 0,
    })).filter((r) => r.creditsPurchased > 0 || r.creditsEarned > 0) .sort((a, b) => b.creditsPurchased - a.creditsPurchased);

    return (
        <main className="page active">
            <div className="section-header">
                <span className="section-badge">Finance</span>
                <h1 className="section-title">Payments & Voting Activity</h1>
                <p className="section-sub">Live payment records and vote totals.</p>
            </div>
            <div className="tv-show-stats" style={{ marginBottom: "28px" }}>
                <div className="tv-stat">
                    <span className="tv-val">₦{paid.reduce((total, payment) => total + payment.amount, 0).toLocaleString()}</span>
                    <small>Paid Revenue</small>
                </div>
                <div className="tv-stat">
                    <span className="tv-val">{paid.filter((payment) => payment.type === "CONTESTANT_REGISTRATION").length}</span>
                    <small>Registrations</small>
                </div>
                <div className="tv-stat">
                    <span className="tv-val">{paid.filter((payment) => payment.type === "VOTE").length}</span>
                    <small>Vote Payments</small>
                </div>
                <div className="tv-stat">
                    <span className="tv-val">
                        ₦{paid
                        .filter((p) => p.type === "CREDIT_PURCHASE")
                        .reduce((t, p) => t + p.amount, 0)
                        .toLocaleString()}
                    </span>
                    <small>Vote Credit Sales</small>
                </div>

                <div className="tv-stat">
                    <span className="tv-val">{totalVotes._sum.quantity ?? 0}</span>
                    <small>Votes Cast</small>
                </div>
            </div>

            <PaymentTable payments={payments} />

            <section style={{ marginTop: "28px" }}>
                <div className="section-header" style={{ marginBottom: "12px" }}>
                    <span className="section-badge">Wallet</span>
                    <h2 className="section-title">Credit Purchases by User</h2>
                    <p className="section-sub">Total vote credits bought per individual.</p>
                </div>
                <CreditLedgerTable rows={rows} />
            </section>
        </main>
    );
}
