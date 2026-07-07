import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";


export async function POST( request:Request ){

    const session = await auth();

    if(!session){

        return Response.json(
            { error:"Unauthorized" },
            { status:401 }
        );
    }

    if( session.user.role !== "ADMIN" && session.user.role !== "ORGANIZER" ){

        return Response.json(
            { error:"Forbidden" },
            { status:403 }
        );

    }


    const form = await request.formData();

    const title = form.get("title") as string;

    const description = form.get("description") as string;

    const registrationFee = Number(form.get("registrationFee"));

    const votingFee = Number(form.get("votingFee"));


    await prisma.event.create({
        
        data:{
            title,
            description,
            registrationFee,
            votingFee,
            organizerId:
            session.user.id,
            status:"PENDING"
        }

    });

    redirect("/organizer/events");

}