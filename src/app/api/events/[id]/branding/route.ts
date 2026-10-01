import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type RouteContext = {
    params: Promise<{ id: string; }>;
};

export async function PATCH(
    request: Request,
    { params }: RouteContext
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return Response.json(
                { error: "Not authenticated." },
                { status: 401 }
            );
        }

        const { id } = await params;

        const event = await prisma.event.findUnique({
            where: { id, },
            select: {
                id: true,
                organizerId: true,
            },
        });

        if (!event) {
            return Response.json(
                { error: "Event not found." },
                { status: 404 }
            );
        }

        const isAdmin = session.user.role === "ADMIN";
        const isOwner = event.organizerId === session.user.id;

        if (!isAdmin && !isOwner) {
            return Response.json(
                { error: "You cannot edit this event." },
                { status: 403 }
            );
        }

        const body = await request.json();

        const logo =
            typeof body.logo === "string" &&
            body.logo.trim()
                ? body.logo.trim()
                : null;

        const logoPublicId =
            typeof body.logoPublicId === "string" &&
            body.logoPublicId.trim()
                ? body.logoPublicId.trim()
                : null;

        const banner =
            typeof body.banner === "string" &&
            body.banner.trim()
                ? body.banner.trim()
                : null;

        const bannerPublicId =
            typeof body.bannerPublicId === "string" &&
            body.bannerPublicId.trim()
                ? body.bannerPublicId.trim()
                : null;

        const updatedEvent =
            await prisma.event.update({
                where: {
                    id,
                },
                data: {
                    logo,
                    logoPublicId,
                    banner,
                    bannerPublicId,
                },
            });

        return Response.json({
            event: updatedEvent,
        });
        

        

    } catch (error) {
        console.error(
            "PATCH /api/events/[id]/branding failed:",
            error
        );

        return Response.json(
            { error: "Unable to save event branding.", },
            { status: 500, }
        );
    }
}