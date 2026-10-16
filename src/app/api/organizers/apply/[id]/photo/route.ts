import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type RouteContext = {
    params: Promise<{ id: string; }>;
};
export async function PATCH(request: Request, { params }: RouteContext ) {
    
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return Response.json(
                { error: "Not authenthicated." }, 
                { status: 401 }
            );
        }

        const { id } = await params;

        const organizer = await prisma.organizerApplication.findUnique({
            where: { id },
            select: { 
                id: true, 
                userId: true 
            }
        });

        if (!organizer) {
            return Response.json(
                { error: "Application not found" }, 
                { status: 404 }
            );
        }

        const body = await request.json();

        const photo = 
            typeof body.photo === "string" &&
            body.photo.trim()
                ? body.photo.trim()
                : null;


        const photoId = 
            typeof body.photoId === "string" &&
            body.photoId.trim()
                ? body.photoId.trim()
                : null;



        const updatedApplication = 
            await prisma.organizerApplication.update({
                where: { id, },
                data: {
                    photo,
                    photoId
                }
            });

        return Response.json({
            application: updatedApplication,
        });

    } catch (error) {
        console.error(
            "PATCH /api/organizers/apply/[id]/photo failed:",
            error
        );

        return Response.json(
            { error: "Unable to upload photo.", },
            { status: 500, }
        );
    }
    
}