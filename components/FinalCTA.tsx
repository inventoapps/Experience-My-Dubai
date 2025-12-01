"use client";
import { useState } from "react";
import EnquiryForm from "./EnquiryFormPopUp";
import {Instagram , Linkedin , Youtube , Twitter} from "lucide-react";



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
      
      <div className="relative sm:absolute top-54 left-3 sm:left-10 sm:top-20 space-y-6 z-10 ">
        <h2 className="text-white text-sm sm:text-lg font-semibold tracking-wide text-start">
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

      <div className="relative z-10 px-6 max-w-3xl mx-auto -mt-70 sm:mt-0 mb-20 sm:mb-0" >
        <h2
          id="final-cta-heading"
          className="
            text-2xl sm:text-5xl 
            font-extrabold 
            text-white 
            drop-shadow-xl 
            leading-tight
          "
        >
          Ready to Experience the Magic of Dubai?
        </h2>

        <p className="text-gray-200 mt-4 text-sm sm:text-xl leading-relaxed">
          Custom itineraries, luxury stays, desert adventures, and seamless travel planning —
          all crafted just for you.
        </p>

        <button
          className="
            mt-8 
            bg-accent  
            px-5
            sm:px-10 
            py-2
            sm:py-4 
            rounded-full 
            text-sm
            sm:text-lg 
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

      <div className=" relative sm:absolute -right-25 sm:right-10  -top-13 sm:top-20 z-10 space-y-6">
        <h2 className="text-white text-sm sm:text-lg font-semibold tracking-wide">
          Follow Us
        </h2>

        <div className="flex gap-4 justify-center text-gray-500">
          <a href="#" className="hover:opacity-80 transition">
            <Instagram/>

          </a>
          <a href="#" className="hover:opacity-80 transition">
            <Twitter/>
          </a>


          <a href="#" className="hover:opacity-80 transition">
            <Youtube/>
          </a>

          <a href="#" className="hover:opacity-80 transition">
            <Linkedin/>
          </a>


        </div>

        <h2 className="text-white text-sm sm:text-lg font-semibold tracking-wide pt-4">
          Payment channels
        </h2>

        
      </div>

      <div className="absolute bottom-4 right-6  z-10 text-right ">
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
