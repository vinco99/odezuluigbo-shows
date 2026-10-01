import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/validation";

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        if ( session.user.role !== "ADMIN" && session.user.role !== "ORGANIZER" ) {
            return Response.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        const body = await request.json().catch(() => null);

        if (!body || typeof body !== "object") {
            return Response.json(
                { error: "Invalid request body." },
                { status: 400 }
            );
        }

        const title =
            typeof body.title === "string"
                ? body.title.trim()
                : "";

        const description =
            typeof body.description === "string"
                ? body.description.trim()
                : "";

        const venue =
            typeof body.venue === "string"
                ? body.venue.trim()
                : "";

        const registrationFee = Number( body.registrationFee || 0 );
        const votingFee = Number( body.votingFee || 0 );
        const type = String( body.type || "PAGEANT" );
        const country = String( body.country || "Nigeria" );
        const state = String( body.state || "Anambra" );

        const allowedTypes = [
            "PAGEANT",
            "REALITY_SHOW",
            "TALENT_SHOW",
            "CULTURAL_FESTIVAL",
            "MUSIC",
            "COMEDY",
        ];

        const registrationStart =
            body.registrationStart
                ? new Date(String(body.registrationStart))
                : null;

        const registrationEnd =
            body.registrationEnd
                ? new Date(String(body.registrationEnd))
                : null;

        const eventDate =
            body.eventDate
                ? new Date(String(body.eventDate))
                : null;

        /*
        ----------------------------------------
        VALIDATION
        ----------------------------------------
        */

        if (
            !title ||
            !description ||
            !allowedTypes.includes(type) ||
            !Number.isFinite(registrationFee) ||
            registrationFee < 0 ||
            !Number.isFinite(votingFee) ||
            votingFee < 0 ||
            [registrationStart, registrationEnd, eventDate]
                .some(
                    (date) =>
                        date &&
                        Number.isNaN(date.getTime())
                ) ||
            (
                registrationStart &&
                registrationEnd &&
                registrationStart >= registrationEnd
            ) ||
            (
                registrationEnd &&
                eventDate &&
                registrationEnd > eventDate
            )
        ) {
            return Response.json(
                {
                    error:
                        "Invalid event details or date range.",
                },
                { status: 400 }
            );
        }

        /*
        ----------------------------------------
        CREATE SLUG
        ----------------------------------------
        */

        const baseSlug = slugify(title) || "event";

        const slug = `${baseSlug}-${Date.now()}`;

        /*
        ----------------------------------------
        CREATE EVENT
        ----------------------------------------
        */

        const event = await prisma.event.create({
            data: {
                title,
                description,
                registrationFee,
                votingFee,
                type: type as
                    | "PAGEANT"
                    | "REALITY_SHOW"
                    | "TALENT_SHOW"
                    | "CULTURAL_FESTIVAL"
                    | "MUSIC"
                    | "COMEDY",

                slug,

                country,
                state,
                venue: venue || null,

                registrationStart,
                registrationEnd,
                eventDate,

                organizerId: session.user.id,

                status: "PENDING",
            },
        });

        /*
        ----------------------------------------
        CREATE VOTE PACKAGES
        ----------------------------------------
        */

        if (votingFee > 0) {
            await prisma.votePackage.createMany({
                data: [
                    {
                        eventId: event.id,
                        name: "Starter",
                        votes: 10,
                        amount: votingFee * 10,
                    },
                    {
                        eventId: event.id,
                        name: "Power",
                        votes: 50,
                        amount: votingFee * 50,
                    },
                    {
                        eventId: event.id,
                        name: "Champion",
                        votes: 100,
                        amount: votingFee * 100,
                    },
                ],
            });
        }

        /*
        ----------------------------------------
        RETURN EVENT
        ----------------------------------------
        */

        return Response.json(
            {
                message: "Event created successfully.",
                event: {
                    id: event.id,
                    slug: event.slug,
                    title: event.title,
                    status: event.status,
                },
            },
            { status: 201 }
        );

    } catch (error) {
        console.error(
            "POST /api/events/create failed:",
            error
        );

        return Response.json(
            { error: "Unable to create event.", },
            { status: 500 }
        );
    }
}