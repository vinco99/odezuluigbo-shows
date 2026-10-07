import { requireRole } from "@/lib/permissions";
import CreateEventForm from "./CreateEventForm";


export default async function CreateEventPage() {
    await requireRole(["ADMIN", "ORGANIZER",], "/organizer/apply");

    return <CreateEventForm />;
}