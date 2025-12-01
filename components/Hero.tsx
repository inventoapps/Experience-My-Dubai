"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

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
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden">

      {/* Navbar */}
      <Navbar theme="dark" />

      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <div
            key={i}
            className={`
              absolute inset-0 bg-cover bg-center bg-no-repeat
              transition-opacity duration-1000 ease-in-out
              ${i === index ? "opacity-100" : "opacity-0"}
            `}
            style={{ backgroundImage: `url(${img.src})` }}
          />
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4">

        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-xl leading-tight max-w-[90%]">
          Create a Super Hit Holiday
        </h1>

        {/* Search Bar */}
        {/* <div className="mt-5 w-full max-w-[450px] relative bg-white rounded-xl border-[1.5px] border-green-300 shadow-lg">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />

          <input
            type="text"
            placeholder="Search packages"
            className="w-full pl-10 pr-4 py-3 text-black rounded-xl text-sm sm:text-base focus:outline-none"
          />
        </div> */}

        <SearchBar/>

      </div>

    </section>
  );
}
