import { Check } from "lucide-react";
export default function HeroBottom() {
  return (
    <div
      className="
        w-full 
        bg-black 
        text-white 
        py-4 
        px-4 
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-4 
        gap-4 
        text-center 
        font-medium
      "
    >
      <h2 className="">
      {/* <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white mx-1">
        <Check className="h-3 w-3" />
      </span> */}
      Rating
      </h2>

      <h2>100% Customised Trips</h2>
      <h2>98% Visa Success Rate</h2>
      <h2>24x7 Concierge</h2>
    </div>
  );
}
