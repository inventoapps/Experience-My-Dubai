"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sider() {
  const slides = [
    "/images/Burj-Khalifa.webp",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
  ];

  const slideWidth =
  window.innerWidth < 640
    ? 100          // 1 per view
    : window.innerWidth < 768
    ? 33.33        // 3 per view
    : 20;          // 5 per view
 

  const [index, setIndex] = useState(0);
  const maxIndex = slides.length - 5;

  const next = () => index < maxIndex && setIndex(index + 1);
  const prev = () => index > 0 && setIndex(index - 1);

  const prevOpacity = index === 0 ? 0.2 : 1;
  const nextOpacity = index === maxIndex ? 0.2 : 1;

  return (
    <section>
       <div className="relative w-7xl mx-auto overflow-hidden rounded-xl h-[250px] sm:h-[300px]">

     
        <div className="absolute top-4 right-4 flex items-center gap-2 z-30">
          <button
            onClick={prev}
            style={{ opacity: prevOpacity }}
            className="bg-black/40 p-2 rounded-full text-white backdrop-blur-md transition-opacity duration-500"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={next}
            style={{ opacity: nextOpacity }}
            className="bg-black/40 p-2 rounded-full text-white backdrop-blur-md transition-opacity duration-500"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        
        <div
          className="flex transition-transform duration-700 ease-out mt-16"
          style={{
            transform: `translateX(-${index * slideWidth}%)`
          }}
          >
          {slides.map((url, i) => (
            <div
              key={i}
              className="px-3 shrink-0 
                        w-full    // mobile
                        sm:w-[33.33%]  
                        md:w-[20%]     
              "
            >
              <img
                src={url}
                className="object-cover rounded-xl w-full h-full"
                alt="slide"
              />
            </div>
        ))}
        </div>

    </div>

    </section>
  );
}
