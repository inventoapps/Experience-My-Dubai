"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Star, Phone } from "lucide-react";
import EnquiryForm from "./EnquiryFormPopUp";
import {PackageCardSkeleton} from './sekeleton/PackageCardSkeleton '

interface GalleryType {
  image: string;
  alt: string;
}

interface DurationType {
  days: number;
  nights: number;
  breakdown: {
    location: string;
    days: number;
  }[];
}

interface PackageType {
  _id: string;
  title: string;
  slug: string;
  price: number;
  discountPrice?: number;
  city: string;
  country: string;
  gallery: GalleryType[];
  duration: DurationType;
  rating: number;
  totalRatings: number;
}


export default function TourPackage() {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading , setLoading] = useState(true);
  const router = useRouter();

  const route = "packages"; 


  useEffect(()=>{
  const getPackages = async()=>{
     try {
        const res  = await fetch(`/api/package/getlimited/${6}`);
        const data = await res.json();

        setPackages(data.data);

        
     } catch (error) {
        console.log(error);
     }
     finally{
        setLoading(false);
     }
  }
  getPackages();
},[]);

  if(loading){
     return <div className="max-w-5xl mx-auto  py-12 sm:py-16 px-4 sm:px-0 bg-accent/5 ">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                Tour Packages
              </h2> 

              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-12 sm:px-6 px-3 ">
                {
                  Array.from({length:6}).map((_ , idx)=>( 
                      <PackageCardSkeleton key={idx}/>
                  ))
                }

              </div>


           </div>
    }

  


  return (
    <section className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-0 bg-accent/5">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
        Tour Packages
      </h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 space-y-2 sm:px-6 px-3 ">
        {packages.length > 0 &&
          packages.map((item, idx) => (
            <div
               key={item._id}
              className="relative  w-[300px] h-[450px] md:w-[360px] md:h-[520px] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.gallery?.[0]?.image || "/images/DubaiEdit2.webp"}
                  alt={item.gallery?.[0]?.alt || item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-20" onClick={() => router.push(`/${route}/${item.slug}`)}></div>

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10"></div>

              {/* Content */}
              <div className="absolute bottom-0 p-5 text-white text-sm z-20">
                
                {/* Days + Rating */}
                <div className="flex justify-between">
                  <p>
                    {item.duration.days} days & {item.duration.nights} nights
                  </p>

                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} /> <span>{item.rating}</span>{" "}
                    <span className="opacity-80">({item.totalRatings})</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-[1rem] md:w-[330px] h-10 overflow-hidden leading-snug font-semibold">
                  {item.title}
                </h2>

                {/* Breakdown */}
                <div className="bg-linear-to-b from-white/20 via-white/10 to-transparent text-sm px-3 py-1 rounded-md w-full mt-3 ">
                  {item.duration?.breakdown?.length > 0 && (
                    <div className="flex flex-wrap gap-3 py-1">
                      {item.duration.breakdown.map((b, index) => (
                        <div
                          key={b.location}
                          className={`flex items-center gap-3 pl-3 ${
                            index !== 0 ? "border-l border-gray-300" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2 text-xs font-medium">
                            <span>{b.days}D</span>
                            <span>{b.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Horizontal line */}
                <div className="w-full h-px bg-linear-to-r from-[#d9d9d9] via-white to-[#d9d9d9] mt-2"></div>

                {/* Pricing */}
                <div className="mt-4 flex items-center gap-1">
                  <span className="text-lg font-bold">
                    INR {item.discountPrice || item.price}
                  </span>

                  {item.discountPrice && (
                    <>
                      <span className="line-through text-white/70 text-sm">
                        INR {item.price}
                      </span>
                      <span className="bg-white/30 px-2 py-1 rounded text-xs">
                        SAVE INR {item.price - item.discountPrice}
                      </span>
                    </>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3 mt-4">
                  <a href="tel:+919999999999" onClick={(e)=>e.stopPropagation()} className="p-3 border rounded-lg">
                    <Phone size={16} />
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      setIsDialogOpen(true);
                    }}
                    className="flex-1 bg-white text-black py-3 rounded-lg font-semibold"
                  >
                    Request Callback
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

           <EnquiryForm        
            isOpen={isDialogOpen}
            price={799}
            onCancel={() => setIsDialogOpen(false)}
            onConfirm={() => setIsDialogOpen(false)}
            pageUrl={"/"}
        />
    </section>
  );
}
