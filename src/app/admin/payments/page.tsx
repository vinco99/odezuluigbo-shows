import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { PaymentTable } from "./_components/PaymentsTable";

export default async function AdminPaymentPage() {
    await requireRole(["ADMIN"]);

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
                    <span className="tv-val">{totalVotes._sum.quantity ?? 0}</span>
                    <small>Votes Cast</small>
                </div>
            </div>

            <PaymentTable payments={payments} />
        </main>
    );
}
