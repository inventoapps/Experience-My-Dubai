"use client";
import { useState } from "react";
import EnquiryForm from "./EnquiryFormPopUp";

export default function FinalCTA() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section
      className="
        relative 
        py-20 
        text-center 
        overflow-hidden 
        bg-black
      "
      aria-labelledby="final-cta-heading"
    >
      
      <div className="absolute left-10 top-20 space-y-6 z-10">
        <h2 className="text-white text-lg font-semibold tracking-wide text-start">
          Information
        </h2>

        <div className="flex flex-col gap-5 text-start">
          <a className="text-gray-300 hover:text-white text-sm transition" href="#">
            About us
          </a>
          <a className="text-gray-300 hover:text-white text-sm transition" href="#">
            Contact us
          </a>
          <a className="text-gray-300 hover:text-white text-sm transition" href="#">
            Privacy policy
          </a>
          <a className="text-gray-300 hover:text-white text-sm transition" href="#">
            Refund and Returns Policy
          </a>
          <a className="text-gray-300 hover:text-white text-sm transition" href="#">
            Cancellation Policy
          </a>
        </div>
      </div>

      <div className="relative z-10 px-6 max-w-3xl mx-auto">
        <h2
          id="final-cta-heading"
          className="
            text-3xl sm:text-5xl 
            font-extrabold 
            text-white 
            drop-shadow-xl 
            leading-tight
          "
        >
          Ready to Experience the Magic of Dubai?
        </h2>

        <p className="text-gray-200 mt-4 text-lg sm:text-xl leading-relaxed">
          Custom itineraries, luxury stays, desert adventures, and seamless travel planning —
          all crafted just for you.
        </p>

        <button
          className="
            mt-8 
            bg-accent  
            px-10 
            py-4 
            rounded-full 
            text-lg 
            font-semibold 
            shadow-xl 
            hover:bg-accent/90 
            transition 
            duration-300
            cursor-pointer
          "
          onClick={() => setIsDialogOpen(true)}
        >
          Book Your Dubai Trip Now
        </button>

        <p className="text-gray-300 mt-3 text-sm italic">
          Limited slots for this month — secure yours today!
        </p>
      </div>

      <div className="absolute right-10 top-20 z-10 space-y-6">
        <h2 className="text-white text-lg font-semibold tracking-wide">
          Follow Us
        </h2>

        <div className="flex gap-4 items-end">
          <a href="#" className="hover:opacity-80 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
              className="w-8 h-8 brightness-90"
              alt="Twitter"
            />
          </a>
          <a href="#" className="hover:opacity-80 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
              className="w-8 h-8"
              alt="Instagram"
            />
          </a>
        </div>

        <h2 className="text-white text-lg font-semibold tracking-wide pt-4">
          Payment channels
        </h2>

        
      </div>

      <div className="absolute bottom-4 right-10 z-10 text-right">
        <p className="text-sm text-gray-200 font-medium">ExperienceMyDubai © 2025</p>
        <p className="text-xs text-gray-300">Your trusted travel partner</p>
      </div>

      <EnquiryForm
        isOpen={isDialogOpen}
        price={799}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={() => setIsDialogOpen(false)}
      />
    </section>
  );
}
