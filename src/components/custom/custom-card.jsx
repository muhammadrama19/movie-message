import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CustomCard({ poster, title, year, receiver, message, href }) {
  return (
    <Card className="p-4 shadow-lg bg-white rounded-xl flex flex-col md:flex-row overflow-hidden w-full max-w-sm md:max-w-md min-h-[180px]">
      {/* Left - Poster */}
      <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
        <div className="w-full aspect-[2/3] rounded-md overflow-hidden shadow-sm bg-gray-200 flex items-center justify-center">
          <img src={poster} alt="Movie Poster" className="w-full h-full object-cover" />
        </div>
        {/* Movie Title & Year */}
        <p className="text-sm font-bold text-gray-500 text-center md:text-left truncate w-full">{title}</p>
        <p className="text-xs font-bold text-gray-400 text-center md:text-left">{year}</p>
      </div>

      {/* Right - Content */}
      <div className="flex flex-col justify-between w-full md:w-2/3 p-4 flex-grow">
        <div className="text-center md:text-left flex-grow">
          <p className="text-sm text-gray-600 truncate w-full">To: {receiver}</p>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{message}</p>
        </div>

        {/* Button Section */}
        <div className="flex justify-center md:justify-end mt-auto">
          <Button className="px-4 py-2 rounded-md text-sm">View</Button>
        </div>
      </div>
    </Card>
  );
}
