import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export async function requireRole(allowedRoles:string[]) {

    const session = await auth();


    if(!session){
        redirect("/login");
    }


    const role = session.user.role;


    if(!allowedRoles.includes(role)){
        redirect("/unauthorized");
    }


    return session;

}