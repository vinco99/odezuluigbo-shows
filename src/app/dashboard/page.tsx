import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard-queries";
import Dashboard from "./components/Dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const data = await getDashboardData(session.user.id);

  return (
    <Dashboard
      user={{
        name: session.user.name ?? "there",
        email: session.user.email ?? "",
      }}
      data={data}
    />
  );
}