import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id: eventId } = await context.params;
  const body = await request.json().catch(() => null);

  const type =
    body?.type === "judge" ? "judge" :
    body?.type === "sponsor" ? "sponsor" : null;

  const recordId = typeof body?.recordId === "string" ? body.recordId : "";

  // active is a boolean now
  const active =
    typeof body?.active === "boolean" ? body.active : null;

  if (!type || !recordId || active === null) {
    return Response.json({ error: "Invalid review request" }, { status: 400 });
  }

  if (type === "judge") {
    const record = await prisma.judge.updateMany({
      where: { id: recordId, eventId },
      data: { active },
    });
    return Response.json({ updated: record.count });
  }

  const record = await prisma.sponsor.updateMany({
    where: { id: recordId, eventId },
    data: { active },
  });
  return Response.json({ updated: record.count });
}