import { Card } from "@/components/ui/card";

export default function StepsCard({ icon, header, content }) {
  return (
    <Card className="p-6  bg-white rounded-2xl flex flex-col items-center justify-between w-full max-w-xs min-h-[280px] text-center transition-all duration-300 hover:shadow-xl">
      {/* Icon Wrapper */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 mb-4">
        {icon}
      </div>

      {/* Card Header & Content */}
      <h2 className="text-lg font-semibold">{header}</h2>
      <p className="text-sm text-gray-600 mt-2">{content}</p>
    </Card>
  );
}
