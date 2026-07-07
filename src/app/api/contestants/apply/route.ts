import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


export async function POST(request:Request){

    const session = await auth();

    if(!session){

        return Response.json(
            {error:"Unauthorized"},
            {status:401}
        );

    }


    const form = await request.formData();

    const eventId = form.get("eventId") as string;

    const name = form.get("name") as string;

    const bio = form.get("bio") as string;


    await prisma.contestant.create({

        data:{
            userId: session.user.id,
            eventId,
            name,
            bio,
            paymentStatus: "PENDING",
            applicationStatus: "PENDING"
        }

    });


    return Response.redirect(

        new URL(`/events/${eventId}`,request.url)

    );

}