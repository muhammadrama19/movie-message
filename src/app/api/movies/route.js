import { supabase } from "@/lib/db";

export async function GET(req) {
    // Check if Supabase is connected
    const { data: testConnection, error: connectionError } = await supabase.from("movies").select("id").limit(1);

    if (connectionError) {
        console.error("Error connecting to Supabase:", connectionError.message);
        return new Response(JSON.stringify({ error: "Error connecting to Supabase" }), { status: 500 });
    } else {
        console.log("Successfully connected to Supabase");
    }


    const { data, error } = await supabase
        .from("movies")
        .select(`
            id, title, release_year, poster_url, director,
            movie_genres ( genre_id, genres ( name ) )
        `);

    if (error) {
        console.error("Error fetching data:", error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }


    const formattedData = data.map(movie => ({
        id: movie.id,
        title: movie.title,
        release_year: movie.release_year,
        poster_url: movie.poster_url,
        director: movie.director,
        genres: movie.movie_genres.map(g => g.genres.name) 
    }));
    return new Response(JSON.stringify(formattedData), { status: 200 });
}
