import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";


export default async function EventDetailsPage({params}:{params: Promise<{id:string}>}){

    const {id} = await params;

    const event = await prisma.event.findUnique({
        where:{id},
        include:{
            organizer: true,
            contestants: true,
            judges: true,
            sponsors: true
        }
    });


    if(!event){
        notFound();
    }


    return (
        <main className="p-10">

            <h1 className="text-5xl font-bold">
                {event.title}
            </h1>

            <p className="mt-5 text-gray-600">
                {event.description}
            </p>

            <div className="mt-6">

                <p>Organizer: {event.organizer.name}</p>

                <p>Registration Fee: ₦{event.registrationFee}</p>

                <p>Voting Fee: ₦{event.votingFee}</p>

                <p>Status: {event.status}</p>

                <a
                href={`/events/${event.id}/apply`}
                className="inline-block mt-5 bg-yellow-500 px-5 py-3"
                >
                   Apply as Contestant
                </a>
                

            </div>
            <hr className="my-10"/>


            <h2 className="text-3xl font-bold">
                Contestants
            </h2>
            <div className="grid md:grid-cols-3 gap-5 mt-5">
                {
                    event.contestants.map(contestant=>(

                        <div key={contestant.id} className="border p-5 rounded">

                            <h3 className="font-bold">
                                {contestant.name}
                            </h3>

                            <p>Votes: {contestant.votes}</p>

                        </div>
                    ))
                }
            </div>
            <hr className="my-10"/>


            <h2 className="text-3xl font-bold">
                Judges
            </h2>
            <div className="mt-5">
                {
                    event.judges.map(judge=>(
                        <p key={judge.id}>
                            {judge.name}
                        </p>
                    ))
                }
            </div>
            <hr className="my-10"/>


            <h2 className="text-3xl font-bold">
                Sponsors
            </h2>
            <div className="mt-5">
                {
                    event.sponsors.map(sponsor=>(
                        <p key={sponsor.id}>
                            {sponsor.name}
                        </p>
                    ))
                }
            </div>
        </main>
    );
}