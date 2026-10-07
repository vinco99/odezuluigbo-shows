import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";


export async function POST(request:Request, context:{params: Promise<{ id: string }>}){

    const session = await auth();
    if (session?.user?.role !== "ADMIN") return Response.json({error:"Forbidden"},{status:403});

    const {id} = await context.params;

    await prisma.event.update({
        where:  {id},
        data:   {status:"SUSPENDED"}
    });


    return Response.redirect(
        new URL("/admin/events", request.url)
    );

}