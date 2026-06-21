import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {

  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {

      return Response.json(
        {error: "Email and password required"},
        {status: 400}
      );

    }


    const user =
      await prisma.user.findUnique({
        where:{
          email
        }
      });


    if(!user){

      return Response.json(
        {error:"Invalid email or password"},
        {status:401}
      );

    }


    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if(!passwordMatch){

      return Response.json(
        {
          error:"Invalid email or password"
        },
        {
          status:401
        }
      );

    }


    return Response.json({

      message:"Login successful",

      user:{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
      }

    });


  } catch(error){

    console.log(error);


    return Response.json(
      {
        error:"Server error"
      },
      {
        status:500
      }
    );

  }

}