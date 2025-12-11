"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState<any>(null);
  const router = useRouter();

 
  function stripHTML(html: string) {
    return html.replace(/<[^>]*>?/gm, "");
  }

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const res = await fetch("/api/blog/get");
      const data = await res.json();

      if (res.ok) {
        setBlogs(data.data);
      }
    };
    fetchAllBlogs();
  }, []);

  return (
    <section className="py-16 px-6 sm:px-0 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
        Latest Dubai Travel Blogs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {blogs?.map((val: any, idx: number) => (
          <article
            key={idx}
            className="group bg-white rounded-2xl shadow-lg border overflow-hidden cursor-pointer hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            onClick={() => router.push(`/blogs/${val.slug}`)}
          >
            {/* Image */}
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src={val?.thumbnail}
                alt={val?.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-[#8f226c] transition">
                {val?.title}
              </h3>

              {/* FIXED EXCERPT */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {stripHTML(val.content).slice(0, 120)}...
              </p>

              <p className="text-xs text-gray-500 mt-2">
                <span className="text-[#8f226c] font-semibold">• Published on</span>{" "}
                {new Date(val?.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
