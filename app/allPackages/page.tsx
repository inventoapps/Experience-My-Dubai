"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Star , Phone } from "lucide-react";
import Image from "next/image";
import EnquiryForm from "@/components/EnquiryFormPopUp";
import WhyChooseUs from "@/components/WhyChooseUs";
import FormSection from "@/components/FormSection";
import Banner from "@/components/Banner";
import HeroBottom from "@/components/HeroBottom";

export default function Blogs() {
  const [packages, setPackages] = useState<any>(null);
  const router = useRouter();
  const [visible, setVisible] = useState(6); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const res = await fetch("/api/package/get");
      const data = await res.json();

      if (res.ok) {
        setPackages(data.data);
      }
    };
    fetchAllBlogs();
  }, []);

  const loadMore = () => {
    setVisible((prev) => prev + 6); 
  };

  const route = "packages"

  return (
    <>
     <Navbar theme={"dark"}/>
     <Banner title={"All Dubai Tour Packages"}/>
     <HeroBottom/>

     <section className="px-6 py-16 max-w-7xl mx-auto mt-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-10">
        Explore Dubai Packages 
      </h2>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {packages?.slice(0, visible).map((item: any, idx: number) => (
          <div
              key={idx}
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
                <h2 className="text-[1rem] h-10 md:w-[330px] overflow-hidden leading-snug font-semibold">
                  {item.title}
                </h2>

                {/* Breakdown */}
                <div className="bg-linear-to-b from-white/20 via-white/10 to-transparent text-sm px-3 py-1 rounded-md inline-block mt-3 w-full">
                  {item.duration?.breakdown?.length > 0 && (
                    <div className="flex flex-wrap gap-3 py-1">
                      {item.duration.breakdown.map((b:{location:string , days:number}, index:number) => (
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

      {/* Load More Button */}
      {visible < (packages?.length || 0) && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            className="
              px-6 py-3 bg-[#025378] text-white 
              rounded-lg font-semibold hover:bg-[#01334a] transition
            "
          >
            View More Blogs
          </button>
        </div>
      )}

      <FormSection/>
      <WhyChooseUs/>

      <EnquiryForm
                    
                    isOpen={isDialogOpen}
                    price={799}
                    onCancel={() => setIsDialogOpen(false)}
                    onConfirm={() => setIsDialogOpen(false)}
                    pageUrl={"/allPackges"}
              />
    </section>

    </>
      );
}
