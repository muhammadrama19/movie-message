import { supabase } from "@/lib/db";

export async function GET(req) {
  // Check if Supabase is connected
  const { data: testConnection, error: connectionError } = await supabase
    .from("movies")
    .select("id")
    .limit(1);

  if (connectionError) {
    console.error("Error connecting to Supabase:", connectionError.message);
    return new Response(
      JSON.stringify({ error: "Error connecting to Supabase" }),
      { status: 500 }
    );
  } else {
    console.log("Successfully connected to Supabase");
  }

  // Fetch messages with related movie data
  const { data, error } = await supabase
    .from("messages")
    .select(`
      id,
      movie_id,
      receiver,
      message,
      movies (
        id,
        title,
        poster_url,
        release_year
      )
    `);

  if (error) {
    console.error("Error fetching data:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching data", details: error.message }),
      { status: 500 }
    );
  }

  if (!data || data.length === 0) {
    console.log("No messages found.");
    return new Response(JSON.stringify([]), { status: 200 });
  }

  const formattedData = data.map((message) => ({
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
}