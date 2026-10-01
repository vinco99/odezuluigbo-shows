import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {

  const session = await auth();

  if (!session?.user?.id || !["ADMIN", "ORGANIZER"].includes(session.user.role)) {
    return Response.json(
      { error: "Forbidden" }, 
      { status: 403 }
    );
  }

  const { id } = await context.params;
  const event = await prisma.event.findUnique(
    {
      where: { id }, 
      select: { 
        organizerId: true,
        registrationStart: true, 
        registrationEnd: true, 
        eventDate: true 
      } 
    }
  );

  if (!event || (session.user.role !== "ADMIN" && event.organizerId !== session.user.id)) {
    return Response.json(
      { error: "Event not found" }, 
      { status: 404 }
    );
  }

  const body = await request.json().catch(() => null);
  const allowedStatus = [
    "PENDING", 
    "APPROVED", 
    "REJECTED",
    "LIVE" ,
    "SUSPENDED",
    "COMPLETED"
  ];

  const data: Record<string, unknown> = {};

  
  for (const field of ["title", "description", "venue", "country", "state", "logo", "banner"]) {
    if (typeof body?.[field] === "string") data[field] = body[field].trim();
  }
  
  for (const field of ["registrationFee", "votingFee", "maxContestants"]) {
    if (body?.[field] !== undefined) {

      const value = Number(body[field]);
      
      if (!Number.isFinite(value) || value < 0){ 
        return Response.json(
          { error: `Invalid ${field}` }, 
          { status: 400 }
        );
      }
      data[field] = value;
    }
  }

  for (const field of ["eventDate", "registrationStart", "registrationEnd"]) {
    if (body?.[field] !== undefined) {

      const value = new Date(body[field]);

      if (Number.isNaN(value.getTime())){ 
        return Response.json(
          { error: `Invalid ${field}` }, 
          { status: 400 }
        );
      }
      data[field] = value;
    }
  }


  if (body?.status !== undefined) {
    if (!allowedStatus.includes(body.status) || session.user.role !== "ADMIN") {
      return Response.json(
        { error: "Only admins can set this status" }, 
        { status: 403 }
      );
    }
    data.status = body.status;
  }

  if (body?.isVotingOpen !== undefined) {
    data.isVotingOpen = Boolean(body.isVotingOpen);
  }

  if (Object.keys(data).length === 0) {
    return Response.json(
      { error: "No valid fields to update"},
      { status: 400 }
    )
  }

  
  const nextStart = (data.registrationStart as Date | undefined) ?? event?.registrationStart;
  const nextEnd = (data.registrationEnd as Date | undefined) ?? event?.registrationEnd;
  const nextEventDate = (data.eventDate as Date | undefined) ?? event?.eventDate;

  if ((nextStart && nextEnd && nextStart >= nextEnd) || (nextEnd && nextEventDate && nextEnd > nextEventDate)) {
    return Response.json(
      { error: "Invalid event date range" }, 
      { status: 400 }
    );
  }

  const updated = await prisma.event.update({ where: { id }, data });
  
  return Response.json({ event: updated });
}



// ---------- GET: public event details for the apply form ----------
export async function GET( _request: Request, context: { params: Promise<{ id: string }> }) {

  const { id } = await context.params;

  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      venue: true,
      country: true,
      state: true,
      eventDate: true,
      registrationStart: true,
      registrationEnd: true,
      registrationFee: true,
      maxContestants: true,
      status: true,
      isVotingOpen: true,
      banner: true,
      organizer: {
        select: { id: true, name: true },
      },
    },
  });

  if (!event) {

    return Response.json(
      { error: "Event not found" }, 
      { status: 404 }
    );
  }

  // Only expose events that are visible to the public
  if (!["APPROVED", "LIVE", "PENDING"].includes(event.status)) {
    
    return Response.json(
      { error: "Event not available" }, 
      { status: 404 }
    );
  }

  return Response.json({ event });
}
