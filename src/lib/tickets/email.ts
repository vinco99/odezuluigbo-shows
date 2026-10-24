import { Resend } from "resend";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY!);


const FROM = "Odezuluigbo <tickets@notifications.odezuluigbo.com>";
const CHECKIN_BASE = "https://odezuluigbo.com/checkin";

type TicketWithRelations = Prisma.TicketGetPayload<{
  include: { event: true; package: true; payment: true };
}>;

export async function sendTicketEmail(ticketId: string) {
    const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: { event: true, package: true, payment: true },
    });
    if (!ticket) return { ok: false, reason: "not_found" as const };

    // Atomic claim: only the winner of this UPDATE proceeds.
    const claimed = await prisma.ticket.updateMany({
        where: { id: ticketId, emailSentAt: null },
        data: { emailSentAt: new Date() },
    });
  if (claimed.count === 0) return { ok: true, reason: "already_sent" as const };

  // Now send. If it fails, release the claim so retries can try again.
    try {
        const checkinUrl = `${CHECKIN_BASE}/${ticket.code}`;
        const qrBuffer = await QRCode.toBuffer(checkinUrl, {
            errorCorrectionLevel: "H",
            margin: 1,
            width: 400,
        });

        const { error } = await resend.emails.send({
            from: FROM,
            to: ticket.holderEmail,
            subject: `Your ticket for ${ticket.event.title}`,
            html: renderTicketEmail(ticket, "cid:ticket-qr", checkinUrl),
            attachments: [{ filename: "ticket-qr.png", content: qrBuffer, contentId: "ticket-qr" }],
        });
        if (error) throw new Error(error.message);

        return { ok: true, reason: "sent" as const };

    } catch (err) {
        console.error("Ticket email failed:", err);

        await prisma.ticket.update({
            where: { id: ticketId },
            data: { emailSentAt: null },   // release the claim
        });

        return { ok: false, reason: "send_failed" as const };
    }
}

// ─── Template ────────────────────────────────────────────────────────────────

function renderTicketEmail(
  ticket: TicketWithRelations,
  qrDataUrl: string,
  checkinUrl: string
) {
  const eventDate = ticket.event.eventDate
    ? ticket.event.eventDate.toLocaleString("en-NG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "To be announced";

  const venue = [ticket.event.venue, ticket.event.state, ticket.event.country]
    .filter(Boolean)
    .join(", ");

  return (
    `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width" />
            </head>
            <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#fff;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
                <tr>
                <td align="center">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#141414;border:1px solid #262626;border-radius:12px;overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="padding:28px 28px 8px;text-align:center;">
                        <p style="margin:0 0 4px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#c9a227;">
                            Odezuluigbo Global
                        </p>
                        <h1 style="margin:0;font-size:24px;color:#fff;">You're going 🎟️</h1>
                        </td>
                    </tr>

                    <!-- Event info -->
                    <tr>
                        <td style="padding:20px 28px 4px;">
                        <h2 style="margin:0 0 6px;font-size:18px;color:#fff;">${escape(ticket.event.title)}</h2>
                        <p style="margin:0 0 4px;font-size:14px;color:#bbb;">📅 ${escape(eventDate)}</p>
                        ${venue ? `<p style="margin:0;font-size:14px;color:#bbb;">📍 ${escape(venue)}</p>` : ""}
                        </td>
                    </tr>

                    <!-- QR -->
                    <tr>
                        <td align="center" style="padding:24px 28px 8px;">
                        <img src="${qrDataUrl}" alt="Ticket QR code" width="220" height="220" style="display:block;border-radius:8px;background:#fff;padding:12px;" />
                        </td>
                    </tr>

                    <!-- Ticket code -->
                    <tr>
                        <td align="center" style="padding:0 28px 24px;">
                        <p style="margin:0 0 4px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#888;">
                            Ticket Code
                        </p>
                        <p style="margin:0;font-family:'Courier New',monospace;font-size:18px;color:#c9a227;letter-spacing:.1em;word-break:break-all;">
                            ${escape(ticket.code.toUpperCase())}
                        </p>
                        </td>
                    </tr>

                    <!-- Details -->
                    <tr>
                        <td style="padding:0 28px 24px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #262626;">
                            <tr>
                            <td style="padding:14px 0 6px;font-size:13px;color:#888;">Ticket Holder</td>
                            <td style="padding:14px 0 6px;font-size:13px;color:#fff;text-align:right;">${escape(ticket.holderName)}</td>
                            </tr>
                            <tr>
                            <td style="padding:6px 0;font-size:13px;color:#888;">Package</td>
                            <td style="padding:6px 0;font-size:13px;color:#fff;text-align:right;">${escape(ticket.package.name)}</td>
                            </tr>
                            <tr>
                            <td style="padding:6px 0;font-size:13px;color:#888;">Amount Paid</td>
                            <td style="padding:6px 0;font-size:13px;color:#c9a227;text-align:right;">₦ ${ticket.payment.amount.toLocaleString()}</td>
                            </tr>
                            <tr>
                            <td style="padding:6px 0 0;font-size:13px;color:#888;">Reference</td>
                            <td style="padding:6px 0 0;font-size:12px;color:#bbb;text-align:right;font-family:'Courier New',monospace;">${escape(ticket.payment.reference)}</td>
                            </tr>
                        </table>
                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td align="center" style="padding:0 28px 24px;">
                        <a href="${checkinUrl}" style="display:inline-block;padding:12px 28px;background:#c9a227;color:#0a0a0a;text-decoration:none;font-weight:bold;border-radius:8px;font-size:14px;">
                            View Ticket Online
                        </a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:20px 28px 28px;border-top:1px solid #262626;">
                        <p style="margin:0 0 6px;font-size:12px;color:#888;line-height:1.5;">
                            Present this QR code at the entrance. Each ticket is valid for one person only.
                            Tickets are non-transferable and non-refundable unless the event is cancelled.
                        </p>
                        <p style="margin:0;font-size:11px;color:#555;">
                            © ${new Date().getFullYear()} Odezuluigbo Global Ltd. All rights reserved.
                        </p>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            </body>
        </html>`
    );
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}