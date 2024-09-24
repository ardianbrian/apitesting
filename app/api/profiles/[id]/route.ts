import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const profile = await prisma.profile.findUnique({
    where: { id: Number(params.id) },
  });
  return profile
    ? NextResponse.json(profile)
    : new NextResponse("Not Found", { status: 404 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { bio, userId } = await req.json();
  const updatedProfile = await prisma.profile.update({
    where: { id: Number(params.id) },
    data: { bio, userId },
  });
  return NextResponse.json(updatedProfile);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Mencari profile berdasarkan ID
  const profile = await prisma.profile.findUnique({
    where: { id: Number(params.id) },
  });

  // Jika profile tidak ditemukan, kembalikan respons Not Found
  if (!profile) {
    return new NextResponse("Profile Not Found", { status: 404 });
  }

  // Jika profile ditemukan, hapus profile tersebut
  await prisma.profile.delete({
    where: { id: Number(params.id) },
  });

  // Kembalikan respons dengan status 204 No Content
  return new NextResponse("Profile deleted successfully", { status: 200 });
}
