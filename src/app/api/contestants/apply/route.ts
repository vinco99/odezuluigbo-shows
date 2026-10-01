import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { contestantApplicationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id || !session.user.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ---- 1. Parse JSON (images are URLs now, not files) ----
  const body = await request.json().catch(() => null);

  const parsed = contestantApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const input = parsed.data;

  // ---- 2. Payment config check ----
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl || !process.env.PAYSTACK_SECRET_KEY) {
    return Response.json(
      { error: "Payment is not configured" },
      { status: 500 }
    );
  }

  // ---- 3. Load event + validate registration window ----
  const event = await prisma.event.findUnique({
    where: { id: input.eventId },
  });

  if (!event) {
    return Response.json({ error: "Event not found" }, { status: 404 });
  }

  if (event.status !== "APPROVED") {
    return Response.json(
      { error: "This event is not open for registration" },
      { status: 400 }
    );
  }

  const now = new Date();
  if (event.registrationStart && now < event.registrationStart) {
    return Response.json({ error: "Registration has not opened yet" }, { status: 400 });
  }
  if (event.registrationEnd && now > event.registrationEnd) {
    return Response.json({ error: "Registration has closed" }, { status: 400 });
  }

  // ---- 4. Capacity check ----
  if (event.maxContestants !== null) {
    const [contestantCount, pendingCount] = await Promise.all([
      prisma.contestant.count({
        where: {
          eventId: event.id,
          status: { not: "REJECTED" },   // ← typo fixed
        },
      }),
      prisma.pendingApplication.count({
        where: { eventId: event.id },
      }),
    ]);

    if (contestantCount + pendingCount >= event.maxContestants) {
      return Response.json(
        { error: "This event has reached its contestant limit" },
        { status: 400 }
      );
    }
  }

  // ---- 5. Duplicate application check ----
  const existingApplication = await prisma.contestant.findFirst({
    where: { userId: session.user.id, eventId: input.eventId },
  });

  if (existingApplication) {
    return Response.json(
      { error: "You have already applied for this event" },
      { status: 400 }
    );
  }

  // ---- 6. Compute amount ----
  const amount = Math.round(Number(event.registrationFee) * 100);
  if (!Number.isFinite(amount) || amount <= 0) {
    return Response.json(
      { error: "Payment is not configured for this event" },
      { status: 500 }
    );
  }

  // ---- 7. Upsert the pending application ----
  const pendingData = {
    name: input.name,
    phone: input.phone,
    email: input.email,
    state: input.state,
    city: input.city,
    age: input.age,
    institution: input.institution ?? null,
    course: input.course ?? null,
    occupation: input.occupation ?? null,
    instagram: input.instagram ?? null,
    facebook: input.facebook ?? null,
    tiktok: input.tiktok ?? null,
    talent: input.talent ?? null,
    bio: input.bio,

    portrait: input.portrait,
    portraitPublicId: input.portraitPublicId,
    fullPhoto: input.fullPhoto,
    fullPhotoPublicId: input.fullPhotoPublicId,

    guardianName: input.guardianName ?? null,
    guardianRelation: input.guardianRelation ?? null,
    guardianPhone: input.guardianPhone ?? null,
  };

  const pending = await prisma.pendingApplication.upsert({
    where: {
      userId_eventId: { userId: session.user.id, eventId: input.eventId },
    },
    update: pendingData,
    create: {
      userId: session.user.id,
      eventId: input.eventId,
      ...pendingData,
    },
  });

  // ---- 8. Initialize Paystack ----
  let paystackResponse: Response;
  let paystackData: any;

  try {
    paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          amount,
          callback_url: `${appUrl}/api/contestants/verify`,
          metadata: {
            pendingId: pending.id,
            userId: session.user.id,
            eventId: input.eventId,
            type: "CONTESTANT_REGISTRATION",
          },
        }),
      }
    );

    paystackData = await paystackResponse.json();
  } catch {
    return Response.json(
      { error: "Unable to initialize payment" },
      { status: 502 }
    );
  }

  if (!paystackResponse.ok || !paystackData.status) {
    return Response.json(
      { error: paystackData.message ?? "Unable to initialize payment" },
      { status: 400 }
    );
  }

  return Response.json({
    authorization_url: paystackData.data.authorization_url,
    reference: paystackData.data.reference,
  });
}