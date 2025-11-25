"use client"
import Slider from "@/components/Slider";
import CarouselDemo from "./CarouselDemo";
import { useEffect, useState } from "react";
import AllPackagesPage from "@/app/admin/package/view/page";
import EnquiryForm from "./EnquiryFormPopUp";

interface PackageType {
  _id: string;
  title: string;
  slug: string;
  price: number;
  discountPrice?: number;
  city: string;
  country: string;
  gallery: string[];
}

export default function PopularPackages(){
    const [packages, setPackages] = useState<PackageType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
      
    
      async function fetchPackages() {
        try {
          const res = await fetch("/api/admin/package/get");
          const data = await res.json();
          setPackages(data.data || []);
        } catch (err) {
          console.error("ERR_FETCH_PACKAGES", err);
        }
        setLoading(false);
      }
    
      useEffect(() => {
        fetchPackages();
      }, []);

      
    
    return (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-accent/5">
          <div className="max-w-7xl mx-auto">

           <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1" >POPULAR DUBAI TOUR PACKAGES</h2>
            <div className="flex gap-2 mt-4">
            <button className="px-3 py-1 border border-gray-400 text-sm  rounded-lg bg-transparent cursor-pointer hover:bg-gray-300 hover:text-white ">
                All
            </button>

            <button className="px-3 py-1 border border-gray-400 text-sm bg-transparent rounded-lg hover:bg-gray-300 hover:text-white">
                5–8 Days
            </button>

            <button className="px-3 py-1 border border-gray-400 text-sm  rounded-lg bg-transparent hover:bg-gray-300 hover:text-white">
                10+ Days
            </button>

            <button className="px-3 py-1 border border-gray-400 text-sm  rounded-lg bg-transparent hover:bg-gray-300 hover:text-white">
                Less than 5 Days
            </button>
           </div>

           
        </div>

        
      <CarouselDemo packages={packages} setIsDialogOpen={setIsDialogOpen} />
       
      <EnquiryForm
              isOpen={isDialogOpen}
              price={799}
              onCancel={() => setIsDialogOpen(false)}
              onConfirm={() => setIsDialogOpen(false)}
        />

    </section>
    )
}