import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    console.log("Fetching movies using Prisma...");

    // 🔹 Extract query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search")?.trim();
    const genreId = searchParams.get("genre")?.trim();
    const offset = (page - 1) * limit;

    console.log(`Page: ${page}, Limit: ${limit}, Search: "${search}", Genre: "${genreId}"`);

    try {
       
        const whereClause = {};

       
        if (search) {
            whereClause.title = { contains: search, mode: "insensitive" }; // Case-insensitive search
        }

        // ✅ **Filter by Genre (Many-to-Many)**
        if (genreId) {
            whereClause.movie_genres = { some: { genre_id: parseInt(genreId, 10) } };
        }

        // 🔹 **Get Movies with Pagination & Filters**
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

        // ✅ **Format Response**
        const formattedMovies = movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_url: movie.poster_url,
            release_year: movie.release_year,
            genres: movie.movie_genres.map(g => g.genres.name)
        }));

        console.log(`Fetched ${formattedMovies.length} movies.`);
        console.log("Movies:", formattedMovies);
        

        return new NextResponse(JSON.stringify({
            movies: formattedMovies,
            total,
            page,
            limit
        }), { status: 200 });

    } catch (error) {
        console.error("❌ Error fetching movies:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to fetch movies" }), { status: 500 });
    }
}
