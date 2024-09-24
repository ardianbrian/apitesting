import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Mendapatkan semua profile
export async function GET() {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        user: true,
      },
    });
    return NextResponse.json(profiles);
  } catch (error) {
    console.error("Error fetching users: ", error); // Log error
    return NextResponse.json(
      { error: "Error fetching profiles" },
      { status: 500 }
    );
  }
}

// POST: Menambahkan profile baru
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { bio, userId } = body;

  try {
    const newProfile = await prisma.profile.create({
      data: {
        bio,
        user: {
          connect: { id: userId },
        },
      },
    });
    return NextResponse.json(newProfile, { status: 201 });
  } catch (error) {
    console.error("Error fetching users: ", error); // Log error
    return NextResponse.json(
      { error: "Error creating profile" },
      { status: 500 }
    );
  }
}
