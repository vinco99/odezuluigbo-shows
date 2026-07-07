import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";


export default async function OrganizerEvents(){

    const session = await requireRole(["ADMIN", "ORGANIZER"]);

    const events =
    await prisma.event.findMany({
        where:{
            organizerId: session.user.id
        }

    });


    return (

        <main className="p-10">

            <h1 className="text-3xl">My Events</h1>

            <a
                href="/organizer/events/create"
                className="inline-block mt-5 bg-black text-white px-5 py-3"
            >
                Create Event
            </a>


            <div className="mt-8">
                {
                    events.map(event=>(
                        <div
                            key={event.id}
                            className="border p-5 mt-3"
                        >

                            <h2 className="font-bold">
                                {event.title}
                            </h2>

                            <p>Status: {event.status}</p>

                            <a href={`/organizer/events/${event.id}`}
                                className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Manage Event
                            </a>

                        </div>
                    ))
                }
            </div>
        </main>
    );
}