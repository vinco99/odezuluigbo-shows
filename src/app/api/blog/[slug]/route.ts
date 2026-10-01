import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug: id },
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
  { params }: { params: Promise<{ id: string }> }
) {
  // admin-only
  const { id } = await params;
  const body = await request.json();

  const blog = await prisma.blog.update({
    where: { slug: id },
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
  { params }: { params: Promise<{ id: string }> }
) {
  // admin-only
  const { id } = await params;
  await prisma.blog.delete({ where: { slug: id } });
  return new NextResponse(
    null, 
    { status: 204 }
);
}