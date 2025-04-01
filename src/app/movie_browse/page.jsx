"use client";
import { useState, useEffect, useCallback } from "react";
import { ListFilter } from "lucide-react"; // Genre Filter Icon
import MovieCard from "@/components/custom/movie-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

// Debounce function
const useDebounce = (callback, delay) => {
  const debounceFn = useCallback(
    (...args) => {
      const handler = setTimeout(() => callback(...args), delay);
      return () => clearTimeout(handler);
    },
    [callback, delay]
  );

  return debounceFn;
};

export default function MovieBrowse() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const limit = 10;

  // Fetch movies from API
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/movie_browse?page=${page}&limit=${limit}&search=${query}&genre=${selectedGenre}`
      );
      if (!res.ok) throw new Error("Failed to fetch movies.");
      const data = await res.json();
      setMovies(data.movies || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, query, selectedGenre]);

  // Fetch genres once on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/genres");
        if (!res.ok) throw new Error("Failed to fetch genres.");
        const data = await res.json();
        setGenres(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Debounced search function
  const debouncedSearch = useDebounce(setQuery, 500);

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl text-gray-700 font-bold flex justify-center mb-6">
        Browse Movies
      </h2>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-center gap-2 mb-6">
        {/* Search Input */}
        <div className="flex w-full md:w-1/2 gap-2">
          <Input
            className="flex-grow p-2 border border-gray-300 rounded-l-md"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies..."
          />
          <Button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-500 text-gray-900 hover:text-white transition duration-300 ease-in-out rounded-r-md"
            onClick={() => setQuery(search)}
          >
            Search
          </Button>
        </div>

        {/* Genre Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-gray-300 hover:bg-gray-500 text-gray-900 hover:text-white transition duration-300 ease-in-out rounded-md">
            <ListFilter className="w-3 h-5 mx-2" />
            {genres.find((genre) => genre.id === selectedGenre)?.name ||
              "All Genres"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Genres</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedGenre("")}>
              All Genres
            </DropdownMenuItem>
            {genres.map((genre) => (
              <DropdownMenuItem
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
              >
                {genre.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Movie List */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="w-40 h-60 rounded-md" />
          ))
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie_details?id=${movie.id}`} // Redirect to movie_details with the movie ID
              className="hover:scale-105 transition-transform duration-300"
            >
              <MovieCard
                poster_url={movie.poster_url}
                title={movie.title}
                year={movie.release_year}
                genres={movie.genres}
              />
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No movies found.</p>
        )}
      </div>

      {/* Pagination - Kept the original logic */}
      {total > limit && (
        <Pagination>
          <PaginationContent className="flex justify-center">
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              />
            </PaginationItem>

            {/* Current Page Number */}
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>

            {/* Ellipsis & Next Page */}
            {page < Math.ceil(total / limit) && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page + 1)}>
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((prev) =>
                    Math.min(prev + 1, Math.ceil(total / limit))
                  )
                }
                disabled={page >= Math.ceil(total / limit)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
