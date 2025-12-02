"use client";

import { HtmlHTMLAttributes, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import FAQSection from "@/components/FAQSection";
import { Star , Check  } from "lucide-react";
import EnquiryForm from "@/components/EnquiryFormPopUp";

interface DurationBreakdownItem {
  location: string;
  days: number;
}

interface DurationType {
  days: number;
  nights: number;
  breakdown: DurationBreakdownItem[];
}

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface PackageType {
  title: string;
  slug: string;
  location: string;
  city: string;
  country: string;
  duration: DurationType;
  price: number;
  discountPrice?: number;
  rating?: number;
  totalRatings?: number;
  gallery: string[];
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryItem[];
  faqs?: FAQItem[];
}

export default function PackageDetailsPage() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState<PackageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [openDay, setOpenDay] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const router = useRouter();
  const [isDialogOpen , setIsDialogOpen] = useState(false);

  const [form , setForm] = useState({
      name : "",
      email : "",
      phone : "",
      guests :"",
      arrivalDate : "",
      comments : ""
    });

    const handleSubmit = async(e:React.FormEvent)=>{
       e.preventDefault();

     const enquiryData = {
      ...form,
      pageUrl: window.location.href
     };

     try {
      const res = await fetch('/api/enquiry/',{
        method:"POST",
        headers:{'Content-Types':'application/json'},
        body: JSON.stringify(enquiryData),
      });

      if (res.ok) {
        router.push("/");
      }
      const data = await res.json();
      console.log(data.message);

    } catch (error) {
      console.log(error);
    }
    }

    const handleChange = async(e:React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>)=>{
       setForm({...form , [e.target.name]:e.target.value});
    }
  

  // Fetch package
  useEffect(() => {
    async function fetchPkg() {
      try {
        const res = await fetch(`/api/package/get/${slug}`);
        const data = await res.json();
        setPkg(data.data);
      } catch (err) {
        console.log("Error fetching package:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPkg();
  }, [slug]);

 

  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (!pkg) return <p className="p-8 text-center">Package not found</p>;

  const discount =
    pkg.discountPrice &&
    Math.round(((pkg.price - pkg.discountPrice) / pkg.price) * 100);

  const toggleDay = (i: number) => {
    setOpenDay(openDay === i ? null : i);
  };

  return (
    <>
      <Navbar theme="light" />

      <main className="max-w-7xl mx-auto px-6 pb-20 pt-20 space-y-5">

        {/* Header Section of package */}
        <section className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold">{pkg.title}</h1>

          <div className="flex flex-wrap gap-2 text-sm text-gray-500">
            <span>{pkg.location}</span>
            <span>/ {pkg.city}</span>
            <span>/ {pkg.country}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
            <span className="bg-green-600 text-white px-3 py-1 rounded-md font-semibold">
              {pkg.rating || 0} / 5
            </span>
            <span>({pkg.totalRatings || "100"}+ Reviews)</span>
            <span className="flex items-center gap-1 text-gray-500">
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              Popular choice
            </span>
          </div>
        </section>

        {/* 3 phot shown in Gallery */}

        <section className="max-w-7xl mx-auto  mt-8">
          <h2 className="text-xl font-semibold mb-3">Gallery</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 h-80 sm:h-[450px] rounded-xl overflow-hidden">
              <img src={pkg.gallery[0]} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-40 sm:h-54 rounded-xl overflow-hidden">
                <img src={pkg.gallery[1]} className="w-full h-full object-cover" />
              </div>
              <div className="h-40 sm:h-54 rounded-xl overflow-hidden">
                <img src={pkg.gallery[2]} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
      </section>

      {/* Duration Design */}

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Duration</h2>

          <div className="flex flex-wrap gap-4 items-center">
            <span className="inline-flex items-center rounded-full bg-yellow-700 px-4 py-1.5 text-sm sm:text-base font-medium text-white">
              {pkg.duration?.days} D / {pkg.duration?.nights} N
            </span>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              {pkg.duration?.breakdown?.map(
                (item: DurationBreakdownItem, index: number) => (
                  <div
                    key={`${item.location}-${index}`}
                    className={`flex items-center gap-4 pl-4 ${
                      index !== 0 ? "border-l-2 border-gray-300" : ""
                    }`}
                  >
                    <div className="flex items-center rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-900 shadow-sm bg-white">
                      <div className="text-xl sm:text-2xl text-gray-600 font-bold">
                        {item.days}
                      </div>
                      <div className="flex flex-col ml-2">
                        <span className="text-[10px] tracking-wide text-slate-500">
                          Days in
                        </span>
                        <span className="text-[11px]">{item.location}</span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Overview Section */}

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-14">
            <section>
              <h2 className="text-2xl font-bold mb-3">Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                {pkg.description}
              </p>
         </section>

         {/* Highlights Section*/}

            <section>
              <h2 className="text-2xl font-bold mb-3">Highlights</h2>
              <ul className="space-y-2 text-gray-700">
                {pkg.highlights?.map((h: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-orange-600">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>


            {/* Included & Excluded Section */}

            <section>
              <h2 className="text-2xl font-bold mb-3">What's Included</h2>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">Included</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {pkg.inclusions?.map((inc: string, i: number) => (
                     <li key={i} className="flex items-center gap-2 text-gray-800 text-sm mb-3">
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                      <span>{inc}</span>
                    </li>



                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Not Included</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {pkg.exclusions?.map((exc: string, i: number) => (
                      <li key={i} className="text-red-600">
                        ✘ {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>


            {/* Itinerary Section */}

            <section>
              <h2 className="text-2xl font-bold mb-6">Itinerary</h2>

              <div className="space-y-4">
                {pkg.itinerary?.map((day: ItineraryItem, i: number) => (
                  <div
                    key={i}
                    className="border rounded-xl p-4 cursor-pointer hover:shadow-sm transition"
                    onClick={() => toggleDay(i)}
                  >
                    <div className="flex gap-4 ">
                      <span className="w-10 h-10 sm:rounded-full sm:border-2 border-green-400 flex items-center justify-center font-bold text-sm">
                        {day.day}
                      </span>
                      <span className="font-medium">
                        Day {day.day} — {day.title}
                      </span>
                    </div>

                    {openDay === i && (
                      <p className="mt-3 text-gray-600 text-sm sm:text-base">
                        {day.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* FAQSection Reuseable component */}

            {pkg.faqs && pkg.faqs.length > 0 && (
              <section>
                
                <FAQSection faqs={pkg.faqs} />
              </section>
            )}
          </div>


          {/* Side Enquiry Section */}


          <aside className=" w-full max-w-md lg:ml-auto h-fit lg:sticky lg:top-24 space-y-6">
           

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
                  w-full bg-orange-500 text-white 
                  py-2.5 rounded-lg text-sm font-medium
                  hover:bg-orange-600 transition
                "
              >
                Send Enquiry
              </button>
            </div>

            <form className="space-y-4 bg-white border rounded-xl shadow p-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-semibold">Full Name</label>
                <input
                  className="w-full border rounded p-3 mt-1"
                  placeholder="Your name"
                  required
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border rounded p-3 mt-1"
                  placeholder="+91 Mobile Number"
                  required
                  name="phone"
                  onChange={handleChange}
                  value={form.phone}
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full border rounded p-3 mt-1"
                  placeholder="your@email.com"
                  required
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Message</label>
                <textarea
                  className="w-full border rounded p-3 mt-1"
                  placeholder="Message"
                  required
                  name="comments"
                  onChange={handleChange}
                  value={form.comments}
                />
              </div>

              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white w-full py-3 rounded-lg font-semibold transition"
              >
                Send Enquiry
              </button>
            </form>
          </aside>
        </section>
        <EnquiryForm
          isOpen={isDialogOpen}
          price={799}
          onCancel={() => setIsDialogOpen(false)}
          onConfirm={() => setIsDialogOpen(false)}
          pageUrl={window.location.href}
        
        />
        
      </main>
    </>
  );
}
