import { NextResponse } from "next/server";
import { fulfillTicket } from "@/lib/tickets/fulfill";
import { sendTicketEmail } from "@/lib/tickets/email";

export async function GET(req: Request) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? req.url;
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.redirect(new URL("/tickets/failed", base));
  }

  const ticket = await fulfillTicket(reference);

  if (!ticket) {
    // Money may have been collected without a ticket — flag loudly.
    console.error("PAID BUT UNFULFILLED — refund may be needed", { reference });
    return NextResponse.redirect(
      new URL(`/tickets/failed?ref=${encodeURIComponent(reference)}`, base)
    );
  }

  // Best-effort: a mail failure must not block the buyer.
  try {
    await sendTicketEmail(ticket.id);
  } catch (err) {
    console.error("ticket email failed", { ticketId: ticket.id, err });
  }

  return NextResponse.redirect(
    new URL(`/tickets/success/${ticket.id}`, base)
  );
}