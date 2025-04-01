"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import MovieCard from "@/components/custom/movie-card";

export default function Page() {
    const searchParams = useSearchParams();
    const messageId = searchParams.get("id");
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(messageId || "1");

    // Fetch menfess detail
    useEffect(() => {
        const fetchMenfessDetail = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/menfess_detail?id=${query}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data?.error || "Failed to fetch menfess detail.");
                }
                setMessage(data || null);
            } catch (error) {
                console.error("Fetch Error:", error);
                setError("Failed to load menfess detail.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchMenfessDetail();
    }, [query]);

    return (
        <div className="max-w-5xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
            {/* LEFT SIDE: Movie Details */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <div className="lg:sticky lg:top-20">
                    {isLoading ? (
                        <Skeleton className="w-full h-96 rounded-lg" />
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : (
                        <MovieCard
                            poster_url={message?.poster_url}
                            title={message?.title}
                            year={message?.release_year}
                            genres={message?.genres}
                        />
                    )}
                </div>
            </div>

            {/* RIGHT SIDE: Menfess Details */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6 bg-white shadow-md rounded-lg p-6">
                {isLoading ? (
                    <div className="flex flex-col gap-6">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3 mt-auto" />
                    </div>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <>
                        {/* Message Content */}
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl font-semibold text-gray-800">To: {message?.receiver}</h2>
                            <p className="text-gray-700 leading-relaxed">{message?.message}</p>
                        </div>

                        {/* Created At (Always at the Bottom) */}
                        <div className="mt-auto pt-4 border-t border-gray-200 text-sm text-gray-500">
                            <p>Created at: {message?.created_at}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
