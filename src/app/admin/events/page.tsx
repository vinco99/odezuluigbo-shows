import { requireRole } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";


export default async function AdminEventsPage(){

    await requireRole([
        "ADMIN"
    ]);

    const events = await prisma.event.findMany({
        where:{status:"PENDING"},
        include:{organizer:true}
    });


    return (
        <main className="p-10">

            <h1 className="text-4xl font-bold">
                Pending Events
            </h1>

            <div className="mt-8 space-y-4">
                {
                    events.map(event=>(

                        <div key={event.id} className="border p-5">

                            <h2 className="text-xl font-bold">
                                {event.title}
                            </h2>

                            <p>Organizer: {event.organizer.name}</p>

                            <p>Status: {event.status}</p>


                            <div className="mt-4 flex gap-3">

                                <form
                                    action={`/api/admin/events/${event.id}/approve`}
                                    method="POST"
                                >
                                    <button className="bg-green-600 text-white px-4 py-2">
                                        Approve
                                    </button>
                                </form>

                                <form
                                    action={`/api/admin/events/${event.id}/reject`}
                                    method="POST"
                                >
                                    <button className="bg-red-600 text-white px-4 py-2">
                                        Reject
                                    </button>
                                </form>
                                
                            </div>
                        </div>
                    ))
                }
            </div>

        </main>
    )
}