"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Check } from "lucide-react";
import EnquiryForm from "@/components/EnquiryFormPopUp";
import FAQSection from "@/components/FAQSection";
import Navbar from "@/components/Navbar";

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export default function ClientDetails({ pkg }: { pkg: any }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openDay, setOpenDay] = useState<number | null>(null);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    arrivalDate: "",
    comments: "",
  });

  const toggleDay = (i: number) => {
    setOpenDay(openDay === i ? null : i);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const enquiryData = {
      ...form,
      pageUrl:`/activity/${pkg.slug}`,
    };

    try {
      const res = await fetch("/api/enquiry/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiryData),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!pkg) return <p className="p-10 text-center">Package not found</p>;

  return (
    <>
    <Navbar theme="light"/>
    <main className="pb-20">

      {/* ===== HEADER ===== */}
      <section className="max-w-7xl mx-auto px-6 mt-22 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold">{pkg.title}</h1>

        <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
          <span>{pkg.location}</span> / <span>{pkg.city}</span> /{" "}
          <span>{pkg.country}</span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="bg-[#8f226c] text-white px-3 py-1 text-sm rounded-md font-semibold">
            {pkg.rating} / 5
          </span>

          <span className="text-gray-600 text-sm">
            ({pkg.totalRatings} Reviews)
          </span>

          <span className="flex items-center gap-1 text-gray-500">
            <Star size={16} fill="#fbbf24" />
            Verified Activity
          </span>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <h2 className="text-xl font-semibold mb-3">Gallery</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-80 sm:h-[450px] rounded-xl overflow-hidden">
            <img src={pkg.gallery[0]} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="h-40 rounded-xl overflow-hidden">
              <img src={pkg.gallery[1]} className="w-full h-full object-cover" />
            </div>
            <div className="h-40 rounded-xl overflow-hidden">
              <img src={pkg.gallery[2]} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="max-w-7xl mx-auto px-6 mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-14">
          <div>
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-gray-600">{pkg.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Highlights</h2>
            <ul className="space-y-3">
              {pkg.highlights.map((h: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#025378]">•</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
            {pkg.itinerary.map((day: ItineraryItem, i: number) => (
              <div
                key={i}
                className="border rounded-xl p-4 cursor-pointer"
                onClick={() => toggleDay(i)}
              >
                <strong>
                  {i + 1}. {day.title}
                </strong>
                {openDay === i && (
                  <p className="mt-2 text-gray-600">{day.description}</p>
                )}
              </div>
            ))}
          </section>
        </div>

        {/* FAQSection Reuseable component */}
        
        {pkg.faqs && pkg.faqs.length > 0 && (
        <section>
            
            <FAQSection faqs={pkg.faqs} />
        </section>
        )}

        {/* ===== SIDEBAR + FORM ===== */}
        <aside className="sticky top-24 space-y-6">
          <div className="border rounded-xl p-4 bg-white shadow-sm">
              {/* Price + Rating Row */}
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    INR {pkg?.discountPrice || pkg.price}
                    <span className="text-sm font-normal text-gray-500 ml-1">Per Adult</span>
                  </p>

               
                  <p className="text-gray-400 line-through text-sm">
                    INR {pkg.price.toLocaleString()}
                  </p>
                  
                </div>

                <div className="flex items-center gap-1">
                  <Star size={16} fill="#22C55E" className="text-green-600" />
                  <span className="text-green-600 font-semibold">{pkg.rating}</span>
                  <span className="text-gray-500 text-sm">({pkg.totalRatings})</span>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-3" />

              {/* Button */}
              <button
                onClick={()=>setIsDialogOpen(true)}
              
                className="
                  w-full bg-[#025378] text-white 
                  py-2.5 rounded-lg text-sm font-medium
                  hover:bg-[#014565] transition
                "
              >
                Send Enquiry
              </button>
            </div>

          <form
            className="space-y-4 bg-white border rounded-xl shadow p-6"
            onSubmit={handleSubmit}
          >
            <input
              name="name"
              placeholder="Full Name"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />
            <textarea
              name="comments"
              placeholder="Message"
              className="w-full border p-3 rounded"
              onChange={handleChange}
            />
            <button className="bg-[#025378] text-white w-full py-3 rounded-lg">
              Send Enquiry
            </button>
          </form>
        </aside>

        <EnquiryForm
          isOpen={isDialogOpen}
          price={pkg.discountPrice || pkg.price}
          onCancel={() => setIsDialogOpen(false)}
          onConfirm={() => setIsDialogOpen(false)}
          pageUrl={window.location.href}
        />
      </section>
    </main>
    </>
    
  );
}
