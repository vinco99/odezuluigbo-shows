import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { fullName, email, phone, subject, message } = await request.json();

    // Basic validation
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      // IMPORTANT: Replace with your verified domain email, e.g., 'Contact Form <contact@updates.odezuluigbo.com>'
      from: "Contact Form <contact@notifications.odezuluigbo.com>",
      // Replace with the admin email address you want to receive messages at
      to: ["Odezuluigboglobal@gmail.com"],
      replyTo: email,
      subject: `[Contact] ${subject} — ${fullName}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p style="white-space: pre-wrap">${message}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}