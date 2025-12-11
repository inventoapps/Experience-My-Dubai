// app/blog/[slug]/page.tsx
"use client";
import type { Metadata } from "next";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import FAQSection from "@/components/FAQSection";




// ========== COMPONENT START ==========
export default function BlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Blogs
  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blog/get/${slug}`);
        const data = await res.json();
        setBlog(data.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (!blog) return <p className="p-10 text-center">Blog Not Found</p>;

  // Dynamic SEO meta fallbacks
  const metaTitle = blog.metaTitle || `${blog.title} | Experience My Dubai`;
  const metaDescription =
    blog.metaDescription ||
    blog.content?.replace(/<[^>]*>?/gm, "").slice(0, 160) ||
    "Read this travel guide on Experience My Dubai.";

  return (
    <>

      {/* PAGE */}
      <Navbar theme="light" />

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10 space-y-14 mt-8">

        {/*  BLOG HEADER  */}
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900">
            {blog.title}
          </h1>

          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span>By {blog.author || "Admin"}</span>
            <span>• {blog.category || "Travel"}</span>

            {blog.publishedAt && (
              <span>
                • Published on{" "}
                {new Date(blog.publishedAt).toLocaleDateString("en-IN")}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {blog.tags?.map((tag: string, i: number) => (
              <span
                key={i}
                className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/*   THUMBNAIL   */}
       {blog.thumbnail && (
  <div className="flex flex-col md:flex-row gap-6">

    {/* LEFT SIDE — Thumbnail */}
    <div className="relative w-full md:w-3/4 h-[260px] sm:h-[360px] md:h-[450px] rounded-xl overflow-hidden">
      <Image
        src={blog.thumbnail}
        alt={blog.title}
        fill
        className="object-cover"
      />
    </div>

    {/* RIGHT SIDE — Package Ads */}
    <div className="w-full md:w-1/4 flex flex-col gap-4">

      {/* Ad 1 */}
      <div className="relative h-[140px] rounded-xl overflow-hidden shadow-md cursor-pointer">
        <Image
          src="/images/DubaiEdit2.webp"
          alt="Special Package"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 bg-black/40 text-white p-2 text-sm font-semibold">
          Best Dubai Deals
        </div>
      </div>

      {/* Ad 2 */}
      <div className="relative h-[140px] rounded-xl overflow-hidden shadow-md cursor-pointer">
        <Image
          src="/images/DubaiEdit3.webp"
          alt="Offer Package"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 bg-black/40 text-white p-2 text-sm font-semibold">
          Limited-Time Offers
        </div>
      </div>

    </div>
  </div>
)}


        {/*    BLOG CONTENT  */}
        <article className="prose prose-lg max-w-none leading-relaxed prose-img:rounded-xl">
          <div
            dangerouslySetInnerHTML={{
              __html: blog.content || "",
            }}
          />
        </article>

        {/*  FAQ SECTION   */}
        {blog.faq && blog.faq.length > 0 && (
          <div className="pt-10 border-t">
            <FAQSection faqs={blog.faq} />
          </div>
        )}

        {/*  SHARE BUTTONS  */}
        <section className="mt-12">
          <h3 className="text-lg font-semibold mb-3">Share this blog</h3>

          <div className="flex gap-4">
            <a
              className="text-blue-600 hover:opacity-80 text-sm"
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
            >
              Twitter
            </a>

            <a
              className="text-pink-600 hover:opacity-80 text-sm"
              href={`https://www.instagram.com`}
              target="_blank"
            >
              Instagram
            </a>

            <a
              className="text-blue-800 hover:opacity-80 text-sm"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
            >
              Facebook
            </a>
          </div>
        </section>

        {/*  CTA  */}
        <section className="mt-16 p-6 bg-gray-100 rounded-xl text-center shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Enjoyed This Blog?</h2>
          <p className="text-gray-600 mb-5">
            Explore more guides, travel tips & Dubai insights.
          </p>

          <a
            href="/allBlogs"
            className="inline-block bg-[#025378] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#013750] transition"
          >
            View All Blogs
          </a>
        </section>
      </main>
    </>
  );
}
