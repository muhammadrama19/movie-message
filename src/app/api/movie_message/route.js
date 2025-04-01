import { prisma } from "@/lib/db";

export async function GET(req) {
  try {
    // Check if Prisma is connected by fetching a test movie
    const testConnection = await prisma.movies.findFirst({
      select: { id: true },
    });

    if (!testConnection) {
      console.error("No movies found in the database.");
      return new Response(
        JSON.stringify({ error: "No movies found in the database." }),
        { status: 500 }
      );
    } else {
      console.log("Successfully connected to Prisma");
    }

    // Fetch messages with related movie data
    const messages = await prisma.messages.findMany({
      select: {
        id: true,
        movie_id: true,
        receiver: true,
        message: true,
        movies: {
          select: {
            id: true,
            title: true,
            poster_url: true,
            release_year: true,
          },
        },
      },
    });

    if (!messages || messages.length === 0) {
      console.log("No messages found.");
      return new Response(JSON.stringify([]), { status: 200 });
    }

    // Format the response
    const formattedData = messages.map((message) => ({
      id: message.id,
      movie_id: message.movie_id,
      movie_poster_url: message.movies.poster_url,
      movie_title: message.movies.title,
      movie_release_year: message.movies.release_year,
      message: message.message,
      receiver: message.receiver,
    }));

    console.log("Fetched messages:", formattedData);
    return new Response(JSON.stringify(formattedData), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching data", details: error.message }),
      { status: 500 }
    );
  }
}