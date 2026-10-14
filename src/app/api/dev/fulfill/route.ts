// app/api/dev/fulfill/route.ts
import { NextResponse } from "next/server";
import { fulfillTicket } from "@/lib/tickets/fulfill";
import { sendTicketEmail } from "@/lib/tickets/email";

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { reference } = await req.json();
  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  const ticket = await fulfillTicket(reference);
  if (!ticket) {
    return NextResponse.json({ error: "Fulfillment failed" }, { status: 400 });
  }

  await sendTicketEmail(ticket.id);

  return NextResponse.json({
    ok: true,
    ticketId: ticket.id,
    checkinUrl: `http://localhost:3000/checkin/${ticket.code}`,
  });
}