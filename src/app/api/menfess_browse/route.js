import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search")?.trim();
  const offset = (page - 1) * limit;
  const whereClause = {};
  try {
    if (search) {
      whereClause.receiver = { contains: search, mode: "insensitive" };
    }

    // Fetch paginated menfess data
    const menfess = await prisma.messages.findMany({
      orderBy: { created_at: "desc" },
      where: whereClause,
      skip: offset,
      take: limit,
      select: {
        id: true,
        receiver: true,
        message: true,
        movies: {
          select: {
            poster_url: true,
            title: true,
            release_year: true,
          },
        },
      },
    });

    // Get total count of messages for pagination
    const total = await prisma.messages.count({ where: whereClause });
    const formattedMenfess = menfess.map((m) => ({
      id: m.id,
      receiver: m.receiver,
      message: m.message,
      poster_url: m.movies.poster_url,
      title: m.movies.title,
      release_year: m.movies.release_year,
    }));

    return NextResponse.json({
      menfess: formattedMenfess,
      total,
      page,
      limit,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
