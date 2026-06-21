import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function ProfilePage(){

  const session = await auth();

  if(!session){
    redirect("/login");
  }


  return (

    <main className="min-h-screen p-10 bg-black text-white">

        <h1 className="text-4xl font-bold text-yellow-400">
            My Profile
        </h1>

        <div className="mt-8 space-y-4">
            
            <div>
                <p className="text-gray-400">
                    Name
                </p>

                <p>
                    {session.user?.name}
                </p>
            </div>

            <div>
                <p className="text-gray-400">
                    Email
                </p>

                <p>
                    {session.user?.email}
                </p>
            </div>

            <div>
                <p className="text-gray-400">
                    Role
                </p>

                <p>
                    {session.user?.role}
                </p>
            </div>
        </div>
    </main>

  );

}