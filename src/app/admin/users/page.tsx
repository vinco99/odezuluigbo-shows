import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { UsersManager } from "./_components/UsersManager";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  await requireRole(["ADMIN"], "/");

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      creditBalance: true,
      suspended: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="admin-tab-content active" id="admin-tab-users">
      <div className="section-header">
        <span className="section-badge">Directory</span>
        <h2 className="section-title">Manage Users</h2>
        <p className="section-sub">
          Voters, contestants, organizers, judges and staff accounts
        </p>
      </div>

      <div className="form-box">
        <UsersManager users={users} />
      </div>
    </div>
  );
}