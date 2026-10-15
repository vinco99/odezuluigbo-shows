import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { method, contact, code } = await req.json();

    if (!method || !contact || !code) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Find the user
    const user = await prisma.user.findFirst({
      where: method === "email" ? { email: contact } : { phone: contact },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    // 2. Find the OTP record
    const otpRecord = await prisma.otp.findFirst({
      where: { userId: user.id, code },
      orderBy: { createdAt: "desc" },
    });

    // 3. Validate OTP
    if (!otpRecord) {
        return NextResponse.json(
            { error: "Invalid code" }, 
            { status: 400 }
        );
    }
    if (otpRecord.expiresAt < new Date()) {
        return NextResponse.json(
            { error: "Expired Code" }, 
            { status: 400 }
        );
    }
    // 4. Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // 5. Save token to DB and delete the OTP
    await prisma.$transaction([
      prisma.otp.delete({ where: { id: otpRecord.id } }),
      prisma.resetToken.create({
        data: {
          userId: user.id,
          token: resetToken,
          expiresAt: resetTokenExpiresAt,
        },
      }),
    ]);

    // 6. Return the token to the frontend
    return NextResponse.json({ success: true, resetToken });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}