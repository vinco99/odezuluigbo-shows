import { prisma } from "@/lib/prisma";


export async function POST(request:Request, context:{params: Promise<{ id: string }>}){

    const {id} = await context.params;

    await prisma.event.update({
        where:  {id},
        data:   {status:"REJECTED"}
    });


    return Response.redirect(
        new URL("/admin/events", request.url)
    );

}