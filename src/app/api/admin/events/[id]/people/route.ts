import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id: eventId } = await context.params;

  const body = await request.json().catch(() => null);

  const type = body?.type === "judge" ? "judge" : body?.type === "sponsor" ? "sponsor" : null;

  const recordId = typeof body?.recordId === "string" ? body.recordId : "";

  const status = body?.status === "APPROVED" || body?.status === "REJECTED" ? body.status : null;

  if (!type || !recordId || !status) {
    return Response.json(
      { error: "Invalid review request" }, 
      { status: 400 }
    );
  }

  if (type === "judge") {

    const record = await prisma.judge.updateMany(
      { 
        where: { id: recordId, eventId }, 
        data: { status } 
      }
    );
    return Response.json(
      { updated: record.count }
    );
  }

  const record = await prisma.sponsor.updateMany(
    { 
      where: { id: recordId, eventId }, 
      data: { status } 
    }
  );
  return Response.json(
    { updated: record.count }
  );
}
