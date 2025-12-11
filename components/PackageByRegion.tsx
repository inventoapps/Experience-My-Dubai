"use client"
import { useRouter } from "next/navigation";
import DestinationCard from "./DestinationCard";
import Navbar from "./Navbar";
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
        <>
        <section 
            className="py-12 sm:py-16 max-w-7xl mx-auto cursor-pointer px-6 sm:px-0"
            aria-labelledby="packages-region-heading"
            >
            <h2 
                id="packages-region-heading"
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 "
            >
                Packages by Region
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 sm:px-6 px-4 ">
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


        </section>

        </>
          
           
  )
}