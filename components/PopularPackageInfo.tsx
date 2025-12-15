"use client";

import { useState } from "react";

export default function PopularPackagesInfo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      className="px-6 sm:px-0 py-14 max-w-7xl mx-auto "
      aria-labelledby="dubai-tour-packages-heading"
      itemScope
      itemType="https://schema.org/WebPage"
    >
 
      <h2
        id="dubai-tour-packages-heading"
        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
        itemProp="headline"
      >
        Dubai Tour Packages
      </h2>

  
      <p
        className="text-muted-foreground text-lg leading-relaxed "
        itemProp="description"
      >
        The first time you think of a <b>Dubai Tour Package</b>, it is rarely about tickets or checklists.
        It begins much earlier, somewhere in the imagination, where a golden city rises out of a quiet
        desert and calls travellers with a kind of gentle confidence.
        Dubai is not a place that overwhelms you; it is a place that slowly reveals itself, as if the skyline,
        the sea, and the desert have agreed to welcome you one layer at a time. And when travellers
        choose <b>ExperienceMyDubai</b>, they walk into a journey that has been shaped with care, stitched with comfort, 
        and designed not just for sightseeing but for a feeling that stays long after the return flight touches home
      </p>

      
      <article
        className={`
          text-muted-foreground mt-3 leading-relaxed transition-all duration-500 overflow-hidden 
          ${expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
        itemProp="mainContentOfPage"
      >
        <h3 className="text-2xl text-gray-800 mt-3">Affordable Dubai Holiday Packages – When Comfort Meets Simplicity</h3>
        <p className="mt-3">
          Many travellers believe Dubai is a place meant only for luxury, but the truth is far kinder.
          With ExperienceMyDubai, Affordable Dubai Holiday Packages are not shortcuts; they are hand-picked experiences shaped
          for travellers who want beauty without burden, comfort without excess. Dubai has a way of welcoming everyone, whether
          one stands before the Burj Al Arab or walks slowly through the spice souq with its colourful lanes and soft voices.

        </p>

        <p className="mt-3">
          Standing by the sea at Jumeirah, watching the morning light settle on the waves, costs nothing.
          Riding the abra across the creek, feeling the old city whisper through the breeze, costs almost nothing. 
          Yet these moments become more precious than any luxury room. Dubai opens its door wide, and travellers
          find that even on a modest budget, the city can feel warm, generous, and quietly unforgettable.

        </p>



        <h3 className="text-2xl text-gray-800 mt-6">Dubai Tour Itinerary for Families – Because Memories Travel Longer Than Luggage</h3>
        <p className="mt-3">
        A family does not travel for buildings. A family travels for the way children laugh when a dolphin jumps, for the way parents hold the railing together at the top of a tower,
         for the way evenings stretch softly when everyone sits around one table sharing stories of the day.
          A Dubai Tour Itinerary for Families by ExperienceMyDubai is shaped around these simple truths.

        </p>

        <p className="mt-3">
          The aquarium feels like stepping into another world. The desert safari feels like time slowing down, 
          as dunes change colour under the sinking sun. And the Dubai Frame, standing silent and golden, holds the city’s
           past and future in one gentle view that families never forget. Every place becomes a memory, every moment a story that follows them home.

        </p>
      </article>

  
      <button
        className="mt-3 font-semibold hover:underline transition  uppercase"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </section>
  );
}
