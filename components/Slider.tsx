"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface IProps {
  packages: any[];
  setIsDialogOpen : (value: boolean)=>void;
  route : string;
  setPageUrl : (value:string)=>void;
}

export default function TravelSlider({packages , setIsDialogOpen , route , setPageUrl}:IProps) {
  const slides = [
    {
      img: "/images/DubaiEditImage.webp",
      title: "Scenic Iceland With Diamond Circle",
      days: "7 days & 6 nights",
      rating: 4.5,
      reviews: 40,
      price: "2,30,000",
    },
    {
      img: "/images/1afodj3tf43zhn9xk9eypbdowfxc_Dubai Highlights _ Skyline, Sandscapes and Sunsets.avif",
      title: "Journey Through Iceland Hidden Treasures",
      days: "10 days & 9 nights",
      rating: 4.5,
      reviews: 23,
      price: "3,38,000",
    },
    {
      img: "/images/DubaiEdit3.webp",
      title: "Highlights Of Iceland With Southern Shores",
      days: "5 days & 4 nights",
      rating: 5.0,
      reviews: 614,
      price: "2,55,537",
    },
    {
      img: "/images/DubaiEdit4.webp",
      title: "Arctic Northern Lights Expedition",
      days: "6 days & 5 nights",
      rating: 4.8,
      reviews: 112,
      price: "1,95,000",
    },
  ];

  const [visibleCards, setVisibleCards] = useState(1);
  const router = useRouter();

  useEffect(() => {
      const updateVisible = () => {
        if (window.innerWidth < 640) setVisibleCards(1); // mobile
        else if (window.innerWidth < 1024) setVisibleCards(2); // tablet
        else setVisibleCards(3); // desktop
      };
  
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);
  
  const shouldShowButtons = packages.length > visibleCards;

  return (
    <Carousel className="max-w-290 mx-auto px-4 py-6 relative" >

      {/* IMPORTANT FOR SHADCN: MUST WRAP ITEMS IN CarouselContent */}
      <CarouselContent className="flex ">
        {packages.map((item, idx) => (
          <CarouselItem
            key={idx}
            className="basis-1/1 sm:basis-1/2 lg:basis-1/3"
          >
            <div className="relative w-[300px] h-[450px] md:w-[360px] md:h-[520px] rounded-2xl overflow-hidden shadow-lg cursor-pointer" 
            >

              {/* Background Image */}
              <div className="absolute inset-0">
                <Image src={item.gallery[0].image ||"/images/DubaiEdit2.webp"} alt={"this"} fill className="object-cover" />
              </div>

              {/* Gradient */}
              <div className="absolute inset-0 z-10 bottom-20" onClick={()=>router.push(`/${route}/${item.slug}`)}></div>
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent "></div>


              {/* Content */}
              <div className="absolute bottom-0 p-5 text-white text-sm" >
                <div className="flex justify-between">
                  <p>{item?.duration.days} days & {item?.duration.nights} nights</p>

                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} /> <span>{item.rating}</span>{" "}
                    <span className="opacity-80">({item.totalRatings})</span>
                  </div>
                </div>

                <h2 className="text-[1rem] h-[1.2rem] md:w-[330px] leading-snug overflow-hidden">
                  {item.title}
                </h2>

                {/* Duration */}

                <div className="bg-linear-to-b from-white/20 via-white/10 to-transparent text-sm px-3 py-1 rounded-md inline-block mt-3 w-full">
                  { item.duration !== "number" && (
                        <div className="flex flex-wrap gap-3 py-1 bg-linear-to-bl
">
                          {item.duration?.breakdown.map((item: any, index: number) => (
                            <div
                              key={item.location}
                              className={`flex items-center gap-3 pl-3 ${
                                index !== 0 ? "border-l border-gray-300" : ""
                              }`}
                            >
                              <div className="flex items-center gap-2 text-xs font-medium">
                                <span className="">{item.days}D</span>
                                <span>{item.location}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                </div>

                <div className="w-full h-px bg-linear-to-r from-[#d9d9d9] via-white to-[#d9d9d9] mt-2"></div>

                {/* Pricing */}
                <div className="mt-4 flex items-center gap-1">
                  <span className="sm:text-lg text-sm font-bold">INR {item.discountPrice || item.price}</span>
                  <span className="line-through text-white/70 text-sm">
                    INR {item.price}
                  </span>
                  <span className="bg-white/30 px-2 py-1 rounded text-xs">
                    SAVE INR {item.price - item.discountPrice}
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3 mt-4">
                  <a href="tel:+919410599250" className="p-3 border rounded-lg">
                    <Phone size={16} />
                  </a>

                  <button
                  onClick={(e) => {
                     e.stopPropagation(); 
                     e.nativeEvent?.stopImmediatePropagation();   
                    setIsDialogOpen(true); 
                  }}
                  className="flex-1 bg-white text-black py-3 rounded-lg font-semibold cursor-pointer"
                >
                  Request Callback
                </button>

                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation buttons (shadcn compliant) */}
          {shouldShowButtons && 
     
             <CarouselPrevious
               className="
                 hidden sm:flex
                 absolute left-0 top-1/2 -translate-y-1/2 
                 -translate-x-3 
                 bg-[#025378] shadow-md border rounded-full w-8 h-8 text-white
               "
             />
          } 
     
     {
           shouldShowButtons && 
           <CarouselNext
           className="
             hidden sm:flex
             absolute right-0 top-1/2 -translate-y-1/2 
             translate-x-3
             bg-[#025378] shadow-md border rounded-full w-8 h-8 text-white
           "
         />
          }

    </Carousel>
  );
}
