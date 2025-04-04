"use client";
import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import MovieCard from "@/components/custom/movie-card";
import BannerCard from "@/components/custom/banner-menfess-card";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <Suspense fallback={<LoadingState />}>
      <MovieDetails />
    </Suspense>
  );
}

function MovieDetails() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menfess, setMenfess] = useState([]);

  // Fetch movie details
  const fetchMovieDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/movie_details?id=${movieId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to fetch movie details.");

      setMovie(data || null);
      setMenfess(data.messages || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("Failed to load movie details.");
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    if (movieId) fetchMovieDetails();
  }, [fetchMovieDetails]);

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
      {/* LEFT SIDE: Sticky Movie Details */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="lg:sticky lg:top-20">
          {isLoading ? (
            <Skeleton className="h-96 w-full" />
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
                  {movie?.genres?.map((genre, index) => (
                    <Badge key={index} className="gap-2 mr-2 mt-2">{genre}</Badge>
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

      {/* RIGHT SIDE: Messages List */}
      <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg">
        {/* Header (Sticky) */}
        <div className="bg-white z-10 p-4 shadow-sm sticky top-0 rounded-lg">
          <h3 className="text-2xl font-bold">Menfess from the World of {movie?.title}</h3>
          <p className="text-sm text-gray-500">Anonymous confessions, untold stories, and hidden emotions—all tied to this movie. Read what others have to say.</p>
        </div>

        {/* Messages List (Scrollable) */}
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

function LoadingState() {
  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/3">
        <Skeleton className="h-96 w-full" />
      </div>
      <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6">
        <LoadingMessages />
      </div>
    </div>
  );
}

function LoadingMessages() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3 mt-auto" />
    </div>
  );
}
