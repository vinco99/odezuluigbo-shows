import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";
import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { DepositsTable, type DepositRow } from "./_components/DepositsTable";

const PAGE_SIZE = 50;
const STATUSES = ["PAID", "REFUNDED", "PENDING", "FAILED"] as const;
const TYPES = ["CREDIT_PURCHASE", "EVENT_TICKET", "CONTESTANT_REGISTRATION", "VOTE"] as const;

type Search = { status?: string; type?: string; q?: string; page?: string };

export default async function AdminDepositsPage({ searchParams }: { searchParams: Promise<Search> }) {
    await requireRole(["ADMIN"], "/");
    const sp = await searchParams;

    const status = STATUSES.find((s) => s === sp.status);
    const type = TYPES.find((t) => t === sp.type);
    const q = sp.q?.trim() || undefined;
    const page = Math.max(1, Number(sp.page) || 1);

    const where: Prisma.PaymentWhereInput = {
        ...(status ? { status } : {}),
        ...(type ? { type } : {}),
        ...(q
            ? {
                  OR: [
                      { reference: { contains: q, mode: "insensitive" } },
                      { user: { email: { contains: q, mode: "insensitive" } } },
                      { user: { name: { contains: q, mode: "insensitive" } } },
                  ],
              }
            : {}),
    };

    const [payments, total, paidSum, refundedSum, inFlight] = await Promise.all([
        prisma.payment.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
            include: {
                user: { select: { name: true, email: true } },
                event: { select: { title: true } },
                refund: {
                    select: {
                        status: true,
                        reason: true,
                        failureReason: true,
                        createdAt: true,
                        processedAt: true,
                        requestedBy: { select: { name: true, email: true } },
                    },
                },
            },
        }),
        prisma.payment.count({ where }),
        prisma.payment.aggregate({ where: { status: "PAID" }, _sum: { amount: true } }),
        prisma.refund.aggregate({ where: { status: { in: ["PENDING", "PROCESSED"] } }, _sum: { amount: true }, _count: { _all: true } }),
        prisma.refund.count({ where: { status: { in: ["PROCESSING", "PENDING"] } } }),
    ]);

    const rows: DepositRow[] = payments.map((p) => ({
        id: p.id,
        reference: p.reference,
        amount: Number(p.amount),
        type: p.type,
        status: p.status,
        createdAt: p.createdAt.toISOString(),
        customer: p.user?.name || p.user?.email || "Guest",
        customerEmail: p.user?.email ?? null,
        event: p.event?.title ?? null,
        refund: p.refund
            ? {
                  status: p.refund.status,
                  reason: p.refund.reason,
                  failureReason: p.refund.failureReason,
                  createdAt: p.refund.createdAt.toISOString(),
                  processedAt: p.refund.processedAt?.toISOString() ?? null,
                  by: p.refund.requestedBy.name || p.refund.requestedBy.email,
              }
            : null,
    }));

    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const link = (overrides: Partial<Search>) => {
        const params = new URLSearchParams();
        const merged = { status, type, q, page: String(page), ...overrides };
        for (const [k, v] of Object.entries(merged)) if (v && !(k === "page" && v === "1")) params.set(k, v);
        const s = params.toString();
        return s ? `/admin/deposits?${s}` : "/admin/deposits";
    };

    return (
        <main className="page active">
            <div className="section-header">
                <span className="section-badge">Finance</span>
                <h1 className="section-title">Deposit History</h1>
                <p className="section-sub">Every payment made through Paystack. Refunds need a code sent to your email.</p>
            </div>

            <div className="tv-show-stats" style={{ marginBottom: "28px" }}>
                <div className="tv-stat">
                    <span className="tv-val">₦{Number(paidSum._sum.amount ?? 0).toLocaleString()}</span>
                    <small>Paid deposits</small>
                </div>
                <div className="tv-stat">
                    <span className="tv-val">₦{Number(refundedSum._sum.amount ?? 0).toLocaleString()}</span>
                    <small>Refunded ({refundedSum._count._all})</small>
                </div>
                <div className="tv-stat">
                    <span className="tv-val">{inFlight}</span>
                    <small>Refunds in progress</small>
                </div>
            </div>

            <form method="get" className="form-box" style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "flex-end", marginBottom: "16px" }}>
                <div className="form-group" style={{ flex: "2 1 220px", margin: 0 }}>
                    <label htmlFor="q">Search</label>
                    <input id="q" name="q" defaultValue={q} placeholder="Reference, name or email" />
                </div>
                <div className="form-group" style={{ flex: "1 1 150px", margin: 0 }}>
                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" defaultValue={status ?? ""}>
                        <option value="">All</option>
                        {STATUSES.map((s) => <option key={s} value={s}>{s.toLowerCase()}</option>)}
                    </select>
                </div>
                <div className="form-group" style={{ flex: "1 1 180px", margin: 0 }}>
                    <label htmlFor="type">Type</label>
                    <select id="type" name="type" defaultValue={type ?? ""}>
                        <option value="">All</option>
                        {TYPES.map((t) => <option key={t} value={t}>{t.replaceAll("_", " ").toLowerCase()}</option>)}
                    </select>
                </div>
                <button className="btn btn-gold btn-sm" type="submit">Filter</button>
                {(status || type || q) && <Link className="btn btn-ghost btn-sm" href="/admin/deposits">Clear</Link>}
            </form>

            <DepositsTable rows={rows} />

            {pages > 1 && (
                <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", marginTop: "16px" }}>
                    {page > 1 && <Link className="btn btn-outline btn-xs" href={link({ page: String(page - 1) })}>Previous</Link>}
                    <small style={{ color: "var(--w70)" }}>Page {page} of {pages} · {total} deposits</small>
                    {page < pages && <Link className="btn btn-outline btn-xs" href={link({ page: String(page + 1) })}>Next</Link>}
                </div>
            )}
        </main>
    );
}
