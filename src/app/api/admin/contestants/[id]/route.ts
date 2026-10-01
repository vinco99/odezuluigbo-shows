import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return Response.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const status = body?.status === "APPROVED" || body?.status === "REJECTED" ? body.status : null;
  if (!status) return Response.json({ error: "Invalid application status" }, { status: 400 });
  const contestant = await prisma.contestant.update({ where: { id }, data: { applicationStatus: status }, select: { id: true, userId: true, applicationStatus: true } });
  if (status === "APPROVED") {
    await prisma.user.update({ where: { id: contestant.userId }, data: { role: "CONTESTANT" } });
  }
  return Response.json({ contestant });
}
