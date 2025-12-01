"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSlider() {
  const images = [
    "/images/Burj-Khalifa.webp",
    "/images/desert-areawebp.webp",
    "/images/downtown-dubai.webp",
    "/images/dubai-marina.webp",
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  });

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative overflow-hidden w-full h-[70vh]">

      {/* Slider track */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="w-full shrink-0 h-[70vh] relative">
            <Image
              src={src}
              alt="hero"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full"
      >
        ←
      </button>

      {/* Right arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full"
      >
        →
      </button>
    </div>
  );
}
