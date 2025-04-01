import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("title");

    if (!query) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    // Search movies (case-insensitive, partial match)
    const movies = await prisma.movies.findMany({
      where: {
        title: {
          contains: query, // Partial match
          mode: "insensitive", // Case-insensitive
        },
      },
      select: {
        id: true,
        title: true,
        poster_url: true,
      },
      take: 5, // Limit to 5 results
    });

    return NextResponse.json({ movies }, { status: 200 });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Failed to fetch movies." }, { status: 500 });
  }
}