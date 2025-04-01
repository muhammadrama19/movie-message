"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import MovieCard from "@/components/custom/movie-card";

export default function Page() {
  return (
    <Suspense fallback={<LoadingState />}>
      <MovieDetails />
    </Suspense>
  );
}

function MovieDetails() {
  const searchParams = useSearchParams();
  const messageId = searchParams.get("id");

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenfessDetail = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/menfess_detail?id=${messageId}`);
        if (!res.ok) throw new Error("Failed to fetch menfess detail.");
        const data = await res.json();
        setMessage(data || null);
      } catch (error) {
        setError("Failed to load menfess detail.");
      } finally {
        setIsLoading(false);
      }
    };

    if (messageId) fetchMenfessDetail();
  }, [messageId]);

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col lg:flex-row gap-8 w-full">
      {/* LEFT SIDE: Sticky Movie Details */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="lg:sticky lg:top-20">
          {isLoading ? <Skeleton className="h-96 w-full" /> : <MovieCard {...message} />}
        </div>
      </div>

      {/* RIGHT SIDE: Scrollable Message Details */}
      <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6 max-h-[80vh] overflow-y-auto">
        {isLoading ? (
          <LoadingMessage />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <h2 className="text-xl font-semibold">To: {message?.receiver}</h2>
            <p className="text-gray-700">{message?.message}</p>
            <div className="mt-auto pt-4 border-t border-gray-200 text-sm text-gray-500">
              <p>Created at: {message?.created_at}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3">
        <Skeleton className="h-96 w-full" />
      </div>
      <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6">
        <LoadingMessage />
      </div>
    </div>
  );
}

function LoadingMessage() {
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
