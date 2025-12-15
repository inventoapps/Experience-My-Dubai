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

       <h3 className="text-2xl text-gray-700 mt-6">Dubai Travel Packages from India – A Journey That Begins Before Landing
      </h3>

  
      <p
        className="text-muted-foreground text-lg leading-relaxed mt-3 "
        itemProp="description"
      >
       For travellers coming from India, Dubai feels strangely familiar. The warmth, the hospitality, the food, the rhythm of markets—everything feels close, almost known. Dubai Travel Packages from India created by ExperienceMyDubai make this connection even easier. Flights are simple. Meals feel comfortable. And the journey seems less like crossing borders and more like stepping into a new chapter with an old friend waiting on the other side.
      When travellers walk out of Dubai Airport and feel the bright desert air touch their face for the first time, they realise how gently the city welcomes them, how simply it opens its arms, and how natural the journey already feels.
 
      </p>

      
      <article
        className={`
          text-muted-foreground mt-3 leading-relaxed transition-all duration-500 overflow-hidden 
          ${expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
        itemProp="mainContentOfPage"
      >
        <h3 className="text-2xl text-gray-700 mt-6" >Best Dubai Sightseeing Tour – Where Wonder and Stillness Stand Side by Side</h3>
        <p className="mt-3">
          Every traveller arrives in Dubai expecting tall buildings, but they leave remembering something entirely different—the feeling the city leaves behind. 
          The Best Dubai Sightseeing Tour designed by ExperienceMyDubai captures this balance beautifully. The Burj Khalifa rises like a dream carved from steel. 
          The Dubai Fountain dances each evening as if the water itself carries a heartbeat.
           The Miracle Garden blooms as though someone has painted the desert with colours it had forgotten.

        </p>

        <p className="mt-3">
          But it is the old creek, the narrow lanes, the wind towers, the slow boats—all of this remains in the mind long after the journey ends, reminding travellers that Dubai’s soul is not in its height but in its history.

        </p>


        <h3 className="text-2xl text-gray-700 mt-6" >Luxury Dubai Vacation Package Deals – When Travel Turns into a Gentle Indulgence</h3>
        <p className="mt-3">
         For those who want their journey to feel soft, slow, and deeply comforting, the Luxury Dubai Vacation Package Deals from ExperienceMyDubai open the door to another side of the city. 
         Here, luxury is not loud. It is in a desert dinner under a sky full of quiet stars, in a private balcony overlooking the marina, in the calmness of a high-rise suite where the whole city glows like a warm lantern at night.

        </p>

        <p className="mt-3">
          Luxury in Dubai is not about showing more; it is about feeling more—feeling cared for, feeling peaceful, 
          feeling as if time itself has softened.
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
