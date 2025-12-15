"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Phone } from "lucide-react";
import EnquiryForm from "@/components/EnquiryFormPopUp";
import { useRouter } from "next/navigation";

export default function PackageGrid({ packages }: { packages: any[] }) {
  const [visible, setVisible] = useState(6);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {packages.slice(0, visible).map((item) => (
          <div
            key={item._id}
            className="relative w-[300px] h-[450px] md:w-[360px] md:h-[520px] rounded-2xl overflow-hidden shadow-lg group"
          >
            {/* IMAGE */}
            <Image
              src={item.gallery?.[0]?.image || "/images/DubaiEdit2.webp"}
              alt={item.gallery?.[0]?.alt || item.title}
              fill
              className="object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 z-10 bottom-20" onClick={()=>router.push(`/packages/${item.slug}`)}></div>


            {/* CONTENT */}
            <div className="absolute bottom-0 p-5 text-white text-sm z-10">
              <div className="flex justify-between">
                <p>
                  {item.duration.days} days & {item.duration.nights} nights
                </p>

                <div className="flex items-center gap-1">
                  <Star size={14} />
                  <span>{item.rating}</span>
                  <span className="opacity-80">({item.totalRatings})</span>
                </div>
              </div>

              <h2 className="text-sm font-semibold mt-2 line-clamp-2 w-[270px]  md:w-[330px]">
                {item.title}
              </h2>

              {/* BREAKDOWN */}
              {item.duration?.breakdown?.length > 0 && (
                <div className="bg-white/10 text-xs px-3 py-2 rounded-md mt-3">
                  <div className="flex flex-wrap gap-3">
                    {item.duration.breakdown.map(
                      (b: { location: string; days: number }, i: number) => (
                        <span key={i}>
                          {b.days}D {b.location}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* PRICE */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-lg font-bold">
                  INR {item.discountPrice || item.price}
                </span>

                {item.discountPrice && (
                  <>
                    <span className="line-through text-xs opacity-70">
                      INR {item.price}
                    </span>
                    <span className="bg-white/30 px-2 py-1 rounded text-xs">
                      SAVE INR {item.price - item.discountPrice}
                    </span>
                  </>
                )}
              </div>

              {/* CTA */}
              <div
                className="flex items-center gap-3 mt-4"
                onClick={(e) => e.preventDefault()}
              >
                <a
                  href="tel:+919999999999"
                  className="p-3 border rounded-lg"
                >
                  <Phone size={16} />
                </a>

                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="flex-1 bg-white text-black py-3 rounded-lg font-semibold cursor-pointer"
                >
                  Request Callback
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LOAD MORE */}
      {visible < packages.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisible((v) => v + 6)}
            className="px-6 py-3 bg-[#025378] text-white rounded-lg font-semibold cursor-pointer"
          >
            View More Packages
          </button>
        </div>
      )}

      {/* POPUP */}
      <EnquiryForm
        isOpen={isDialogOpen}
        price={799}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={() => setIsDialogOpen(false)}
        pageUrl="/packages"
      />
    </>
  );
}
