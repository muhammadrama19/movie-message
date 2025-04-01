import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    //check connection to db
    
    //extract query parameters to get the id of movie
    const { searchParams } = new URL(req.url);
    const movieId = parseInt(searchParams.get("id") || "0", 10);
    if (!movieId) {
        return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
    }
    console.log(`Fetching details for movie ID: ${movieId}`);

    //start fetching movie with its all messages by joining the messages.movies_id in messages table into movies.id
    try {
        const movieDetails = await prisma.movies.findUnique({
            where: { id: movieId },
            select: {
                id: true,
                title: true,
                poster_url: true,
                release_year: true,
                messages: {
                    select: {
                        id: true,
                        receiver: true,
                        message: true,
                    },
                },
            },
        });

        if (!movieDetails) {
            return NextResponse.json({ error: "Movie not found" }, { status: 404 });
        }

        console.log(`Fetched details for movie ID: ${movieId}`);
        return NextResponse.json(movieDetails, { status: 200 });
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }    

}