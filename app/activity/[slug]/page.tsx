"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Star , Check } from "lucide-react";
import EnquiryForm from "@/components/EnquiryFormPopUp";



interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export default function PackageDetailsPage() {
  const { slug } = useParams();
  const [isDialogOpen , setIsDialogOpen] = useState(false);
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [openDay , setOpenDay] =  useState<number | null>(null);;
  const [form , setForm] = useState({
      name : "",
      email : "",
      phone : "",
      guests :"",
      arrivalDate : "",
      comments : ""
    });

     const toggleDay = (i: number) => {
    setOpenDay(openDay === i ? null : i);
  };



  useEffect(() => {
    async function fetchPkg() {
      try {
        const res = await fetch(`/api/activity/get/${slug}`);
        const data = await res.json();
        setPkg(data.data);
      } catch (error) {
        console.log("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPkg();
  }, [slug]);

  const handleSubmit = async(e:React.FormEvent)=>{
       e.preventDefault();

     const enquiryData = {
      ...form,
      pageUrl: "sdfaf"
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


  if (loading) return <p className="p-10 text-center text-lg">Loading...</p>;
  if (!pkg) return <p className="p-10 text-center">Package not found</p>;

  const discount =
    pkg.discountPrice &&
    Math.round(((pkg.price - pkg.discountPrice) / pkg.price) * 100);

  return (
    <main className="pb-20">
      <Navbar theme="light" />

      <section className="max-w-7xl mx-auto px-6  mt-22 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold">{pkg.title}</h1>

        <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
          <span>{pkg.location}</span> / <span>{pkg.city}</span> /{" "}
          <span>{pkg.country}</span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="bg-[#8f226c] text-white px-3 py-1 text-sm rounded-md font-semibold">
            {pkg?.rating} / 5
          </span>

          <span className="text-gray-600 text-sm">
            ({pkg?.totalRatings} Reviews)
          </span>

          <span className="flex items-center gap-1 text-gray-500">
            <Star size={16} fill="#fbbf24" color="#fbbf24" />
            Verified Activity
          </span>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-8">
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

      <section className="max-w-7xl mx-auto px-6 mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2 space-y-14">

        
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">Activity Duration:</h2>
            <span className="bg-[#025378] text-white px-3 py-1.5 rounded-md font-semibold">
              {pkg.duration} hours
            </span>
          </div>

     
          <div>
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
          </div>

        
          <div>
            <h2 className="text-2xl font-bold mb-3">Highlights</h2>

            <ul className="space-y-3 text-gray-700">
              {pkg.highlights?.map((h: string, i: number) => (
                <li key={i} className="flex gap-2">
                    <span className="text-[#025378]">•</span>
                    <span>{h}</span>
                  </li>
              ))}
            </ul>
          </div>

         
          <div>
            <h2 className="text-2xl font-bold mb-3">What’s Included</h2>

            <div className="grid sm:grid-cols-2 gap-10">
           
              <div>
                <h3 className="font-semibold text-lg mb-2">Included</h3>
                <ul className="space-y-2 text-gray-700">
                  {pkg.inclusions?.map((item: string, i: number) => (

                    <li key={i} className="flex items-center gap-2 text-gray-800 text-sm mb-3">
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

             
              <div>
                <h3 className="font-semibold text-lg mb-2">Not Included</h3>
                <ul className="space-y-2 text-gray-700">
                  {pkg.exclusions?.map((item: string, i: number) => (
                    <li key={i} className="text-red-500">
                      ✘ {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>


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
                      
                      <span className="font-medium">
                         {i+1}.  {day.title}
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
                  w-full bg-[#025378] text-white 
                  py-2.5 rounded-lg text-sm font-medium
                  hover:bg-[#013e5b] transition
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
                className="bg-[#025378] hover:bg-[#003a55] text-white w-full py-3 rounded-lg font-semibold transition"
              >
                Send Enquiry
              </button>
            </form>
          </aside>

          <EnquiryForm
                    isOpen={isDialogOpen}
                    price={799}
                    onCancel={() => setIsDialogOpen(false)}
                    onConfirm={() => setIsDialogOpen(false)}
                    pageUrl={window.location.href}
                  
                  />

      </section>
    </main>
  );
}
