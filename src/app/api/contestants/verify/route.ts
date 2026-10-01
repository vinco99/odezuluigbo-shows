import { prisma } from "@/lib/prisma";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

export async function GET(request: Request) {
  try {
    const reference = new URL(request.url).searchParams.get("reference");

    if (!reference || !process.env.PAYSTACK_SECRET_KEY) {
      return Response.json({ error: "Reference is required" }, { status: 400 });
    }

    // ---- 1. Verify with Paystack ----
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok || !data.status || data.data?.status !== "success") {
      return Response.json({ error: "Payment failed" }, { status: 400 });
    }

    const metadata = data.data.metadata ?? {};

    if (
      !metadata.userId ||
      !metadata.eventId ||
      !metadata.pendingId ||
      metadata.type !== "CONTESTANT_REGISTRATION"
    ) {
      return Response.json(
        { error: "Invalid payment metadata" },
        { status: 400 }
      );
    }

    // ---- 2. Idempotency: already processed? ----
    const existingPayment = await prisma.payment.findUnique({
      where: { reference },
    });

    if (existingPayment) {
      const event = await prisma.event.findUnique({
        where: { id: metadata.eventId },
        select: { slug: true },
      });
      return Response.redirect(
        new URL(`/events/${event?.slug ?? metadata.eventId}`, request.url)
      );
    }

    // ---- 3. Load event + pending application ----
    const [event, pending] = await Promise.all([
      prisma.event.findUnique({ where: { id: metadata.eventId } }),
      prisma.pendingApplication.findUnique({
        where: { id: metadata.pendingId },
      }),
    ]);

    if (!event) {
      return Response.json({ error: "Event not found" }, { status: 404 });
    }
    if (!pending) {
      // Payment succeeded but pending row was wiped (e.g. cron). Log for support.
      console.warn("verify: pendingApplication missing", {
        reference,
        pendingId: metadata.pendingId,
      });
      return Response.json(
        { error: "Application details not found. Please contact support." },
        { status: 400 }
      );
    }

    if (event.status !== "APPROVED") {
      await cleanupAssets(pending);
      return Response.json(
        { error: "This event is no longer accepting contestants" },
        { status: 400 }
      );
    }

    // ---- 4. Amount check ----
    const paidAmount = Number(data.data.amount) / 100;
    if (Math.abs(paidAmount - Number(event.registrationFee)) > 0.01) {
      await cleanupAssets(pending);
      return Response.json(
        { error: "Payment amount does not match the event registration fee" },
        { status: 400 }
      );
    }

    // ---- 5. Registration window ----
    const now = new Date();
    if (
      (event.registrationStart && now < event.registrationStart) ||
      (event.registrationEnd && now > event.registrationEnd)
    ) {
      await cleanupAssets(pending);
      return Response.json(
        { error: "Registration is outside the event registration window" },
        { status: 400 }
      );
    }

    // ---- 6. Age + guardian rule ----
    const isMinor = pending.age < 18;
    if (isMinor) {
      if (!pending.guardianName || !pending.guardianRelation || !pending.guardianPhone) {
        await cleanupAssets(pending);
        return Response.json(
          { error: "Guardian consent is required for applicants aged 16–17" },
          { status: 400 }
        );
      }
    } 

    // ---- 7. Atomic write: payment + contestant + cleanup ----
    try {
      await prisma.$transaction(async (tx) => {
        if (event.maxContestants !== null) {
          const count = await tx.contestant.count({
            where: {
              eventId: event.id,
              applicationStatus: { not: "REJECTED" },
            },
          });

          if (count >= event.maxContestants) {
            throw new Error("CONTESTANT_LIMIT_REACHED");
          }
        }

        const payment = await tx.payment.create({
          data: {
            reference,
            amount: paidAmount,
            status: "PAID",
            userId: metadata.userId,
            eventId: metadata.eventId,
            type: "CONTESTANT_REGISTRATION",
          },
        });

        await tx.contestant.create({
          data: {
            userId: metadata.userId,
            eventId: metadata.eventId,
            name: pending.name,
            phone: pending.phone,
            email: pending.email,
            state: pending.state,
            city: pending.city,
            age: pending.age,

            institution: pending.institution,
            course: pending.course,
            occupation: pending.occupation,
            instagram: pending.instagram,
            facebook: pending.facebook,
            tiktok: pending.tiktok,
            talent: pending.talent,
            bio: pending.bio,

            portrait: pending.portrait,
            portraitPublicId: pending.portraitPublicId,
            fullPhoto: pending.fullPhoto,
            fullPhotoPublicId: pending.fullPhotoPublicId,

            guardianName: pending.guardianName,
            guardianRelation: pending.guardianRelation,
            guardianPhone: pending.guardianPhone,

            paymentId: payment.id,
            applicationStatus: "PENDING",
          },
        });

        await tx.pendingApplication.deleteMany({
          where: { id: pending.id },
        });
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "";

      if (message === "CONTESTANT_LIMIT_REACHED") {
        await cleanupAssets(pending);
        return Response.json(
          { error: "This event has reached its contestant limit" },
          { status: 400 }
        );
      }

      // Duplicate payment/contestant — treat as already processed.
      if (!message.includes("Unique constraint")) {
        throw error;
      }
    }

    return Response.redirect(
      new URL(`/events/${event.slug ?? event.id}?applied=1`, request.url)
    );
  } catch (error) {
    console.error("contestant payment verification error:", error);
    return Response.json(
      { error: "Something went wrong while verifying the payment" },
      { status: 500 }
    );
  }
}

// Best-effort Cloudinary cleanup. Never throw — a failed delete must not
// block the payment response.
async function cleanupAssets(pending: {
  portraitPublicId: string;
  fullPhotoPublicId: string;
}) {
  await Promise.allSettled([
    deleteCloudinaryAsset(pending.portraitPublicId),
    deleteCloudinaryAsset(pending.fullPhotoPublicId),
  ]);
}