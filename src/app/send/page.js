"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Send() {
  const { register, handleSubmit, reset } = useForm();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setSearchError("");
      return;
    }

    setLoading(true);
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?title=${searchQuery}`);
        if (!res.ok) throw new Error("Search failed.");

        const data = await res.json();
        setMovies(data.movies);
        setSearchError("");
      } catch (error) {
        console.error(error);
        setSearchError("Error searching movies.");
      } finally {
        setLoading(false);
      }
    }, 500);

    setDebounceTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const onSubmit = async (formData) => {
    if (!selectedMovie) {
      setSearchError("Please select a movie before sending.");
      return;
    }

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movie_id: selectedMovie.id,
          recipient: formData.recipient,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send message.");
      }

      alert("Message sent successfully!");
      reset();
      setSelectedMovie(null);
      setMovies([]);
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message || "Failed to send. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-6xl font-bold">Send Message</h1>
        <p className="text-lg md:text-xl text-gray-700/80 mt-2">
          Send an anonymous message with a movie scene.
        </p>
      </div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        {/* Left Side: Recipient & Message */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block font-medium">Recipient</label>
              <Input
                type="text"
                placeholder="Enter recipient name"
                {...register("recipient", { required: true })}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Message</label>
              <textarea
                placeholder="Write your message..."
                {...register("message", { required: true })}
                className="border border-gray-300 rounded-md p-2 w-full min-h-[100px]"
              />
            </div>
            <Button type="submit" className="mt-4 w-full">
              Send
            </Button>
          </form>
        </div>

        {/* Right Side: Movie Selection */}
        <div className="w-full md:w-1/2 relative">
          <label className="block font-medium">Pick a Movie</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for a movie..."
              className="border border-gray-300 rounded-md p-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={() => {}} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>

          {movies.length > 0 && (
            <div className="absolute top-20 left-0 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-[250px] overflow-y-auto z-10">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    setSelectedMovie(movie);
                    setMovies([]);
                  }}
                >
                  <img
                    src={movie.poster_url}
                    alt="Poster"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <p className="text-md">{movie.title}</p>
                </div>
              ))}
            </div>
          )}

          {selectedMovie && (
            <Card className="mt-4 p-4 flex items-center gap-4 min-h-[80px]">
              <img
                src={selectedMovie.poster_url}
                alt="Movie Poster"
                className="w-16 h-16 object-cover rounded-md"
              />
              <p className="text-lg font-medium">{selectedMovie.title}</p>
            </Card>
          )}

          {searchError && <p className="text-red-500 text-sm mt-2">{searchError}</p>}
        </div>
      </div>
    </div>
  );
}
