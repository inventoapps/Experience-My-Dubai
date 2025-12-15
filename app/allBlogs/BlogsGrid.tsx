"use client";

import { useState } from "react";
import Link from "next/link";

export default function BlogGrid({ blogs }: { blogs: any[] }) {
  const [visible, setVisible] = useState(3);

  return (
    <>
      {/* BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.slice(0, visible).map((val: any) => (
          <Link
            href={`/blogs/${val.slug}`}
            key={val._id}
            className="
              group bg-white rounded-2xl shadow-lg border overflow-hidden 
              hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300
            "
          >
            {/* IMAGE */}
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src={val.thumbnail}
                alt={val.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-[#025378] transition">
                {val.title}
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                {val.content.replace(/<[^>]+>/g, "").slice(0, 120)}...
              </p>

              <p className="text-xs text-gray-500">
                <span className="text-[#065173] font-semibold">
                  • Published on
                </span>{" "}
                {new Date(val.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* LOAD MORE */}
      {visible < blogs.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisible((prev) => prev + 3)}
            className="
              px-6 py-3 bg-[#025378] text-white 
              rounded-lg font-semibold hover:bg-[#01334a] transition cursor-pointer
            "
          >
            View More Blogs
          </button>
        </div>
      )}
    </>
  );
}
