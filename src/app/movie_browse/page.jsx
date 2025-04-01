"use client";
import { useState, useEffect } from "react";
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

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MovieBrowse() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const limit = 10;
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(""); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `/api/movie_browse?page=${page}&limit=${limit}&search=${query}&genre=${selectedGenre}`
        );
        if (!res.ok) throw new Error("Failed to fetch movies.");
        const data = await res.json();
        console.log("Fetched movies frontend:", data); // Debug the API response
        setMovies(data.movies); // Ensure you're setting `data.movies`
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [page, query, selectedGenre]); // Refetch movies when page, query, or selectedGenre changes 


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //get genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch("/api/genres");
        if (!res.ok) throw new Error("Failed to fetch genres.");
        const data = await res.json();
        setGenres(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  }, []); 

  // Debounce search query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(search);
    }, 500); 
    return () => clearTimeout(timeout);
  }, [search]);

  // Handle page change
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  //handle last page
  const handleLastPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h2 className="text-2xl md:text-2xl text-gray-700 font-bold flex flex-row items-center justify-center mb-8">
        Browse Movies
      </h2>
      <div className="flex flex-row items-center justify-center mb-8">
        <Input
          className="mt-4 p-2 border border-gray-300 rounded-md w-1/2"
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search movies..."
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="mt-4 p-2 border text-color-dark border-gray-300 bg-gray-300 rounded-md w-1/8 ml-4 hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out active:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300">
            {genres.find((genre) => genre.id === selectedGenre)?.name || "Select Genre"} {/* Display selected genre name */}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Genres</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {genres.map((genre) => (
              <DropdownMenuItem
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)} // Set the genre ID
              >
                {genre.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              poster_url={movie.poster_url}
              title={movie.title}
              year={movie.release_year}
              genres={movie.genres}
            />
          ))
        ) : (
          <p className="text-gray-500">No movies found.</p>
        )}
      </div>
      {/* Pagination Controls */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => setPage(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => setPage(page + 2)}>
              {page + 2}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={handleNextPage}>Next</PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
