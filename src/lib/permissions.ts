import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export async function requireRole(allowedRoles: string[], redirectUrl: string) {

    const session = await auth();

    if(!session){
        redirect("/login");
    }

    if(!allowedRoles.includes(session.user.role)){
        redirect(redirectUrl);
    }

    return session;
}