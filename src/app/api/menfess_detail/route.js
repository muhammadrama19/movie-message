import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import Link from "next/link";

export async function GET(req) {
  // Extract query parameters to get the message ID
  const { searchParams } = new URL(req.url);
  const messageId = parseInt(searchParams.get("id") || "0", 10);

  // Check if messageId is provided
  if (!messageId) {
    return NextResponse.json(
      { error: "Message ID is required" },
      { status: 400 }
    );
  }

 

  // Fetch the message details from the database using raw SQL query
  try {
    const messageDetails = await prisma.$queryRaw`
      SELECT 
        movies.id, 
        movies.title, 
        movies.poster_url, 
        json_agg(DISTINCT genres.name) AS genres, 
        messages.message, 
        messages.receiver, 
        movies.created_at 
      FROM messages 
      JOIN movies ON messages.movie_id = movies.id 
      JOIN movie_genres ON movie_genres.movie_id = movies.id 
      JOIN genres ON genres.id = movie_genres.genre_id 
      WHERE messages.id = ${messageId} 
      GROUP BY movies.id, messages.message, messages.receiver, movies.created_at;
    `;

    // Check if message details were found
    if (!messageDetails || messageDetails.length === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    // Format the created_at field
    const formattedDetails = {
      ...messageDetails[0],
      created_at: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date(messageDetails[0].created_at)),
    };

    // Return the formatted response
    return NextResponse.json(formattedDetails, { status: 200 });
  } catch (error) {
   
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}