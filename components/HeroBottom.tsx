"use client";
import { Check } from "lucide-react";

export default function HeroBottom() {
  return (
    <div
      className="
        w-full bg-black text-white 
        py-3 
        sm:grid 
        grid-cols-2   /* 2 columns on mobile */
        md:grid-cols-4 /* 4 columns on medium+ */
        gap-4 
        text-center 
        font-medium
        hidden
        justify-between px-10


      "
    >
      {/* ITEM 1 */}
      <div className="flex justify-center items-center gap-2">
       <Check size={14} strokeWidth={3} className="text-emerald-500" />
        <h2 className="text-sm">Rating</h2>
      </div>

      {/* ITEM 2 */}
      <div className="flex justify-center items-center gap-2">
      <Check size={14} strokeWidth={3} className="text-emerald-500" />
       <h2 className="text-sm">100% Customised Trips</h2>
      </div>

      {/* ITEM 3 */}
      <div className="flex justify-center items-center gap-2">
      <Check size={14} strokeWidth={3} className="text-emerald-500" />

        <h2 className="text-sm">98% Visa Success Rate</h2>
      </div>

      {/* ITEM 4 */}
      <div className="flex justify-center items-center gap-2">
       <Check size={14} strokeWidth={3} className="text-emerald-500" />
        <h2 className="text-sm">24x7 Concierge</h2>
      </div>
    </div>
  );
}
