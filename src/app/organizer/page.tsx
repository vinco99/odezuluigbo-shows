import { redirect } from "next/navigation";
import { requireRole } from "@/lib/permissions";

export default function OrganizerPage(){
    const session = requireRole(["ADMIN", "ORGANIZER"], "/organizer/apply");
    
    redirect("/organizer/dashboard");
}