import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug: slug },
    include: { comments: { 
      orderBy: { createdAt: "desc" } 
    }},
  });

  if (!blog) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(blog);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // admin-only
  const { slug } = await params;
  const body = await request.json();

  const blog = await prisma.blog.update({
    where: { slug: slug },
    data: {
      title: body.title,
      content: body.content,
      category: body.category,
      coverImage: body.coverImage,
      authorName: body.authorName,
    },
  });

  return NextResponse.json(blog);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // admin-only
  const { slug } = await params;
  await prisma.blog.delete({ where: { slug: slug } });
  return new NextResponse(
    null, 
    { status: 204 }
);
}