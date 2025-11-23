import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";

const slides = [
    "/images/Burj-Khalifa.webp",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
    "https://wallpaperaccess.com/full/1286186.jpg",
  ];

  
interface IProps {
  packages :any[];
}


export default function CarouselDemo({packages}: IProps) {
  return (
    <Carousel className="max-w-7xl mx-auto px-4">
      <CarouselContent>
        {packages.map((val, index) => (
          <CarouselItem 
            key={index}
            className="
              basis-1/2 
              sm:basis-1/3 
              md:basis-1/4 
              lg:basis-1/5
            "
          >
            <div className="p-2">
              <Card>
                <CardContent className="flex flex-col justify-evenly aspect-square gap-4 ">
                
                  <img src={val.gallery[0]} alt="" className="object-cover" />
                  <Link className="text-center" href={`/packages/${val.slug}`}>View More</Link>

                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  )
}
