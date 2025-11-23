"use client";

import { useState } from "react";

export default function PopularPackagesInfo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      className="px-6 sm:px-0 py-14 max-w-7xl mx-auto"
      aria-labelledby="dubai-tour-packages-heading"
      itemScope
      itemType="https://schema.org/WebPage"
    >
 
      <h2
        id="dubai-tour-packages-heading"
        className="text-3xl sm:text-4xl font-bold text-foreground mb-4 uppercase"
        itemProp="headline"
      >
        Dubai Tour Packages
      </h2>

  
      <p
        className="text-muted-foreground text-lg leading-relaxed"
        itemProp="description"
      >
        Dubai offers a stunning blend of luxury, adventure, and modern attractions.
        From the breathtaking Burj Khalifa to thrilling desert safaris, every moment
        here feels extraordinary. Explore curated itineraries that match your travel style.
      </p>

      
      <article
        className={`
          text-muted-foreground mt-3 leading-relaxed transition-all duration-500 overflow-hidden
          ${expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
        itemProp="mainContentOfPage"
      >
        <p className="mt-3">
          Whether you're planning a romantic getaway, a family vacation, or a luxury escape, 
          Dubai has something for every traveler. Enjoy seamless experiences with personalized 
          itineraries, premium stays, guided tours, and unforgettable adventures across the city.
        </p>

        <p className="mt-3">
          Our Dubai travel experts craft packages that cover everything — flights, stays, 
          transfers, activities, and concierge support — making your holiday planning effortless.
        </p>
      </article>

  
      <button
        className="mt-3 font-semibold hover:underline transition"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </section>
  );
}
