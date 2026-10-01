import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
    const session = await auth();

    if (!session?.user?.id || !["ADMIN", "ORGANIZER"].includes(session.user.role)) 
        return Response.json(
            { error: "Forbidden" }, 
            { status: 403 }
        );

    const { id } = await context.params;
    const event = await prisma.event.findUnique(
        {
            where: { id }, 
            select: { organizerId: true } 
        }
    );

    if (!event || (session.user.role !== "ADMIN" && event.organizerId !== session.user.id)) 
        return Response.json(
            { error: "Not found" }, 
            { status: 404 }
        );

    const body = await request.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const votes = Number(body?.votes);
    const amount = Number(body?.amount);

    if (!name || !Number.isInteger(votes) || votes <= 0 || !Number.isFinite(amount) || amount <= 0) 
        return Response.json(
            { error: "Invalid package" }, 
            { status: 400 }
        );
        
    return Response.json({ package: await prisma.votePackage.create({ data: { eventId: id, name, votes, amount } }) });
}
