import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user?.id) 
        return Response.json(
            { error: "Unauthorized" }, 
            { status: 401 }
        );

    const body = await request.json().catch(() => null);
    const businessName = typeof body?.businessName === "string" ? body.businessName.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const proposal = typeof body?.proposal === "string" ? body.proposal.trim() : "";
    const experience = typeof body?.experience === "string" ? body.experience.trim() : undefined;

    if (businessName.length < 2 || phone.length < 7 || proposal.length < 20) {
        return Response.json(
            { error: "Business name, phone, and a detailed proposal are required" }, 
            { status: 400 }
        );
    }

    const application = await prisma.organizerApplication.upsert({
        where: { userId: session.user.id },
        update: { businessName, phone, proposal, experience, status: "PENDING", reviewNote: null, reviewedAt: null },
        create: { userId: session.user.id, businessName, phone, proposal, experience },
    });
    
    return Response.json(
        { application }
    );
}
