import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    // Extract query parameters to get the movie ID
    const { searchParams } = new URL(req.url);
    const movieId = parseInt(searchParams.get("id") || "0", 10);

    if (!movieId) {
        return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
    }

    console.log(`Fetching details for movie ID: ${movieId}`);

    try {
        // Execute raw SQL query
        const movieDetails = await prisma.$queryRaw`
            SELECT 
                movies.id, 
                movies.title, 
                movies.poster_url, 
                movies.release_year,
                movies.synopsis,
                movies.director,
                json_agg(DISTINCT genres.name) AS genres,
                json_agg(
                    DISTINCT jsonb_build_object(
                        'id', messages.id, 
                        'receiver', messages.receiver, 
                        'message', messages.message
                    )
                ) AS messages
            FROM movies
            LEFT JOIN messages ON messages.movie_id = movies.id
            LEFT JOIN movie_genres ON movie_genres.movie_id = movies.id
            LEFT JOIN genres ON movie_genres.genre_id = genres.id
            WHERE movies.id = ${movieId}
            GROUP BY movies.id;
        `;

        if (!movieDetails || movieDetails.length === 0) {
            return NextResponse.json({ error: "Movie not found" }, { status: 404 });
        }

        // The result is an array, we need to return the first item
        return NextResponse.json(movieDetails[0], { status: 200 });

    } catch (error) {
        console.error("Error fetching movie details:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
