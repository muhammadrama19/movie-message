import { Card } from "../ui/card";

export default function MovieCard({ poster_url, title, year, genres }) {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-start w-full max-w-[200px] min-h-[250px] text-left transition-all duration-300 hover:shadow-md hover:scale-105"> 
            {/* Movie poster */}
            <div className="w-full aspect-[2/3] rounded-md overflow-hidden shadow-sm mb-3 flex items-center justify-center bg-white">
                <img
                    src={poster_url}
                    alt="Movie Poster"
                    className="max-w-full max-h-full object-contain"
                />
            </div>
            {/* Movie title and year */}
            <div className="mb-1">
                <h2 className="text-sm font-medium text-gray-800">{title}</h2>
                <p className="text-xs text-gray-600">{year}</p>
            </div>
            {/* Genre */}
            <div>
                <p className="text-xs text-gray-600">{genres.join(", ")}</p>
            </div>
        </div>
    );
}
