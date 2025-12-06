"use client"
import * as React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

interface IProps {
  packages: any[];
  setIsDialogOpen : (value: boolean)=>void;
  route : string;
  setPageUrl : (value:string)=>void;
}


export default function CarouselDemo({ packages , setIsDialogOpen , route , setPageUrl }: IProps) {
  const [visibleCards, setVisibleCards] = React.useState(1);


  React.useEffect(() => {
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
    <Carousel className="max-w-7xl mx-auto px-4 py-6 relative ">
      <CarouselContent>
        {packages.map((val, index) => (
          <CarouselItem
            key={index}
            className="
              basis-1/1
              sm:basis-1/2 
              lg:basis-1/3
            "
          >
            <div className="p-2">
              <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white">
                  <CardContent className="p-0 flex flex-col">

                    {/* IMAGE */}
                    <div className="w-full h-56 overflow-hidden">
                      <img
                        src={val.gallery[0]}
                        alt={val.title}
                        className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                      />
                    </div>

                    {/* BODY */}
                    <div className="p-4 space-y-3">

                      {/* Duration + Rating */}
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="font-medium">
                          {typeof val.duration === "number"
                            ? `${val.duration} hours`
                            : `${val.duration?.days} days & ${val.duration?.nights} nights`}
                        </span>

                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                          <Star size={15} fill="#22C55E" />
                          {val.rating || "4.5"}
                          <span className="text-gray-500 text-xs">({val.totalRatings || "100+"})</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="
                        font-semibold 
                        text-base sm:text-lg 
                      text-gray-900 
                        leading-tight 
                        line-clamp-2 
                        min-h-[3.2rem] ">
                        {val.title}
                      </h2>

                      {/* Breakdown Row */}
                      {typeof val.duration !== "number" && (
                        <div className="flex flex-wrap gap-3 mt-2">
                          {val.duration?.breakdown.map((item: any, index: number) => (
                            <div
                              key={item.location}
                              className={`flex items-center gap-3 pl-3 ${
                                index !== 0 ? "border-l border-gray-300" : ""
                              }`}
                            >
                              <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                                <span className="text-orange-500 font-bold">{item.days}D</span>
                                <span>{item.location}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Price Section */}
                      <div className="mt-3 space-y-1">
                        {val.discountPrice && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="line-through text-gray-400">₹{val.price}</span>
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded">
                              SAVE ₹{val.price - val.discountPrice}
                            </span>
                          </div>
                        )}

                        <div className="text-xl font-bold text-green-600">
                          ₹{val.discountPrice || val.price}
                          <span className="text-sm text-gray-500 font-normal"> / Adult</span>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center mt-4 justify-between gap-2">

                        <Link
                          href={`/${route}/${val.slug}`}
                          className="
                            w-1/2
                            text-center
                            py-2
                            text-sm
                            border border-gray-300
                            rounded-lg
                            hover:bg-gray-100
                            transition
                          "
                        >
                          View Details
                        </Link>

                        <button
                          onClick={() => {
                            setIsDialogOpen(true);
                            setPageUrl(`/${route}/${val.slug}`);
                          }}
                          className="
                            w-1/2 
                            bg-orange-500 
                            text-white 
                            font-medium 
                            text-sm 
                            py-2 
                            rounded-lg 
                            hover:bg-orange-600 
                            transition
                             cursor-pointer
                          "
                        >
                          Send Enquiry
                        </button>

                      </div>
                    </div>
                  </CardContent>
              </div>

            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

     {shouldShowButtons && 

        <CarouselPrevious
          className="
            hidden sm:flex
            absolute left-0 top-1/2 -translate-y-1/2 
            -translate-x-3 
            bg-white shadow-md border rounded-full w-8 h-8
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
        bg-white shadow-md border rounded-full w-8 h-8
      "
    />
     }

    

    </Carousel>
  );
}
