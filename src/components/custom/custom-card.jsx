import Image from "next/image"; // If using Next.js, otherwise use <img>
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CustomCard({ poster, title, year, receiver, message }) {
  return (
    <Card className="p-4 shadow-lg bg-white rounded-xl flex flex-col md:flex-row overflow-hidden">
      {/* Left - Poster */}
      <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
        {poster ? (
          <img
            src={poster}
            className="w-full h-60 md:h-full object-cover rounded-lg border border-gray-300 shadow-sm"
            alt={title}
          />
        ) : (
          <div className="w-full h-60 md:h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        
        <div className="mt-2 text-center md:text-left">
          <p className="text-sm font-bold text-gray-700">{title}</p>
          <p className="text-sm text-gray-500">{year}</p>
        </div>
      </div>

      {/* Right - Content */}
      <div className="flex flex-col justify-between w-full md:w-2/3 p-4">
        <div>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">To:</span> {receiver}
          </p>
          <p className="text-sm text-gray-600 mt-2">{message}</p>
        </div>

        {/* Button */}
        <div className="flex justify-center md:justify-end mt-4 md:mt-0">
          <Button className="px-6 py-2 rounded-md">View</Button>
        </div>
      </div>
    </Card>
  );
}
