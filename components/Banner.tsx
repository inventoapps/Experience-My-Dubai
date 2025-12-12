"use client"

import { useState } from "react";
import { TypeAnimation } from "react-type-animation";



export default function Banner(props:{title:string}){
    
     const [index , setIndex] = useState(0);
     const images = [
    {
      src: "/images/Burj-Khalifa.webp",
      alt: "Night view of Downtown Dubai with the illuminated Burj Khalifa",
    },
    {
      src: "/images/Palm-Jumeirah-Dubai.webp",
      alt: "Aerial view of Palm Jumeirah in Dubai",
    },
    {
      src: "/images/Dubai-Marina-Skyline.webp",
      alt: "Stunning sunset view of the Dubai Marina skyline",
    },
  ];
    return (
         <section className="relative h-[65vh] sm:h-[70vh] md:h-[60vh] w-full overflow-hidden">
                 
                       <div className="absolute inset-0">
                         {images.map((img, i) => (
                           <div
                             key={i}
                             className={`
                               absolute inset-0 bg-cover bg-center 
                               transition-opacity duration-1500 ease-in-out
                               ${i === index ? "opacity-100" : "opacity-0"}
                             `}
                             style={{ backgroundImage: `url(${img.src})` }}
                           />
                         ))}
                 
                        
                         <div className="absolute inset-0 bg-black/50"></div>
                       </div>
                 
                     
                       <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 gap-3">
                         
                         <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-xl">
                              <span className="text-[#025378] font-bold"> Experience <span className="text-[#8f226c]">My</span> Dubai</span>{" "}
                                <TypeAnimation
                                    sequence={[props.title, 2000]}
                                    speed={50}
                                    cursor={false}
                                />
                         </h2>
                 
                         
                       </div>
                 </section>
    )
}