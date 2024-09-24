import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Mendapatkan semua post
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching users: ", error); // Log error
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}

// POST: Menambahkan post baru
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, content, authorId } = body;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId },
        },
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error fetching users: ", error); // Log error
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
