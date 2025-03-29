import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function ValueCard({ icon, headline, explanation, content, smalltext }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className="p-6 shadow-md bg-white rounded-2xl flex flex-col items-center justify-center w-full max-w-xs min-h-[280px] text-center transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon & Headline (Visible by Default) */}
      <div className={`flex flex-col items-center transition-opacity duration-500 ${hovered ? "opacity-0 scale-0 h-0" : "opacity-100 scale-100 h-auto"}`}>
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 mb-2">
          {icon}
        </div>
        <h2 className="text-lg font-semibold">{headline}</h2>
        <p className="text-xs text-gray-500 mt-2">{explanation}</p>
      </div>

      {/* Content & Small Text (Shown on Hover) */}
      <div className={`text-sm transition-opacity duration-500 ${hovered ? "opacity-100 h-auto scale-100" : "opacity-0 scale-0 h-0"}`}>
        <p className="text-gray-600 mt-2">{content}</p>
        <p className="text-xs text-gray-500 mt-2">{smalltext}</p>
      </div>
    </Card>
  );
}
