// app/blog/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import FAQSection from "@/components/FAQSection";

export default function BlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      <Navbar theme="light" />

      <title>{blog.metaTitle || blog.title}</title>
      <meta
        name="description"
        content={blog.metaDescription || blog.content?.slice(0, 150)}
      />

      <section className="mt-10 space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          {blog.title}
        </h1>

        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <span>By {blog.author}</span>
          <span>• {blog.category}</span>

          {blog.published && blog.publishedAt && (
            <span>
              • Published on{" "}
              {new Date(blog.publishedAt).toLocaleDateString("en-IN")}
            </span>
          )}
        </div>

   
        <div className="flex flex-wrap gap-2 mt-2">
          {blog.tags?.map((t: string, i: number) => (
            <span
              key={i}
              className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-lg"
            >
              #{t}
            </span>
          ))}
        </div>
      </section>

 
      {blog.thumbnail && (
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-xl overflow-hidden">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            // fill
            className="object-cover"
          />
        </div>
      )}


      <section className="prose prose-lg dark:prose-invert max-w-none leading-relaxed">
        <div
          dangerouslySetInnerHTML={{
            __html: blog.content || "",
          }}
        />
      </section>

     
      {blog.faq && blog.faq.length > 0 && (
        <div className="pt-6 border-t">
          <FAQSection faqs={blog.faq} />
        </div>
      )}

     
      <section className="mt-16 p-6 bg-gray-100 rounded-xl text-center">
        <h2 className="text-xl font-bold mb-2">Enjoyed The Blog?</h2>
        <p className="text-gray-600 mb-4">
          Explore more guides, tips & travel insights.
        </p>

        <a
          href="/blogs"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          View All Blogs
        </a>
      </section>
    </main>
  );
}
