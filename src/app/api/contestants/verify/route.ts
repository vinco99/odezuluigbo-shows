import { prisma } from "@/lib/prisma";


export async function GET(request: Request){

    try{
        const {searchParams} = new URL(request.url);

        const reference = searchParams.get("reference");

        if (!reference) {
            return Response.json(
                {error:"Reference is required"},
                {status:400}
            );
        }


        // Verify the payment with Paystack
        const response = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers:{
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        );


        const data = await response.json();

        if(!data.status || data.data?.status !== "success"){
            return Response.json(
                {error: "Payment failed"},
                {status: 400}
            );
        }

        const metadata = data.data.metadata;

        if(
            !metadata?.userId ||
            !metadata?.eventId ||
            !metadata?.name
        ){
            return Response.json(
                {error: "Invalid payment metadata"},
                {status: 400}
            );
        }


        //Check that the event exists
        const event = await prisma.event.findUnique({
            where: {
                id: metadata.eventId
            },
        });

        if (!event) {
            return Response.json(
                {error: "Event not found"},
                {status: 404}
            );
        }


        //Prevent duplicate payment processing
        const existingPayment = await prisma.payment.findUnique({
            where: {
                reference,
            },
        });

        if (existingPayment) {
            return Response.redirect(
                new URL(
                    `/events/${metadata.eventId}`,
                    request.url
                )
            );
        }


        //create payment record and contestant record in the database
        await prisma.$transaction(async (tx) => {
            //Create a new payment record
            const payment = await tx.payment.create({
                data: {
                    reference,
                    amount: Number(data.data.amount) / 100,
                    status: "PAID",
                    userId: metadata.userId,
                    eventId: metadata.eventId,
                    type: metadata.type || "CONTESTANT_REGISTRATION"
                },
            });

            //Create contestant
            await tx.contestant.create({
                data: {
                    userId: metadata.userId,
                    eventId: metadata.eventId,
                    name: metadata.name,
                    bio: metadata.bio,
                    paymentId: payment.id,
                    applicationStatus: "PENDING"
                },
            });
        });

        return Response.redirect(
            new URL(
                `/events/${metadata.eventId}`,
                request.url
            )
        );

    }catch (error) {
        console.error("contestant payment verification error:", error);

        return Response.json(
            {error: "Something went wrong while verifying the payment"},
            {status: 500}
        );
    }


}