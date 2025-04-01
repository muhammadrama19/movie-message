"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomCard from "@/components/custom/custom-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function MenfessBrowse() {
  const [menfess, setMenfess] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const limit = 9;
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch menfess using useCallback
  const fetchMenfess = useCallback(async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await fetch(
        `/api/menfess_browse?page=${page}&limit=${limit}&search=${query}`
      );
      if (!res.ok) throw new Error("Failed to fetch menfess.");
      const data = await res.json();
      console.log("API Response:", data); // Debugging log
      setMenfess(data.menfess || []); // Ensure it's an array
      setTotal(data.total || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Stop loading
      setIsSearching(false); // Reset searching state
    }
  }, [page, query, limit]);

  // Call API when page or query changes
  useEffect(() => {
    fetchMenfess();
  }, [fetchMenfess]);

  // Memoize the total number of pages
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  return (
    <div className="p-2 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl mb-8 text-gray-800 font-bold text-center">
        Menfess Browse
      </h2>

      {/* Search area */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-lg">
          <Input
            type="text"
            placeholder="Search by receiver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-lg p-4"
          />
          <Button
            onClick={() => {
              setQuery(search);
              setPage(1); // Reset to the first page when searching
            }}
            className="w-full sm:w-auto text-lg px-6 py-3"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Loading Spinner */}
      {isSearching && (
        <div className="flex justify-center items-center my-8">
          <Spinner size="large" />
        </div>
      )}

      {/* Menfess List or Skeleton Loader */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: limit }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-[200px] w-full bg-gray-200 rounded-md"
            />
          ))
        ) : // Show Menfess List when loaded
        menfess.length > 0 ? (
          menfess.map((m) => (
            <Link
              key={m.id}
              href={`/menfess_detail?id=${m.id}`}
              className="flex flex-col items-center justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CustomCard
                key={m.id}
                title={m.title}
                poster={m.poster_url}
                release_year={m.release_year}
                message={m.message}
                receiver={m.receiver}
                className="text-lg"
              />
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full text-lg">
            No menfess found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {total > limit && (
        <Pagination className="mt-8 flex justify-center">
          <PaginationContent className="flex justify-center">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </PaginationPrevious>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            {page < totalPages && (
              <>
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page >= totalPages}
                  >
                    Next
                  </PaginationNext>
                </PaginationItem>
              </>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
