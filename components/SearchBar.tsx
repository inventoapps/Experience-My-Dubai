"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

type PackageResult = {
  _id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  gallery:string[];
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PackageResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length > 1) fetchResults(query);
      else setResults([]);
    }, 100);

    return () => clearTimeout(delay);
  }, [query]);

  async function fetchResults(q: string) {
    const res = await fetch(`/api/search?q=${q}`);
    const data = await res.json();
    setResults(data);
    setOpen(true);
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      router.push(`/packages/${results[activeIndex].slug}`);
      setOpen(false);
    }
  }

  

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[300px] sm:max-w-[450px] ">
      <div className="bg-white rounded-xl border-2 border-green-300 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />

        <input
          type="text"
          placeholder="Search packages"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-4 py-3 text-black rounded-xl outline-none"
        />
      </div>

      {/* Suggestions dropdown */}
      {open && results.length > 0 && (
        <div className="absolute top-full  bg-white shadow-xl mt-1 rounded-xl w-full py-2 overflow-auto ">
          {results.map((item, i) => (
            <div
              key={item._id}
              onClick={() => router.push(`/packages/${item.slug}`)}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                i === activeIndex ? "bg-gray-200" : ""
              }`}
            >
              {item.gallery && (
                <img src={item.gallery[0]} className="w-12 h-12 rounded object-cover" />
              )}
              <span className="text-sm">{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
