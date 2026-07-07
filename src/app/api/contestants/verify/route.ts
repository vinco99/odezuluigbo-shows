import { prisma } from "@/lib/prisma";


export async function GET(request:Request){

    const {searchParams} = new URL(request.url);

    const reference = searchParams.get("reference");

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`,

        {
            headers:{
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        }

    );


    const data = await response.json();


    if(data.data.status !== "success"){

        return Response.json(
            {error:"Payment failed"}
        );

    }


    const metadata = data.data.metadata;


    await prisma.contestant.create({

        data:{
            userId: metadata.userId,

            eventId: metadata.eventId,

            name: metadata.name,

            bio: metadata.bio,

            paymentStatus: "PAID",

            paymentReference: reference,

            applicationStatus: "PENDING"

        }

    });



    return Response.redirect(
        new URL(
            `/events/${metadata.eventId}`,
            request.url
        )
    );

}