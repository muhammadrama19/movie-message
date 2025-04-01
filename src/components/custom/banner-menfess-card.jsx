import { Card, CardTitle, CardDescription } from "../ui/card";

export default function BannerCard({ message, receiver }) {
  const MAX_LENGTH = 250; // Maximum visible characters before truncation
  const isLong = message.length > MAX_LENGTH;
  const truncatedMessage = isLong ? message.slice(0, MAX_LENGTH) + "..." : message;

  return (
    <Card className="shadow-md hover:shadow-lg transition duration-300 flex flex-col items-start p-4 gap-4 w-full">
      {/* Left Side: Receiver */}
        <CardTitle className="text-sm text-gray-500 whitespace-nowrap">
          To: {receiver}
        </CardTitle>
    

      {/* Right Side: Message */}
      <div className="flex-grow">
        <CardDescription className="text-gray-800 font-semibold text-left">{truncatedMessage}</CardDescription>
      </div>
    </Card>
  );
}