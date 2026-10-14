import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/permissions";
import { TasksManager } from "./_components/TasksManager";
import { JudgesTable } from "./_components/JudgesTable";

export const dynamic = "force-dynamic";

export default async function AdminTasksPage() {
  await requireRole(["ADMIN"], "/");

  const [tasks, events, pending] = await Promise.all([
    prisma.task.findMany({
      include: {
        event: { select: { id: true, title: true } },
        createdBy: { select: { name: true, email: true } },
        _count: { select: { completions: true } },
      },
      orderBy: [{ active: "desc" }, { createdAt: "desc" }],
    }),

    prisma.event.findMany({
      where: { status: { in: ["APPROVED", "LIVE"] } },
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    }),

    prisma.userTaskCompletion.findMany({
      where: { status: "PENDING" },
      include: {
        user: { select: { id: true, name: true, email: true } },
        task: { select: { id: true, title: true, reward: true } },
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return (
    <div className="admin-tab-content active" id="admin-tab-tasks">
      <div className="section-header">
        <span className="section-badge">Engagement</span>
        <h2 className="section-title">Bonus Vote Tasks</h2>
        <p className="section-sub">
          Configurable tasks on the Voting page&apos;s &quot;Earn Free Votes&quot; tab
        </p>
      </div>

      <TasksManager
        tasks={tasks}
        events={events}
        pending={pending}
      />

      <JudgesTable />
    </div>
  );
}