"use client"
import { useRouter } from "next/navigation";
import DestinationCard from "./DestinationCard";
export default function PackageByRegion(){
    const router = useRouter();

    const destinations = [
            {
                title: "Downtown Dubai",
                priceLabel: "Starts at INR 18,950",
                imageUrl: "/images/downtown-dubai.webp",
            },
            {
                title: "Dubai Marina",
                priceLabel: "Starts at INR 16,500",
                imageUrl: "/images/dubai-marina.webp",
            },
            {
                title: "Palm Jumeirah",
                priceLabel: "Starts at INR 21,200",
                imageUrl: "/images/Palm-area.webp",
            },
            {
                title: "Desert Area",
                priceLabel: "Starts at INR 8,250",
                imageUrl: "/images/desert-areawebp.webp"
            },
        ];



    return (
           <section 
                className="py-12 sm:py-16 max-w-7xl mx-auto cursor-pointer"
                aria-labelledby="packages-region-heading"
                >
                <h2 
                    id="packages-region-heading"
                    className="text-3xl font-bold mb-6 text-foreground uppercase "
                >
                    Packages by Region
                </h2>

                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {destinations.map((d) => (
                    <DestinationCard
                        key={d.title}
                        title={d.title}
                        priceLabel={d.priceLabel}
                        imageUrl={d.imageUrl}
                        onclick={()=>router.push(`/packagebyregion/dsfads`)}
                    />
               ))}
               </div>

               {/* <div 
                    className="
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    gap-6
                    "
                >

                 
                     <article 
                    className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1 bg-cover "
                    aria-label="Downtown Dubai packages"
                    style={{ backgroundImage: `url(/images/downtown-dubai.webp)` }}
                    
                    >
                    <h3 className="text-lg font-semibold mb-2">Downtown Dubai</h3>
                    <p className="text-sm text-muted-foreground">
                        Explore Burj Khalifa, Dubai Mall & city lights.
                    </p>
                    </article>

                 
                    <article 
                    className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1 "
                    aria-label="Dubai Marina packages"
                    >
                    <h3 className="text-lg font-semibold mb-2">Dubai Marina</h3>
                    <p className="text-sm text-muted-foreground">
                        Luxury yachts, beaches & waterfront views.
                    </p>
                    </article>

                    <article 
                    className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1 "
                    aria-label="Palm Jumeirah packages"
                    >
                    <h3 className="text-lg font-semibold mb-2">Palm Jumeirah</h3>
                    <p className="text-sm text-muted-foreground">
                        Resorts, Atlantis, and world-class dining.
                    </p>
                    </article>

                   
                    <article 
                    className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition  duration-300 hover:-translate-y-1 "
                    aria-label="Desert Area packages"
                    >
                    <h3 className="text-lg font-semibold mb-2">Desert Area</h3>
                    <p className="text-sm text-muted-foreground">
                        Desert safari, camel rides & adventure tours.
                    </p>
                    </article> 
                </div>*/}
             </section>
  )
}