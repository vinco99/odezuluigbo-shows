import { auth } from "@/lib/auth";


export async function POST(request: Request){

    const session = await auth();


    if(!session){

        return Response.json(
            {error:"Unauthorized"},
            {status:401}
        );

    }


    const body = await request.json();

    const {eventId, name, bio} = body;


    const response = await fetch("https://api.paystack.co/transaction/initialize",
        {

            method:"POST",

            headers:{
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,

                "Content-Type": "application/json"
            },

            body:JSON.stringify({
                email: session.user.email,
                amount: 1500000,
                callback_url: `http://localhost:3000/api/contestants/verify`,

                metadata:{
                    eventId,
                    name,
                    bio,
                    userId: session.user.id
                }
            })

        }

    );


    const data = await response.json();

    return Response.json(data);

}