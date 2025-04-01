export default function MovieCard({ poster_url, title, year, genres }) {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-start 
        w-[200px] h-[300px] text-left transition-all duration-300 hover:shadow-lg hover:scale-100 
        overflow-hidden flex-none"> {/* Fixed Size & Prevent Growth */}

            {/* Movie Poster - Aspect Ratio Maintained */}
            <div className="w-full aspect-[2/3] rounded-md overflow-hidden shadow-sm bg-gray-200 flex items-center justify-center">
                <img
                    src={poster_url}
                    alt="Movie Poster"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Movie Title & Year */}
            <div className="flex flex-col items-start w-full mt-2">
                <h2 className="text-sm font-medium text-gray-800 w-full line-clamp-2">{title}</h2>
                <p className="text-xs text-gray-600">{year}</p>
            </div>

            {/* Genres */}
            <div className="w-full mt-1">
                <p className="text-xs text-gray-600 truncate w-full">{genres.join(", ")}</p>
            </div>

        </div>
    );
}

