"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu } from "lucide-react";

export default function Navbar({ theme }: { theme: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = scrolled ? "text-black" : theme === "light" ? "text-black" : "text-white";

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}
        ${textColor}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className={`font-bold text-xl ${textColor}`}
        >
          ExperienceMyDubai
        </Link>

        {!scrolled && (
          <div className={`hidden md:flex items-center space-x-8 text-sm ${textColor}`}>
            <Link href="" className="hover:opacity-70 transition">Explore Destinations</Link>
            <Link href="" className="hover:opacity-70 transition">Holiday Tour Packages</Link>

            <button className="px-5 py-1.5 border border-current rounded-md hover:opacity-70">
              Register
            </button>

            <button className="hover:opacity-70 transition">
              <Menu size={22} />
            </button>
          </div>
        )}

        <div className={`md:hidden ${textColor}`}>
          <Menu size={26} />
        </div>

        {scrolled && (
          <div className="relative w-[250px] sm:w-[350px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search…"
              className="pl-10 pr-4 py-2 w-full border rounded-lg bg-white text-black shadow border-gray"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
