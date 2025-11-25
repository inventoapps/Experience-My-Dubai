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
}



export default function CarouselDemo({ packages , setIsDialogOpen }: IProps) {
   
  return (
    <Carousel className="max-w-7xl mx-auto px-4 py-6 ">
      <CarouselContent>
        {packages.map((val, index) => (
          <CarouselItem
            key={index}
            className="
              basis-1 
              sm:basis-1/2 
              lg:basis-1/3
            "
          >
            <div className="p-2">
              <Card className="overflow-hidden rounded-xl shadow-sm border">
                <CardContent className="p-0 flex flex-col gap-3">

             
                  <div className="w-full -mt-7 h-52 overflow-hidden">
                    <img
                      src={val.gallery[0]}
                      alt={val.title}
                      className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                    />
                  </div>

                
                  <div className="p-4 flex flex-col gap-2">

                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <p>
                        {val.duration?.days} Days / {val.duration?.nights} Nights
                      </p>

                      <span className="flex items-center gap-1 text-yellow-500 font-medium">
                        <Star size={16} fill="#fbbf24" /> <span className="text-gray-600"> {val.rating || "4.5"} ({val?.totalRatings || "100+"})</span>
                      </span>
                    </div>

             
                    <h2 className="font-semibold text-lg line-clamp-2">
                      {val.title}
                    </h2>


                    <div className=" flex flex-wrap gap-3">
        
                      {val.duration?.breakdown.map((item: any, index: number) => (
                        <div
                          key={item.location}
                          className={`flex items-center gap-4 pl-4 ${
                            index !== 0 ? "border-l-2 border-gray-400" : ""
                          }`}
                        >
                          <div className="flex items-center rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-slate-900 shadow-sm gap-4">
                            
                            <div className="text-sm text-orange-500 font-bold">{item.days} D</div>

                            <div className="flex flex-col ">
                              <div className="text-[10px]">{item.location}</div>
                            </div>

                          </div>
                        </div>
                    ))}
                    </div>

                   
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-bold text-green-600">
                        ₹{val.discountPrice || val.price}
                      </span>

                      <span className="text-gray-500 text-sm">/ Adult</span>

                      {val.discountPrice && (
                        <>
                          <span className="line-through text-gray-400 text-sm">
                            ₹{val.price}
                          </span>

                          <span className="text-sm text-green-500 font-semibold">
                            (
                            {Math.round(
                              ((val.price - val.discountPrice) / val.price) * 100
                            )}
                            % OFF)
                          </span>
                        </>
                      )}
                   </div>

                    

                
                    <div className="mt-6 flex justify-around">
                      <Link
                        href={`/packages/${val.slug}`}
                        className="
                          inline-block 
                          px-4 py-1.5 
                          text-sm 
                          rounded-md
                          border border-gray-300 
                          hover:bg-gray-100 
                          transition
                        "
                      >
                        View More
                      </Link>

                      <button
                       onClick={()=>setIsDialogOpen(true)}
                       className="inline-block 
                          px-4 py-1.5 
                          text-sm 
                          rounded-md 
                          bg-
                          border border-gray-300 
                          hover:bg-gray-100 
                          transition"
                       >
                          Send Enquire
                        
                        </button>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
