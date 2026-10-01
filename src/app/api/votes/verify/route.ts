import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const reference = new URL(request.url).searchParams.get("reference");

    if (!reference || !process.env.PAYSTACK_SECRET_KEY) 
        return Response.json(
            { error: "Reference is required" }, 
            { status: 400 }
        );

            
    const response = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`, 
        { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    const data = await response.json();

    if (!response.ok || !data.status || data.data?.status !== "success") 
        return Response.json(
            { error: "Payment failed" }, 
            { status: 400 }
        );

           
    const metadata = data.data.metadata;

    if (!metadata?.voterId || !metadata?.contestantId || !metadata?.packageId) 
        return Response.json(
            { error: "Invalid payment metadata" }, 
            { status: 400 }
        );


    const pack = await prisma.votePackage.findUnique({ where: { id: metadata.packageId } });

    if (!pack) 
        return Response.json(
            { error: "Package not found" }, 
            { status: 404 }
        );


    const contestant = await prisma.contestant.findUnique(
        { 
            where: { id: metadata.contestantId }, 
            include: { event: true } 
        }
    );

    const paidAmount = Number(data.data.amount) / 100;
    const now = new Date();
    
    if (!contestant || contestant.eventId !== metadata.eventId || contestant.applicationStatus !== "APPROVED" || pack.eventId !== contestant.eventId || !pack.active || Math.abs(paidAmount - pack.amount) > 0.01 || contestant.event.status !== "APPROVED" || !contestant.event.isVotingOpen || (contestant.event.eventDate && now > contestant.event.eventDate)) {
        return Response.json(
            { error: "Vote payment is no longer valid" }, 
            { status: 400 }
        );
    }

    await prisma.vote.upsert(
        { 
            where: { reference }, 
            update: { status: "PAID", amount: paidAmount }, 
            create: { 
                reference, 
                voterId: metadata.voterId, 
                contestantId: metadata.contestantId, 
                quantity: pack.votes, 
                amount: paidAmount, 
                status: "PAID" 
            } 
        }
    );
    
    return Response.redirect(
        new URL(`/events/${metadata.eventId}`, request.url)
    );
}
