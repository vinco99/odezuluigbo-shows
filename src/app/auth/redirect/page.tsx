import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { dashboardPath } from "@/lib/dashboard";

export default async function AuthRedirect() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  redirect(dashboardPath(session.user.role));
}