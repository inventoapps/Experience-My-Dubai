"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import FAQSection from "@/components/FAQSection";
import { Star } from "lucide-react";

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

  useEffect(() => {
    if (!pkg?.gallery?.length) return;

    const total = Math.min(pkg.gallery.length, 3);
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(timer);
  }, [pkg?.gallery]);

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

      <main className="max-w-7xl mx-auto px-6 pb-20 pt-20 space-y-16">
        <section className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold">{pkg.title}</h1>

          <div className="flex flex-wrap gap-2 text-sm text-gray-500">
            <span>{pkg.location}</span>
            <span>/ {pkg.city}</span>
            <span>/ {pkg.country}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
            <span className="bg-green-600 text-white px-3 py-1 rounded-md font-semibold">
              {pkg.rating ?? 4.5} / 5
            </span>
            <span>({pkg.totalRatings ?? "100+"} Reviews)</span>
            <span className="flex items-center gap-1 text-gray-500">
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              Popular choice
            </span>
          </div>
        </section>

        <section>
          <button className="border border-gray-300 py-1 px-3 rounded-lg mb-4 text-sm">
            Gallery
          </button>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
=            <div className="relative w-full lg:w-[65%] h-[280px] sm:h-[380px] md:h-[460px] rounded-xl overflow-hidden">
              <img
                src={pkg.gallery[activeImageIndex] || pkg.gallery[0]}
                alt={pkg.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            <div className="flex flex-col w-full lg:w-[35%] gap-4 sm:gap-6">
              {pkg.gallery.slice(0, 3).map((img: string, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-full h-[140px] sm:h-[180px] md:h-56 rounded-xl overflow-hidden border transition ${
                    activeImageIndex === idx
                      ? "border-orange-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${pkg.title} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

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

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-14">
            <section>
              <h2 className="text-2xl font-bold mb-3">Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                {pkg.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">Highlights</h2>
              <ul className="space-y-2 text-gray-700">
                {pkg.highlights?.map((h: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-orange-600">✔</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3">What's Included</h2>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">Included</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {pkg.inclusions?.map((inc: string, i: number) => (
                      <li key={i}>✔ {inc}</li>
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

            <section>
              <h2 className="text-2xl font-bold mb-6">Itinerary</h2>

              <div className="space-y-4">
                {pkg.itinerary?.map((day: ItineraryItem, i: number) => (
                  <div
                    key={i}
                    className="border rounded-xl p-4 cursor-pointer hover:shadow-sm transition"
                    onClick={() => toggleDay(i)}
                  >
                    <div className="flex gap-4 items-center">
                      <span className="w-10 h-10 rounded-full border-2 border-green-400 flex items-center justify-center font-bold text-sm">
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

            {pkg.faqs && pkg.faqs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">FAQs</h2>
                <FAQSection faqs={pkg.faqs} />
              </section>
            )}
          </div>

          <aside className="bg-white border rounded-xl shadow p-6 w-full max-w-md lg:ml-auto h-fit lg:sticky lg:top-24 space-y-6">
            <div>
              <p className="text-sm text-gray-500">Price Per Person</p>
              <div className="flex items-end gap-3 mt-2">
                <span className="text-2xl sm:text-3xl font-bold text-green-600">
                  ₹{pkg.discountPrice || pkg.price}
                </span>

                {discount && (
                  <>
                    <span className="line-through text-gray-400 text-sm">
                      ₹{pkg.price}
                    </span>
                    <span className="text-sm text-green-600 font-semibold">
                      ({discount}% OFF)
                    </span>
                  </>
                )}
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Full Name</label>
                <input
                  className="w-full border rounded p-3 mt-1"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border rounded p-3 mt-1"
                  placeholder="+91 Mobile Number"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full border rounded p-3 mt-1"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white w-full py-3 rounded-lg font-semibold transition"
              >
                Book Now
              </button>
            </form>
          </aside>
        </section>
      </main>
    </>
  );
}
