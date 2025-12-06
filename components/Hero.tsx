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
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full ">

      {/* Navbar */}
      <Navbar theme="dark" />

      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <div
            key={i}
            className={`
              absolute inset-0 bg-cover bg-center bg-no-repeat
              transition-opacity duration-1500 ease-in-out animate-fadeIn

              ${i === index ? "opacity-100" : "opacity-0"}
            `}
            style={{ backgroundImage: `url(${img.src})` }}
          />
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative  flex flex-col justify-center items-center text-center h-full px-4 z-10">

        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-xl leading-tight max-w-[90%]">
          Create a Super Hit Holiday
        </h1>


        <SearchBar/>

      </div>

    </section>
  );
}
