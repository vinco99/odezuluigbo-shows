import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();

  const { packageId, name, email, phone } = await req.json();
  if (!packageId || !name || !email || !phone) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const pkg = await prisma.ticketPackage.findUnique({
    where: { id: packageId },
    include: { event: true },
  });

  if (!pkg || !pkg.active) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }
  if (pkg.event.status !== "LIVE") {
    return NextResponse.json({ error: "Event not on sale" }, { status: 400 });
  }

  if (pkg.maxQuantity !== null) {
    const sold = await prisma.ticket.count({
      where: { packageId: pkg.id, status: { in: ["VALID", "CHECKED_IN"] } },
    });
    if (sold >= pkg.maxQuantity) {
      return NextResponse.json({ error: "Sold out" }, { status: 409 });
    }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl || !process.env.PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ error: "Payment is not configured" }, { status: 500 });
  }

  const reference = `TKT_${randomBytes(8).toString("hex").toUpperCase()}`;

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: Math.round(Number(pkg.price) * 100),
      reference,
      callback_url: `${appUrl}/api/tickets/callback`,
      metadata: {
        type: "EVENT_TICKET",
        packageId: pkg.id,
        eventId: pkg.eventId,
        buyerId: session?.user?.id ?? null,
        holderName: name,
        holderEmail: email,
        holderPhone: phone,
      },
    }),
  });

  const data = await res.json();
  if (!data.status) {
    return NextResponse.json({ error: "Payment init failed" }, { status: 500 });
  }

  return NextResponse.json({ paymentUrl: data.data.authorization_url });
}