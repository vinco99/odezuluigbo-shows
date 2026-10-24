import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TasksTab } from "../_components/TasksTab";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const tasks = await prisma.task.findMany({
      where: { active: true },
      orderBy: { reward: "asc" },
    });

  const completions = userId
      ? await prisma.userTaskCompletion.findMany({
          where: { userId },
          select: { taskId: true, status: true, createdAt: true },
        })
      : [];

  return (
    <>
      <TasksTab
        tasks={tasks}
        completions={completions}
        isLoggedIn={!!userId}
      />
    </>
  );
}