import { prisma } from "@/lib/prisma";

export async function GET() {
    const start = Date.now();

    try {
        await prisma.$queryRaw`SELECT 1`;

        return Response.json({
            connected: true,
            time: `${Date.now() - start}ms`,
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                connected: false,
                error: "Database connection failed",
            },
            { status: 500 }
        );
    }
}