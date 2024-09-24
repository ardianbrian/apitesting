import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });
  return user
    ? NextResponse.json(user)
    : new NextResponse("User Not Found", { status: 404 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name, email } = await req.json();
  const updatedUser = await prisma.user.update({
    where: { id: Number(params.id) },
    data: { name, email },
  });
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Mencari user berdasarkan ID
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  // Jika user tidak ditemukan, kembalikan respons Not Found
  if (!user) {
    return new NextResponse("User Not Found", { status: 404 });
  }

  // Jika user ditemukan, hapus user tersebut
  await prisma.post.delete({
    where: { id: Number(params.id) },
  });

  // Kembalikan respons dengan status 204 No Content
  return new NextResponse("User deleted successfully", { status: 200 });
}
