import crypto from "node:crypto";

export async function POST(request: Request) {
    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!signature || !secret) {
        return Response.json(
            { error: "Invalid webhook configuration" }, 
            { status: 401 }
        );
    }

    const expected = crypto
        .createHmac("sha512", secret)
        .update(rawBody)
        .digest("hex");

    const valid =
        signature.length === expected.length &&
        crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

    if (!valid) {
        return Response.json(
            { error: "Invalid signature" }, 
            { status: 401 }
        );
    }

    let payload: { event?: string; data?: { reference?: string; metadata?: { type?: string } } };
    try {
        payload = JSON.parse(rawBody);
    } catch {
        return Response.json(
            { received: true }, 
            { status: 200 }
        );
    }

    if (payload.event !== "charge.success" || !payload.data?.reference) {
        return Response.json(
            { received: true }, 
            { status: 200 }
        );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
        return Response.json(
            { error: "Webhook application URL is not configured" }, 
            { status: 500 }
        );
    }

    const type = payload.data.metadata?.type;
    const endpoint = type === "VOTE" ? "/api/votes/verify": type === "CONTESTANT_REGISTRATION" ? "/api/contestants/verify" : null;

    if (!endpoint) {
        console.error("Webhook: unknown payment type", type);
        return Response.json(
            { received: true }, 
            { status: 200 }
        );
    }

    let verification: Response;
    try {
        verification = await fetch(
            `${appUrl}${endpoint}?reference=${encodeURIComponent(payload.data.reference)}`,
            { method: "GET", redirect: "manual", signal: AbortSignal.timeout(10_000) }
        );
    } catch (error) {
        console.error("Webhook: failed to reach verify endpoint", error);
        return Response.json(
            { error: "Verification unreachable" }, 
            { status: 500 }
        );
    }

    if (verification.status >= 500) {
        console.error("Webhook: verify endpoint returned server error", {
            reference: payload.data.reference,
            status: verification.status,
        });
        return Response.json(
            { error: "Payment processing failed" }, 
            { status: 500 }
        );
    }

    if (!verification.ok && verification.status !== 302 && verification.status !== 307) {
        const detail = await verification.text().catch(() => "");
        console.error("Webhook: verify endpoint rejected payment", {
            reference: payload.data.reference,
            status: verification.status,
            detail,
        });
    }

    return Response.json(
        { received: true }, 
        { status: 200 }
    );
}