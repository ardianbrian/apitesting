import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Mendapatkan semua user
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
        profile: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users: ", error); // Log error
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

// POST: Menambahkan user baru
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, name } = body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error fetching users: ", error); // Log error
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
