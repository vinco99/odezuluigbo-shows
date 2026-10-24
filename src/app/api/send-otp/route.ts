import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma"; // Adjust to your DB client

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { method, contact } = await req.json();

    if (!method || !contact) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Find user in your database
    const user = await prisma.user.findFirst({
      where: method === "email" ? { email: contact } : { phone: contact },
    });

    // To prevent user enumeration, return 200 even if user doesn't exist
    if (!user) {
      return NextResponse.json({ success: true, message: "If an account exists, a code was sent." });
    }

    // 2. Generate a 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // 3. Save OTP to DB (delete any existing OTPs for this user first)
    await prisma.otp.deleteMany({ where: { userId: user.id } });
    await prisma.otp.create({
      data: {
        userId: user.id,
        code,
        expiresAt,
        method,
        contact,
      },
    });


    // 4. Send the OTP
    if (method === "email") {
      await resend.emails.send({
        from: `Odezuluigbo <forgotten@notifications.odezuluigbo.com>`, // Use your verified domain
        to: contact,
        subject: "Your Password Reset Code",
        html: `
          <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
            <h2>Reset Password</h2>
            <p>Your verification code is:</p>
            <h1 style="background: #f4f4f4; padding: 10px; text-align: center; letter-spacing: 5px;">${code}</h1>
            <p>This code expires in 5 minutes. If you didn't request this, please ignore this email.</p>
          </div>
        `,
      });
    } else if (method === "phone") {
      const termiiResponse = await fetch("https://api.ng.termii.com/api/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: contact,
          from: process.env.TERMII_SENDER_ID || "Termii",
          sms: `Your Odezuluigbo Global password reset code is: ${code}. It expires in 5 minutes.`,
          type: "plain",
          channel: "generic",
          api_key: process.env.TERMII_API_KEY,
        }),
      });

      if (!termiiResponse.ok) {
        const errorData = await termiiResponse.json();
        console.error("Termii Error:", errorData);
        throw new Error("Failed to send SMS");
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}