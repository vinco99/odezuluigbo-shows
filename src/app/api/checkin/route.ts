import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
    const session = await auth();
    const userId = session?.user?.id;
    const role = session?.user?.role;

    if (!userId) {
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    let body: { code?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const code = body.code?.trim();
    if (!code) {
        return NextResponse.json({ error: "Missing ticket code" }, { status: 400 });
    }

    // Load the ticket + event so we can authorize the caller against the event
    const ticket = await prisma.ticket.findUnique({
        where: { code },
        include: {
        event: { select: { id: true, organizerId: true, title: true } },
        },
    });

    if (!ticket) {
        return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const isStaff = role === "ADMIN" || ticket.event.organizerId === userId;
    if (!isStaff) {
        return NextResponse.json(
        { error: "Not authorized to check in this ticket" },
        { status: 403 }
        );
    }

    // ── Atomic claim ──────────────────────────────────────────────────────────
    // The WHERE clause includes status: "VALID". If two requests race, only
    // one UPDATE matches a row; the other sees count === 0 and is rejected.
    const result = await prisma.ticket.updateMany({
        where: { code, status: "VALID" },
        data: { status: "CHECKED_IN", checkedInAt: new Date() },
    });

    if (result.count === 0) {
        // We already know the ticket exists (we fetched it above).
        // So count === 0 means it was NOT in VALID state.
        return NextResponse.json(
        {
            error: `Ticket is ${ticket.status.toLowerCase().replace("_", " ")}`,
            status: ticket.status,
            checkedInAt: ticket.checkedInAt,
        },
        { status: 409 } // Conflict
        );
    }

    // Read back the fresh row so the client gets the actual checkedInAt timestamp
    const updated = await prisma.ticket.findUnique({
        where: { code },
        select: { id: true, checkedInAt: true, holderName: true },
    });

    return NextResponse.json({
        ok: true,
        ticketId: updated?.id,
        holderName: updated?.holderName,
        checkedInAt: updated?.checkedInAt,
        eventTitle: ticket.event.title,
    });
}