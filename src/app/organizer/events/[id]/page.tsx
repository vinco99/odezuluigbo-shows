import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ManageEventPage({params}:{params: Promise<{ id:string }>}){

    const session = await requireRole([
        "ADMIN",
        "ORGANIZER"
    ]);


    const { id } = await params;

    const event =
        await prisma.event.findUnique({
            where:{ id },
            include:{
                contestants:true,
                judges:true,
                sponsors:true
            }
        });

    if(!event){
        notFound();
    }

    return (

        <main className="p-10">

            <h1 className="text-4xl font-bold">
                {event.title}
            </h1>

            <p className="mt-3 capitalize">
                Status: {event.status}
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">

                <a
                    href={`/organizer/events/${event.id}/contestants`}
                    className="bg-green-600 text-white px-5 py-3 rounded"
                >
                    Manage Contestants
                </a>

                <a
                    href={`/organizer/events/${event.id}/judges`}
                    className="bg-purple-600 text-white px-5 py-3 rounded"
                >
                    Manage Judges
                </a>

                <a
                    href={`/organizer/events/${event.id}/sponsors`}
                    className="bg-orange-600 text-white px-5 py-3 rounded"
                >
                    Manage Sponsors
                </a>

            </div>

            <div className="mt-10">

                <h2 className="text-2xl font-bold">
                    Statistics
                </h2>

                <p>
                    Contestants: {event.contestants.length}
                </p>

                <p>
                    Judges: {event.judges.length}
                </p>

                <p>
                    Sponsors: {event.sponsors.length}
                </p>

            </div>

        </main>

    );
}