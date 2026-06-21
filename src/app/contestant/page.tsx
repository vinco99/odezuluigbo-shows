import { requireRole } from "@/lib/permissions";

export default async function ContestantPage() {
    await requireRole([
        "ADMIN", "CONTESTANT"
    ]);

    return (
        <main className="p-10">
            <h1 className="text-4xl font-bold">
                Contestant Dashboard
            </h1>

            <p>
               Manage your competion.
            </p>
        </main>
    );
}

await requireRole([
 "ADMIN", "CONTESTANT"
]);