import { requireRole } from "@/lib/permissions";

export default async function OrganizerPage() {
    await requireRole([
        "ADMIN", "ORGANIZER"
    ]);

    return (
        <main className="p-10">
            <h1 className="text-4xl font-bold">
                Organizer Dashboard
            </h1>

            <p>
               Create and manage events.
            </p>
        </main>
    );
}
