import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { CreditPackagesManager } from "./_components/CreditPackagesManager";

export const dynamic = "force-dynamic";

export default async function CreditPackagesPage() {
  await requireRole(["ADMIN"], "/");

  const packages = await prisma.creditPackage.findMany({
    orderBy: [{ sortOrder: "asc" }, { amount: "asc" }],
  });

  return (
    <main className="page active">
      <div className="section-header">
        <span className="section-badge">Wallet</span>
        <h1 className="section-title">Credit Packages</h1>
        <p className="section-sub">
          Global bundles users can buy to top up their vote wallet. Credits work across
          every show. Created Credits packages will appear in vote page.
        </p>
      </div>
      <CreditPackagesManager packages={packages} />
    </main>
  );
}