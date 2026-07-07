"use client";

import { useState } from "react";
import { useParams } from "next/navigation";


export default function ApplyForm(){

    const params = useParams();

    const eventId = params.id as string;

    const [name,setName]=useState("");

    const [bio,setBio]=useState("");


    async function submit(e:any){

        e.preventDefault();

        const response = await fetch("/api/contestants/payment",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    eventId,
                    name,
                    bio
                })

            }
        );

        const data = await response.json();

        window.location.href = data.data.authorization_url;

    }



    return (

        <form onSubmit={submit}
            className="space-y-4"
        >

            <input value={name}
                onChange={
                e=>setName(e.target.value)
                }
                placeholder="Full name"
                className="border p-3 w-full"
            />

            <textarea value={bio}
                onChange={
                e=>setBio(e.target.value)
                }
                placeholder="Bio"
                className="border p-3 w-full"
            />

            <button type="submit"
            className="bg-black text-white px-5 py-3"
            >
                Pay Registration Fee
            </button>

        </form>

    )

}