import { requireRole } from "@/lib/permissions";

export default async function AdminPage() {
    await requireRole([
        "ADMIN"
    ]);

    return (
        <main className="p-10">
            <h1 className="text-4xl font-bold">
                Admin Dashboard
            </h1>

            <p>
                Manage users, events, payments and reports.
            </p>
        </main>
    );
}
