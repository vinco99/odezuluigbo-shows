import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/lib/auth";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {

  try {

    const session = await auth();

    if (!session) {
      return Response.json(
        { error: "Not Authenticated" },
        { status: 401 }
      );
    }

    const allowedRoles = ["ADMIN", "CONTESTANT", "USER", "ORGANIZER"];

    if (!allowedRoles.includes(session.user.role)) {
      return Response.json(
        { error: "You are not allowed to upload images." },
        { status: 403 }
      );
    }

    const { paramsToSign } = await request.json();

    if (!paramsToSign) {
      return Response.json(
        { error: "Missing upload parameters." },
        { status: 400 }
     );
    }
    
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return Response.json({
      signature,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    });

  } catch (error) {

    console.error("Cloudinary signing error:", error);

    return Response.json(
      { error: "Unable to sign upload." },
      { status: 500 }
    );

  }
}