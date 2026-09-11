import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request){
    const session = await auth();


    if(!session?.user?.id || !session.user.email){

        return Response.json(
            {error:"Unauthorized"},
            {status:401}
        );

    }


    const body = await request.json();

    const {eventId, name, bio} = body;


    if (!eventId || !name) {
        return Response.json(
            {error: "Event, name and bio are required"},
            {status: 400}
        );
    }

    const event = await prisma.event.findUnique({
        where: {
            id: eventId,
        },
    });

    if (!event) {
        return Response.json(
            {error: "Event not found"},
            {status: 404}
        );
    }


    if (event.status !== "APPROVED") {
        return Response.json(
            {error: "This event is not open for registration"},
            {status: 400}
        );
    }


    // Check if the user has already applied for this event
    const existingContestant = await prisma.contestant.findFirst({
        where: {
            userId: session.user.id,
            eventId,
        },
    });

    if (existingContestant) {
        return Response.json(
            {error: "You have already applied for this event"},
            {status: 400}
        );
    }

    // Convert to kobo for Paystack
    const amount = Math.round(event.registrationFee * 100);

    if (amount <= 0) {
        return Response.json(
            {error: "Invalid registration fee"},
            {status: 400}
        );
    }


    const response = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {

            method:"POST",

            headers:{
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json"
            },

            body:JSON.stringify({
                email: session.user.email,
                amount,
                callback_url: `http://localhost:3000/api/contestants/verify`,

                metadata:{
                    eventId,
                    name,
                    bio,
                    userId: session.user.id,
                    type: "CONTESTANT_REGISTRATION"
                }
            })

        }

    );


    const data = await response.json();

    if (!response.ok || !data.status){
        console.error("Paystack initialization failed:", data);

        return Response.json(
            {
                error: "Unable to initialize payment",
                details: data.message,
            },
            {status: 400}
        );
    }

    return Response.json({
        authorization_url: data.data.authorization_url,
        reference: data.data.reference,
    });

}