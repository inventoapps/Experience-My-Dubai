"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Navbar from "./Navbar";

export default function Hero() {
  const [index, setIndex] = useState(0);

  const images = [
    {
      src: "/images/Burj-Khalifa.webp",
      alt: "Night view of Downtown Dubai with the illuminated Burj Khalifa",
    },
    {
      src: "/images/Palm-Jumeirah-Dubai.webp",
      alt: "Aerial view of Palm Jumeirah in Dubai",
    },
    {
      src: "/images/Dubai-Marina-Skyline.webp",
      alt: "Stunning sunset view of the Dubai Marina skyline",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[65vh] sm:h-[70vh] md:h-[75vh] w-full overflow-hidden">

     
      <Navbar theme="dark" />

     
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <div
            key={i}
            className={`
              absolute inset-0 bg-cover bg-center 
              transition-opacity duration-1500 ease-in-out
              ${i === index ? "opacity-100" : "opacity-0"}
            `}
            style={{ backgroundImage: `url(${img.src})` }}
          />
        ))}

       
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

    
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 gap-3">
        <h1 className="text-3xl sm:text-4xl font-bold drop-shadow-xl">
          Create a Super Hit Holiday
        </h1>

        <div className="mt-4 w-[90%] max-w-[400px] relative bg-white rounded-xl border-2 border-green-300">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search…"
            className="w-full pl-10 pr-4 py-3 text-black rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
