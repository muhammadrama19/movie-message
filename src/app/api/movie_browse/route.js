import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  
    // 🔹 Extract query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search")?.trim();
    const genreId = searchParams.get("genre")?.trim();
    const offset = (page - 1) * limit;


    try {
       
        const whereClause = {};

       
        if (search) {
            whereClause.title = { contains: search, mode: "insensitive" }; // Case-insensitive search
        }

       
        if (genreId) {
            whereClause.movie_genres = { some: { genre_id: parseInt(genreId, 10) } };
        }

     
        const movies = await prisma.movies.findMany({
            where: whereClause,
            skip: offset,
            take: limit,
            select: {
                id: true,
                title: true,
                poster_url: true,
                release_year: true,
                movie_genres: {
                    select: {
                        genres: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        const total = await prisma.movies.count({ where: whereClause });

        const formattedMovies = movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_url: movie.poster_url,
            release_year: movie.release_year,
            genres: movie.movie_genres.map(g => g.genres.name)
        }));

        return new NextResponse(JSON.stringify({
            movies: formattedMovies,
            total,
            page,
            limit
        }), { status: 200 });

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to fetch movies" }), { status: 500 });
    }
}
