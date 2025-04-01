"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import MovieCard from "@/components/custom/movie-card";
import CustomCard from "@/components/custom/custom-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import BannerCard from "@/components/custom/banner-menfess-card";
import { Badge } from "@/components/ui/badge";


export default function MovieDetails() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(movieId || "1");
  const [total, setTotal] = useState(0);
  const [menfess, setMenfess] = useState([]);

  // Fetch movie details
  const fetchMovieDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/movie_details?id=${query}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch movie details.");
      }

      setMovie(data || null);
      setTotal(data.messages?.length || 0);
      setMenfess(data.messages || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("Failed to load movie details.");
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  return (
<div className="max-w-6xl mx-auto p-2 flex flex-col lg:flex-row gap-6">
{/* LEFT SIDE: Movie Details (Fixed Width, Not Expanding) */}
    <div className="w-full lg:w-1/3 flex flex-col gap-6 lg:flex-none">
        <div className="lg:sticky lg:top-20">
            {isLoading ? (
                <Skeleton className="w-full h-96" />
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <img src={movie?.poster_url} alt="" className="w-full h-auto max-h-64 object-contain" />
                        <h2 className="text-2xl font-bold mt-4">{movie?.title}</h2>
                        <p className="text-gray-700">{movie?.release_year}</p>
                        <p className="text-gray-700">{movie?.director}</p>
                        <div>
                            {movie?.genres.map((genre, index) => (
                                <Badge key={index} className="gap-2 mr-2 mt-2" >
                                    {genre}
                                </Badge>
                            ))}
                        </div>
                        
                       
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4 mt-2">
                        <h3 className="text-xl font-bold mb-4">Synopsis</h3>
                        <p className="text-gray-700">{movie?.synopsis}</p>
                    </div>
                </>
            )}
        </div>
    </div>

    {/* RIGHT SIDE: Messages (Does NOT Expand If Left is Longer) */}
  <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg lg:flex-none">
    {/* Header (Sticky on Large Screens) */}
    <div className="bg-white z-0 p-4 shadow-sm sticky top-0 lg:relative rounded-lg">
      <h3 className="text-2xl font-bold">Messages</h3>
    </div>

    {/* Messages List (Scrollable Only on Large Screens) */}
    <div className="p-4 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-full bg-gray-200 rounded-md" />
          ))
        ) : menfess.length > 0 ? (
          menfess.map((m) => (
            <BannerCard key={m.id} message={m.message} receiver={m.receiver} className="text-lg" />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No messages found.</p>
        )}
      </div>
    </div>
  </div>
</div>

  );
}
