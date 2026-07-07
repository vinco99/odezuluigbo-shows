import { prisma } from "@/lib/prisma";


export default async function EventsPage(){

    const events = await prisma.event.findMany({
        where:{status:"APPROVED"},
        orderBy:{createdAt:"desc"}
    });


    return (

        <main className="p-10">

            <h1 className="text-4xl font-bold">
                Odezuluigbo Events
            </h1>

            <div className="mt-8 grid gap-5">
                {
                    events.map(event=>(

                        <div key={event.id} className="border rounded-lg p-5">

                            <h2 className="text-2xl font-bold">
                                {event.title}
                            </h2>

                            <p className="mt-2">
                                {event.description}
                            </p>

                            <p className="mt-3">
                                Registration: ₦{event.registrationFee}
                            </p>

                            <p>
                                Voting: ₦{event.votingFee}
                            </p>

                            <a
                                href={`/events/${event.id}`}
                                className="inline-block mt-4 bg-black text-white px-5 py-2"
                            >
                                View Event
                            </a>

                        </div>
                    ))
                }
            </div>

        </main>

    );

}