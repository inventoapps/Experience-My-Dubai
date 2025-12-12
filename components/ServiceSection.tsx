"use client"
import { Star } from "lucide-react";
import EnquiryForm from "./EnquiryFormPopUp";
import { useState } from "react";
export default function Services(){
  const services = [
  {
    category: "Hotels",
    title: "Top Hotels in Dubai",
    description: "Premium & budget stay options",
    rating: 5,
    image: "/images/hotel.jpg",
    price: 7999,
    status:"Available"
  },
  {
    category: "Transport",
    title: "Transport Services",
    description: "Car, Bus & Tempo Traveller Hire",
    rating: 5,
    image: "/images/transport.jpg",
    price: 999,
    status:"Available"
  },
  {
    category: "Guide",
    title: "Tour Guide Services",
    description: "Professional certified guides",
    rating: 5,
    image: "/images/guide.jpg",
    price: 5999,
    status:"Available"
  },
];
  const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
        <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-0 bg-accent/5">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                 Tour Services
               </h2>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((item, index) => (
                <div key={index} className="rounded-lg shadow-md overflow-hidden border bg-white">
                {/* IMAGE SECTION */}
                <div className="relative w-full h-40">
                    <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    />

                    {/* STATUS BADGE */}
                    <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow">
                    {item.status}
                    </span>
                </div>

                {/* CONTENT SECTION */}
                <div className="p-4 ">
                    <h3 className="text-lg font-semibold">{item.title}</h3>

                    <p className="mt-3">
                        {item.description}
                    </p>

                    <div className="w-full justify-between items-center mt-4">
                        
                        <div className="text-sm ">
                    
                            <p className="font-medium">Starting From</p>

                            {/* Rating */}
                            <p className="flex items-center gap-1">
                                Rating:
                                {Array(item.rating)
                                .fill(0)
                                .map((_, i) => (
                                    <span key={i}><Star size={14} fill="#ff9900" className="text-[#ff9900]" /></span>
                                ))}
                        </p>
                       </div>
                         <div className="text-right text-[#025378] font-semibold">
                          Rs. {item.price}
                         </div>

                    </div>

                    

                   
                    {/* BUTTON */}
                    <button onClick={()=>setIsDialogOpen(true)} className="mt-3 bg-[#025378] text-white w-full py-2 rounded-md font-semibold cursor-pointer">
                     ENQUIRY NOW
                    </button>
                 </div>
            </div>
            ))}
        </div>

           </div>


        <EnquiryForm
                      
        isOpen={isDialogOpen}
        price={799}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={() => setIsDialogOpen(false)}
        pageUrl={"/"}
        />
        </>
    )
}