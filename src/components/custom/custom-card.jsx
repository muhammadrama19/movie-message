import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CustomCard({ poster, title, year, receiver, message }) {
  return (
    <Card className="p-4 shadow-lg bg-white rounded-xl flex flex-col md:flex-row overflow-hidden">
      {/* Left - Poster (Full height) */}
      <div className="w-full md:w-1/3 flex flex-col items-center md:items-start rounded-lg">
        <img
          src={poster}
          className="w-full md:w-auto md:h-full object-cover rounded-lg border border-gray-300 shadow-sm"
          alt="Poster"
        />
        {/* Movie Title below Poster */}
        <p className="text-sm font-bold text-gray-500  text-center md:text-left bg">{title}</p>
        <p className="text-sm font-bold text-gray-400  text-center md:text-left bg">{year}</p>
      </div>

      {/* Right - Content (Text + Button) */}
      <div className="flex flex-col justify-between w-full md:w-2/3 p-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-600">To: {receiver}</p>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
        </div>
        
        {/* Button Section */}
        <div className="flex justify-center md:justify-end mt-4 md:mt-0">
          <Button className="px-6 py-2 rounded-md">View</Button>
        </div>
      </div>
    </Card>
  );
}