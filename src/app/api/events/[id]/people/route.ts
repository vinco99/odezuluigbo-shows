import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {

  const session = await auth();

  if (!session?.user?.id || !["ADMIN", "ORGANIZER"].includes(session.user.role)) {
    return Response.json(
      { error: "Forbidden" }, 
      { status: 403 }
    );
  }

  const { id: eventId } = await context.params;

  const event = await prisma.event.findUnique(
    { 
      where: { id: eventId }, 
      select: { organizerId: true } 
    }
  );

  if (!event || (session.user.role !== "ADMIN" && event.organizerId !== session.user.id)) {
    return Response.json(
      { error: "Not found" }, 
      { status: 404 }
    );
  }

  const body = await request.json().catch(() => null);
  const type = body?.type === "judge" || body?.type === "sponsor" ? body.type : null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!type || name.length < 2) {
    return Response.json(
      { error: "A valid person type and name are required" }, 
      { status: 400 }
    );
  }

  if (type === "judge") {
    return Response.json(
      { person: await prisma.judge.create({ 
        data: { eventId, name, title: typeof body.title === "string" ? 
          body.title.trim() : undefined, 
          image: typeof body.image === "string" ? 
          body.image.trim() : undefined 
        } 
      })}
    );
  }

  return Response.json(
    { person: await prisma.sponsor.create({ 
      data: { eventId, name, website: typeof body.website === "string" ? 
        body.website.trim() : undefined, 
        logo: typeof body.logo === "string" ? 
        body.logo.trim() : undefined 
      } 
    })}
  );
}
