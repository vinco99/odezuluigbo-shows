"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";


export default function LoginPage(){

    const [message,setMessage] = useState("");


    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){

        e.preventDefault();

        const form = new FormData(e.currentTarget);

        const result =
        await signIn("credentials",{

            email:form.get("email"),
            password:form.get("password"),
            redirect:false

        });


        if(result?.error){
            setMessage("Invalid login");
        }
        else{
            window.location.href="/dashboard";
        }

    }


    return (

        <div className="min-h-screen flex items-center justify-center">

            <form onSubmit={handleSubmit} className="space-y-4">

                <h1 className="text-3xl">
                    Login
                </h1>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border p-2"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border p-2"
                />

                <button type="submit" className="bg-black text-white px-5 py-2">
                    Login
                </button>

                <p>{message}</p>

            </form>


        </div>

    )

}