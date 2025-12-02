"use client";
import { Check } from "lucide-react";

export default function HeroBottom() {
  return (
    <div
      className="
        w-full bg-black text-white 
        py-4 px-4 
        sm:grid 
        grid-cols-2   /* 2 columns on mobile */
        md:grid-cols-4 /* 4 columns on medium+ */
        gap-4 
        text-center 
        font-medium
        hidden

      "
    >
      {/* ITEM 1 */}
      <div className="flex justify-center items-center gap-2">
        <span className="h-6 w-6 rounded-full bg-emerald-500 inline-flex items-center justify-center shrink-0 ">
          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
        </span>

        <h2>Rating</h2>
      </div>

      {/* ITEM 2 */}
      <div className="flex justify-center items-center gap-2">
        <span className="h-6 w-6 rounded-full bg-emerald-500 inline-flex items-center justify-center shrink-0">
          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
        </span>

        <h2>100% Customised Trips</h2>
      </div>

      {/* ITEM 3 */}
      <div className="flex justify-center items-center gap-2">
        <span className="h-6 w-6 rounded-full bg-emerald-500 inline-flex items-center justify-center shrink-0">
          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
        </span>

        <h2>98% Visa Success Rate</h2>
      </div>

      {/* ITEM 4 */}
      <div className="flex justify-center items-center gap-2">
        <span className="h-6 w-6 rounded-full bg-emerald-500 inline-flex items-center justify-center shrink-0">
          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
        </span>

        <h2>24x7 Concierge</h2>
      </div>
    </div>
  );
}
