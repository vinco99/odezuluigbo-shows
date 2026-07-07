import { requireRole } from "@/lib/permissions";

export default async function CreateEventPage() {
    await requireRole([
        "ADMIN",
        "ORGANIZER"
    ]);

    return (
        <main className="p-10">

            <h1 className="text-3xl font-bold">
                Create Event
            </h1>

            <form action="/api/events/create" method="POST" className="space-y-4 mt-6">

                <input name="title"
                    placeholder="Event title"
                    className="border p-3 w-full"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="border p-3 w-full"
                />

                <input
                    name="registrationFee"
                    type="number"
                    placeholder="Registration fee"
                    className="border p-3 w-full"
                />

                <input
                    name="votingFee"
                    type="number"
                    placeholder="Voting fee"
                    className="border p-3 w-full"
                />

                <button className="bg-black text-white px-6 py-3">
                    Create Event
                </button>

            </form>

        </main>
    );
}