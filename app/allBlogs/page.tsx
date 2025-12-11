"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Blogs() {
  const [blogs, setBlogs] = useState<any>(null);
  const router = useRouter();
  const [visible, setVisible] = useState(3); 

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const res = await fetch("/api/blog/getAll");
      const data = await res.json();

      if (res.ok) {
        setBlogs(data.data);
      }
    };
    fetchAllBlogs();
  }, []);

  const loadMore = () => {
    setVisible((prev) => prev + 3); 
  };

  return (
    <>
     <Navbar theme={"light"}/>

     <section className="px-6 py-16 max-w-7xl mx-auto mt-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-10">
        Latest Dubai Travel Blogs
      </h2>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs?.slice(0, visible).map((val: any, idx: number) => (
          <article
            key={idx}
            onClick={() => router.push(`/blogs/${val.slug}`)}
            className="
              group bg-white rounded-2xl shadow-lg border overflow-hidden cursor-pointer 
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
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-[#025378] transition">
                {val.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {val.content.replace(/<[^>]+>/g, "").slice(0, 120)}...
              </p>

              <p className="text-xs text-gray-500">
                <span className="text-[#065173] font-semibold">• Published on</span>{" "}
                {new Date(val.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      {visible < (blogs?.length || 0) && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            className="
              px-6 py-3 bg-[#025378] text-white 
              rounded-lg font-semibold hover:bg-[#01334a] transition
            "
          >
            View More Blogs
          </button>
        </div>
      )}
    </section>

    </>
      );
}
