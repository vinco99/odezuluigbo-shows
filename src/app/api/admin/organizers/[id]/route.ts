import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return Response.json(
      { error: "Forbidden" }, 
      { status: 403 }
    );
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const status = body?.status === "APPROVED" || body?.status === "REJECTED" ? body.status : null;

  if (!status) {
    return Response.json(
      { error: "Invalid status" }, 
      { status: 400 }
    );
  }

  const application = await prisma.organizerApplication.update({
    where: { id },
    data: { 
      status, 
      reviewNote: typeof body?.reviewNote === "string" ? body.reviewNote : null, reviewedAt: new Date() 
    },
  });
  
  if (status === "APPROVED") {
    await prisma.user.update(
      { 
        where: { id: application.userId }, 
        data: { role: "ORGANIZER" } 
      }
    );
  }

  return Response.json({ application });
}
