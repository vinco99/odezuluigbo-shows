import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton  from "@/components/auth/LogoutButton";


export default async function Dashboard(){

    const session = await auth();

    if(!session){
        redirect("/login");
    }


    return (

        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1>
                Welcome {session.user?.name}
            </h1>

            <p>
                {session.user?.email}
            </p>
            
            <div className="mt-4">
                <LogoutButton />

                <a href="/profile" className="text-yellow-400">
                    Profile
                </a>
            </div>
        </main>

    )

}