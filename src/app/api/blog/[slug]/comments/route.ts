import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Props = {
    params: Promise<{ slug: string }>;
};

// GET COMMENTS
export async function GET(
    request: Request,
    { params }: Props
) {
    try {
        const { slug } = await params;
        const blog = await prisma.blog.findUnique({
            where: { slug, },
            select: { id: true, },
        });

        if (!blog) {
            return Response.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        const comments = await prisma.comment.findMany({
            where: { blogId: blog.id, },
            include: {
                user: {
                    select: { name: true, image: true, },
                },
            },
            orderBy: { createdAt: "desc", },
        });

        return Response.json(comments);
    } catch (error) {
        console.error("Load comments error:", error);

        return Response.json(
            { error: "Failed to load comments" },
            { status: 500 }
        );
    }
}


// POST COMMENT
export async function POST(
    request: Request,
    { params }: Props
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return Response.json(
                { error: "You must be logged in to comment" },
                { status: 401 }
            );
        }

        const { slug } = await params;
        const body = await request.json();
        const commentBody = body.body?.trim();

        if (!commentBody) {
            return Response.json(
                { error: "Comment cannot be empty" },
                { status: 400 }
            );
        }

        if (commentBody.length > 1000) {
            return Response.json(
                { error: "Comment is too long" },
                { status: 400 }
            );
        }

        const blog = await prisma.blog.findUnique({
            where: { slug, },
            select: { id: true, },
        });

        if (!blog) {
            return Response.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        const comment = await prisma.comment.create({
            data: {
                body: commentBody,
                blogId: blog.id,
                userId: session.user.id,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
        });

        return Response.json(comment, { status: 201 });
    } catch (error) {
        console.error("Create comment error:", error);

        return Response.json(
            { error: "Failed to create comment" },
            { status: 500 }
        );
    }
}