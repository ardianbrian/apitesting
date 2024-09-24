import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });
  return post
    ? NextResponse.json(post)
    : new NextResponse("Not Found", { status: 404 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { title, content, published, authorId } = await req.json();
  const updatedPost = await prisma.post.update({
    where: { id: Number(params.id) },
    data: { title, content, published, authorId },
  });
  return NextResponse.json(updatedPost);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Mencari post berdasarkan ID
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });

  // Jika post tidak ditemukan, kembalikan respons Not Found
  if (!post) {
    return new NextResponse("Post Not Found", { status: 404 });
  }

  // Jika post ditemukan, hapus post tersebut
  await prisma.post.delete({
    where: { id: Number(params.id) },
  });

  // Kembalikan respons dengan status 204 No Content
  return new NextResponse("Post deleted successfully", { status: 200 });
}
