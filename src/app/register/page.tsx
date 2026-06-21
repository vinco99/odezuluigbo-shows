"use client";

import {useState} from "react";


export default function RegisterPage(){

const [message,setMessage]=useState("");


async function handleSubmit(
e:React.FormEvent<HTMLFormElement>
){

e.preventDefault();


const form =
new FormData(e.currentTarget);


const response =
await fetch("/api/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:form.get("name"),

email:form.get("email"),

password:form.get("password")

})

});


const data =
await response.json();


setMessage(data.message || data.error);


}



return (

<div className="min-h-screen flex items-center justify-center">


<form
onSubmit={handleSubmit}
className="space-y-4"
>


<h1 className="text-3xl">
Create Account
</h1>


<input
name="name"
placeholder="Name"
className="border p-2"
/>


<input
name="email"
placeholder="Email"
className="border p-2"
/>


<input
name="password"
type="password"
placeholder="Password"
className="border p-2"
/>


<button
className="bg-black text-white px-5 py-2"
>

Register

</button>


<p>
{message}
</p>


</form>


</div>

)

}