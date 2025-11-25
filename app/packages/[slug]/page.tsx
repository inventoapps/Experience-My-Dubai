"use client";
import FAQSection from "@/components/FAQSection";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default  function PackageDetailsPage() {
  const { slug } =  useParams();

  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openDay, setOpenDay] = useState<number | null>(null);
  const [images, setImages] = useState(null);
  const [index, setIndex] = useState(0);


  useEffect(() => {
    async function fetchPkg() {
      try {
        const res = await fetch(`/api/package/get/${slug}`);
        const data = await res.json();
        setPkg(data.data);
        setImages(data.data?.gallery)

      } catch (err) {
        console.log("Error fetching package:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPkg();
  }, [slug]);



  

  useEffect(()=>{
     const timer = setInterval(()=>{
       setIndex((prev)=>(prev+1)%3)
     },4000)

      return () => clearInterval(timer);
  },[])



  

  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (!pkg) return <p className="p-8 text-center">Package not found</p>;

  // Toggle itinerary
  const toggle = (i: number) => {
    setOpenDay(openDay === i ? null : i);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-16">
      <Navbar theme="light" />

   
      <section className="mt-14">
        <h1 className="text-3xl sm:text-4xl font-bold">{pkg.title}</h1>

        <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-2">
          <span>{pkg.location}</span>
          <span>/ {pkg.city}</span>
          <span>/ {pkg.country}</span>
        </div>
      </section>

  <section>
    <button className="border-2 border-gray-400 py-1 px-3 rounded-lg mb-4">
      Gallery
    </button>

  <div className="flex flex-col lg:flex-row gap-6">

   
          <div className="relative w-full lg:w-[65%] h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden">
            <img
              src={pkg.gallery[0]}
              alt={pkg.title}
              // fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col w-full lg:w-[35%] gap-6">

            <div className="relative w-full h-[180px] sm:h-[200px] md:h-60 rounded-xl overflow-hidden">
              <img
                src={pkg.gallery[1]}
                alt={pkg.title}
                // fill
                className="object-cover"
              />
            </div>

            <div className="relative w-full h-[180px] sm:h-[200px] md:h-60 rounded-xl overflow-hidden">
              <img
                src={pkg.gallery[2]}
                alt={pkg.title}
                // fill
                className="object-cover"
              />
            </div>

          </div>

  </div>
</section>

  <h2 className="text-2xl font-bold">Duration</h2>

  <div className="flex">
      <div>
        <span className="inline-flex items-center rounded-full bg-yellow-700 px-3 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur">
          {pkg.duration?.days} D / {pkg.duration?.nights} N
        </span>
      </div>

      
      <div className=" -mt-7 abbg-linear-to-t from-black/75 via-black/40 to-transparent p-3 sm:p-4 flex flex-wrap gap-3">
        
        {pkg.duration?.breakdown.map((item: any, index: number) => (
          <div
            key={item.location}
            className={`flex items-center gap-4 pl-4 ${
              index !== 0 ? "border-l-2 border-gray-400" : ""
            }`}
          >
            <div className="flex items-center rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-slate-900 shadow-sm gap-4">
              
              <div className="text-3xl text-gray-500 font-bold">{item.days}</div>

              <div className="flex flex-col ">
                <div className="text-[10px] tracking-wide text-slate-500">
                  Days in
                </div>
                <div className="text-[10px]">{item.location}</div>
              </div>

            </div>
          </div>
       ))}
      </div>
  </div>

 <section className="flex justify-between">

   <section className="space-y-16 ">

      <section>
        <h2 className="text-2xl font-bold mb-3">Overview</h2>
        <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
      </section>


      <section>
        <h2 className="text-2xl font-bold mb-3">Highlights</h2>
        <ul className="space-y-2 text-gray-600">
          {pkg.highlights?.map((h: string, i: number) => (
            <li key={i}>✔ {h}</li>
          ))}
        </ul>
      </section>

     </section>



     <form className="bg-white border rounded-xl shadow p-6 w-full max-w-md space-y-4">
            <div>
              <label className="text-sm font-semibold">Full Name</label>
              <input
                className="w-full border rounded p-3"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Phone Number</label>
              <input
                type="tel"
                className="w-full border rounded p-3"
                placeholder="+91 Mobile Number"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                className="w-full border rounded p-3"
                placeholder="your@email.com"
                required
              />
            </div>

         
            <div className="bg-gray-50 p-4 rounded border">
              <p className="text-sm text-gray-500">Price Per Person</p>

              <div className="flex items-end gap-3 mt-2">
                <span className="text-xl font-bold text-green-600">
                  ₹{pkg.discountPrice || pkg.price}
                </span>

                {pkg.discountPrice && (
                  <>
                    <span className="line-through text-gray-400 text-sm">
                      ₹{pkg.price}
                    </span>
                    <span className="text-sm text-green-500 font-semibold">
                      ({Math.round(
                        ((pkg.price - pkg.discountPrice) / pkg.price) * 100
                      )}
                      % OFF)
                    </span>
                  </>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-lg font-semibold"
            >
              Book Now
            </button>
     </form>

    </section>


    <section>
        <h2 className="text-2xl font-bold mb-3">What's Included</h2>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Included</h3>
            <ul className="space-y-2 text-gray-600">
              {pkg.inclusions?.map((inc: string, i: number) => (
                <li key={i}>✔ {inc}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Not Included</h3>
            <ul className="space-y-2 text-gray-600">
              {pkg.exclusions?.map((exc: string, i: number) => (
                <li key={i}>✘ {exc}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>



      
      

      <section>
        <h2 className="text-2xl font-bold mb-6">Itinerary</h2>

        <div className="space-y-4">
          {pkg.itinerary?.map((day: any, i: number) => (
            <div
              key={i}
              className="border rounded-xl p-4 cursor-pointer"
              onClick={() => toggle(i)}
            >
              <div className="flex gap-4 items-center">
                <span className="w-10 h-10 rounded-full border-2 border-green-400 flex items-center justify-center font-bold">
                  {day.day}
                </span>
                <span className="font-medium">
                  Day {day.day} — {day.title}
                </span>
              </div>

              {openDay === i && (
                <p className="mt-3 text-gray-600">{day.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>


      <FAQSection faqs={pkg.faqs} />
    </main>
  );
}
