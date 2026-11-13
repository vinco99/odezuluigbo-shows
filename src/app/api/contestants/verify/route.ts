import { prisma } from "@/lib/prisma";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

export async function GET(request: Request) {
  try {
    const reference = new URL(request.url).searchParams.get("reference");

    if (!reference || !process.env.PAYSTACK_SECRET_KEY) {
      return Response.json(
        { error: "Reference is required" }, 
        { status: 400 }
      );
    }

    // ---- 1. Find existing payment ----

    const payment = await prisma.payment.findUnique({
      where: { reference },
    });

    if (!payment) {
      return Response.json(
        { error: "Payment transaction not found" },
        { status: 404 }
      );
    }

    // ---- 2. Already processed? ----

    if (payment.status === "PAID") {
      return Response.redirect(
        new URL(`/events/${payment.eventId}?applied=1`, request.url)
      );
    }



    // ---- 3. Verify with Paystack ----
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Unable to verify payment with Paystack");
    }

    const data = await response.json();

    if (!data.status) {
      return Response.json(
        { error: "Unable to verify payment" },
        { status: 400 }
      );
    }

    if (data.data?.status !== "success") {
      // Only mark failed when Paystack confirms a non-success status.
      if (
        ["failed", "abandoned"].includes(data.data?.status)
      ) {
        await prisma.payment.updateMany({
          where: { reference, status: "PENDING" },
          data: { status: "FAILED" },
        });
      }

      return Response.json(
        { error: "Payment was not successful" },
        { status: 400 }
      );
    }


    // ---- 4. Validate metadata ----
    const metadata = data.data.metadata ?? {};

    if (
      metadata.type !== "CONTESTANT_REGISTRATION" ||
      metadata.paymentId !== payment.id ||
      metadata.userId !== payment.userId ||
      metadata.eventId !== payment.eventId ||
      !metadata.pendingId
    ) {
      return Response.json(
        { error: "Invalid payment metadata" },
        { status: 400 }
      );
    }


    // ---- 5. Validate amount ----
    const paidAmount = Number(data.data.amount) / 100;

    if ( !Number.isFinite(paidAmount) || paidAmount < Number(payment.amount)) {
      return Response.json(
        { error: "Payment amount is insufficient" },
        { status: 400 }
      );
    }


    // ---- 6. Load event + pending application ----
    const [event, pending] = await Promise.all([
      prisma.event.findUnique({ 
        where: { id: metadata.eventId } 
      }),

      prisma.pendingApplication.findUnique({
        where: { id: metadata.pendingId },
      }),
    ]);

    if (!event || !pending) {
      return Response.json(
        { error: "Application details not found. Please contact support." },
        { status: 404 }
      );
    }

    if (
      pending.userId !== payment.userId ||
      pending.eventId !== payment.eventId
    ) {
      return Response.json(
        { error: "Application does not match payment" },
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

    // ---- 7. Age + guardian rule ----
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

    // ---- 8. Atomic write: payment + contestant + cleanup ----
    await prisma.$transaction(async (tx) => {
      if (event.maxContestants !== null) {
        const count = await tx.contestant.count({
          where: {
            eventId: event.id,
            applicationStatus: { not: "REJECTED" },
          },
        });

        if (count >= event.maxContestants) {
          await cleanupAssets(pending);
          throw new Error("CONTESTANT_LIMIT_REACHED");
        }
      }

      // Update the existing payment instead of creating another one.
      const updatedPayment = await tx.payment.updateMany({
        where: {
          id: payment.id,
          status: "PENDING",
        },
        data: {
          status: "PAID",
          amount: paidAmount,
        },
      });

      if (updatedPayment.count !== 1) {
        await cleanupAssets(pending);
        throw new Error("PAYMENT_ALREADY_PROCESSED");
      }

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

    return Response.redirect(
      new URL(`/events/${event.id}?applied=1`, request.url)
    );

  } catch (error) {
    console.error("contestant payment verification error:", error);

    if (
      error instanceof Error &&
      error.message === "CONTESTANT_LIMIT_REACHED"
    ) {
      return Response.json(
        { error: "This event has reached its contestant limit" },
        { status: 400 }
      );
    }

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