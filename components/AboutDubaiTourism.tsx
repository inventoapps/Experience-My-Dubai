import { Building2, MountainSnow, Plane, Sun } from "lucide-react";

export default function AboutDubaiTourism() {
  return (
    <section
      className="px-6 py-16 max-w-7xl mx-auto"
      aria-labelledby="about-dubai-heading"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      
      <h2
        id="about-dubai-heading"
        className="text-3xl sm:text-4xl font-bold text-foreground mb-10 text-center"
      >
        About Dubai Tourism
      </h2>

      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-10
          items-center
        "
      >
       
        <article
          className="space-y-5"
          itemProp="description"
        >
          <p className="text-muted-foreground text-lg leading-relaxed">
            Dubai is one of the world’s most iconic destinations, known for its luxurious malls, sky-high architecture,
            adventure-filled deserts, rich Arabian culture, and pristine beaches. From world-record attractions to
            immersive local experiences — Dubai offers something for every traveler.
          </p>

          
          <ul className="space-y-4 mt-6">
            <li className="flex items-start gap-3">
              <Building2 className="w-6 h-6  mt-1" />
              <p className="text-foreground font-medium">
                Home to world-famous landmarks like Burj Khalifa & Dubai Frame.
              </p>
            </li>

            <li className="flex items-start gap-3">
              <MountainSnow className="w-6 h-6  mt-1" />
              <p className="text-foreground font-medium">
                Desert safaris, dune bashing & authentic Arabian nights.
              </p>
            </li>

            <li className="flex items-start gap-3">
              <Plane className="w-6 h-6  mt-1" />
              <p className="text-foreground font-medium">
                One of the world’s busiest & most luxurious travel hubs.
              </p>
            </li>

            <li className="flex items-start gap-3">
              <Sun className="w-6 h-6  mt-1" />
              <p className="text-foreground font-medium">
                Year-round sunshine with stunning beaches & waterfronts.
              </p>
            </li>
          </ul>
        </article>

        
        <aside
          className="
            relative 
            h-[280px] sm:h-[350px] md:h-[420px]
            rounded-2xl 
            overflow-hidden 
            shadow-xl
          "
          aria-label="Dubai tourism image collage"
        >
          <img
            src="https://wallpapercave.com/wp/wp3605186.jpg"
            alt="Dubai skyline night view"
            className="
              w-full 
              h-full 
              object-cover 
              transition-transform 
              duration-700 
              hover:scale-110
            "
            itemProp="primaryImageOfPage"
          />

          
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent"></div>

         
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold drop-shadow-lg">Explore Dubai</h3>
            <p className="text-sm text-gray-200 mt-1">
              A city where dreams meet luxury.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
