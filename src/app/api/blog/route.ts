import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/validation";
import { Prisma } from "@/generated/prisma/client";

const CATEGORIES = [
    "CULTURE",
    "ENTERTAINMENT",
    "DIASPORA",
    "HERITAGE",
    "LIFESTYLE",
    "SUCCESS",
    "EVENTS",
] as const;

type BlogCategory = (typeof CATEGORIES)[number];

function isCategory(value: unknown): value is BlogCategory {
    return typeof value === "string" && (CATEGORIES as readonly string[]).includes(value);
}

function randomSuffix(length = 5): string {
    // Lowercase alnum, URL-safe
    return Math.random().toString(36).slice(2, 2 + length);
}

export async function GET() {
    try {
        const posts = await prisma.blog.findMany({
            orderBy: { createdAt: "desc" },
        });
        return Response.json({ posts });
    } catch (err) {
        console.error("GET /api/blog failed", err);
        return Response.json({ error: "Unable to load posts." }, { status: 500 });
    }
}

export async function POST(request: Request) {
    // --- Auth ---
    let session;
    try {
        session = await auth();
    } catch (err) {
        console.error("auth() failed", err);
        return Response.json({ error: "Authentication error." }, { status: 500 });
    }

    if (session?.user?.role !== "ADMIN") {
        return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    // --- Parse + validate ---
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
        return Response.json(
            { error: "Invalid JSON body." }, 
            { status: 400 }
        );
    }

    const title = typeof body.title === "string" ? body.title.trim() : "";
    const content = typeof body.content === "string" ? body.content.trim() : "";

    const coverImage =
        typeof body.coverImage === "string" && body.coverImage.trim()
        ? body.coverImage.trim()
        : null;
    const coverImageId = 
        typeof body.coverImageId === "string" && body.coverImageId.trim()
        ? body.coverImageId.trim()
        : null;
    const authorName =
        (typeof body.authorName === "string" && body.authorName.trim()) ||
        session.user.name ||
        "Admin";
    const category = body.category;

    if (title.length < 3) {
        return Response.json(
            { error: "Title must be at least 3 characters." }, 
            { status: 400 }
        );
    }
    if (content.length < 20) {
        return Response.json(
            { error: "Content must be at least 20 characters." }, 
            { status: 400 }
        );
    }
    if (!isCategory(category)) {
        return Response.json(
        { error: `Category must be one of: ${CATEGORIES.join(", ")}.` },
        { status: 400 }
        );
    }

    if (
        coverImageId !== undefined &&
        coverImageId !== null &&
        typeof coverImageId !== "string"
    ) {
        return Response.json(
            { error: "Invalid cover image ID." },
            { status: 400 }
        );
    }

    // --- Create with slug retry ---
    const baseSlug = slugify(title) || "post";
    const MAX_ATTEMPTS = 5;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const slug =
        attempt === 0 ? baseSlug : `${baseSlug}-${randomSuffix()}`;

        try {
            const post = await prisma.blog.create({
                data: {
                    title,
                    slug,
                    content,
                    coverImage,
                    coverImageId,
                    authorName,
                    category,
                    authorId: session.user.id,
                },
            });
            return Response.json(
                { post }, 
                { status: 201 }
            );

        } catch (err) {
            // Unique violation on the slug → retry with a suffix
            if (
                err instanceof Prisma.PrismaClientKnownRequestError &&
                err.code === "P2002"
            ) {
                const target = (err.meta?.target as string[] | string | undefined) ?? "";
                const fields = Array.isArray(target) ? target.join(",") : String(target);

                if (fields.includes("slug")) {
                    continue; // try again with a new suffix
                }
                // Some other unique field collided — not recoverable here
                return Response.json(
                    { error: "A post with conflicting unique data already exists." },
                    { status: 409 }
                );
            }

            // Missing required field / bad enum value etc.
            if ( err instanceof Prisma.PrismaClientValidationError ) {
                console.error("Prisma validation error", err);
                return Response.json(
                    { error: "Invalid article data." },
                    { status: 400 }
                );
            }

            console.error("POST /api/blog failed", err);
            return Response.json(
                { error: "Unable to publish article." },
                { status: 500 }
            );
        }
    }

    return Response.json(
        { error: "Could not generate a unique slug. Try a different title." },
        { status: 409 }
    );
}