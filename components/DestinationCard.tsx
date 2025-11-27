
import Image from "next/image";

interface DestinationCardProps {
  title: string;
  subtitle?: string;
  priceLabel: string; 
  imageUrl: string;
  onclick: ()=>void;
}

export default function DestinationCard({
  title,
  subtitle = "Tour Packages",
  priceLabel,
  imageUrl,
  onclick,
}: DestinationCardProps) {
  return (
    <div
      onClick={onclick}
      className="
        relative overflow-hidden 
        rounded-3xl shadow-lg 
        bg-black
        group
      "
    >
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="
            object-cover 
            transition-transform 
            duration-500 
            group-hover:scale-105
          "
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

    
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="space-y-1">
          <h3 className="text-white text-lg font-semibold">
            {title}
          </h3>
          <p className="text-white/80 text-sm">
            {subtitle}
          </p>
        </div>

       
        <div className="mt-3 h-px bg-white/25" />

      
        <p className="mt-2 text-sm font-semibold text-amber-400">
          {priceLabel}
        </p>
      </div>
    </div>
  );
}
