import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    // 1. Find the reset token
    const resetRecord = await prisma.resetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    // 2. Validate token
    if (!resetRecord) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    if (resetRecord.expiresAt < new Date()) {
      return NextResponse.json({ error: "Expired token" }, { status: 400 });
    }

    // 3. Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Update user password and delete the token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetRecord.userId },
        data: { password: hashedPassword },
      }),
      prisma.resetToken.delete({ where: { id: resetRecord.id } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}