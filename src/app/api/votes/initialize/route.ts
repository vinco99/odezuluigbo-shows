import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user?.id || !session.user.email) 
        return Response.json(
            { error: "Unauthorized" }, 
            { status: 401 }
        );

    const body = await request.json().catch(() => null);

    const contestantId = typeof body?.contestantId === "string" ? body.contestantId : "";

    const packageId = typeof body?.packageId === "string" ? body.packageId : "";

    const contestant = await prisma.contestant.findUnique(
        { 
            where: { id: contestantId }, 
            include: { event: true } 
        }
    );
        
    const pack = await prisma.votePackage.findFirst(
        { 
            where: { 
                id: packageId, 
                eventId: contestant?.eventId, 
                active: true 
            } 
        }
    );

    const now = new Date();

    const votingWindowOpen = (!contestant?.event.registrationEnd || now <= contestant.event.registrationEnd) && (!contestant?.event.eventDate || now <= contestant.event.eventDate);
    
    if (!contestant || 
        !pack || 
        contestant.applicationStatus !== "APPROVED" || 
        contestant.event.status !== "APPROVED" || 
        !contestant.event.isVotingOpen || 
        !votingWindowOpen) 
    {
        return Response.json(
            { error: "Voting is not available for this selection" }, 
            { status: 400 }
        );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!appUrl || !process.env.PAYSTACK_SECRET_KEY) 
        return Response.json(
            { error: "Payment is not configured" }, 
            { status: 500 }
        );

    const paystack = await fetch(
        "https://api.paystack.co/transaction/initialize", 
        {
            method: "POST",
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify(
                { 
                    email: session.user.email, 
                    amount: Math.round(pack.amount * 100), 
                    callback_url: `${appUrl}/api/votes/verify`, 
                    metadata: { 
                        voterId: session.user.id, 
                        contestantId, 
                        eventId: contestant.eventId, 
                        packageId, 
                        type: "VOTE" 
                    } 
                }
            ),
        }
    );

    const data = await paystack.json();

    if (!paystack.ok || !data.status) 
        return Response.json(
            { error: data.message ?? "Unable to initialize payment" }, 
            { status: 400 }
        );

    return Response.json(
        { 
            authorization_url: data.data.authorization_url, 
            reference: data.data.reference 
        }
    );
}
