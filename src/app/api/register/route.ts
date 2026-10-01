import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password, confirmPassword } = body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (typeof name !== "string" || 
        name.trim().length < 2 || !normalizedEmail || 
        typeof password !== "string" || 
        password.length < 8 || 
        password !== confirmPassword
      ) 
    {
      return Response.json(
        { error: password !== confirmPassword ? "Passwords do not match" : "Name, email, and a password of at least 8 characters are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return Response.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Account created successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
    
  } 
  catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}