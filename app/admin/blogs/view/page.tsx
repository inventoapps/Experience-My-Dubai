"use client"

import mongoose from "mongoose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeletePopup from "@/components/DeletePopup";



type Blog = {
  slug: string;
  author: string;
  category: string;
  tags: string[];
  thumbnail: string; 
  content: string;
  faq?: {
    question: string;
    answer: string;
  }[];
  views: number;
  published: boolean;
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  _id? : mongoose.Types.ObjectId;

  }

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const router = useRouter();

  async function fetchBlogs() {
    try {
      const res = await fetch("/api/admin/blogs/get");
      const data = await res.json();
      setBlogs(data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

   const deletePackage = async (id: string)=>{
    try {
        const payload = {id};
        const res = await fetch('/api/admin/blogs/delete', {
        method : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        
      })

       if(res.ok){
         setisDialogOpen(false);
       }
      
    } catch (error) {
       console.log("error", error);
    }
      
  }

  return (
    <section>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">All Blog Articles</h1>

        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.map((blog) => (
              <div
                key={blog._id?.toString()}
                className="border bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="h-40 bg-gray-100">
                  <img
                    src={blog.thumbnail || "/no-image.png"}
                    alt={blog.slug}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <h2 className="font-semibold text-sm">{blog.metaTitle}</h2>
                  <p className="text-xs text-gray-500">By {blog.author}</p>

                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      blog.published
                        ? "bg-green-200 text-green-700"
                        : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                 
                  <DeletePopup     isOpen={isDialogOpen} 
                                   onCancel={() => setisDialogOpen(false)}
                                   onConfirm={() => blog._id && deletePackage(blog._id.toString())}
                    />

                  <div className="flex gap-2 mt-3">
                    <button onClick={()=>router.push('/admin/blogs/edit')} className="px-3 py-1 text-xs border rounded hover:bg-gray-50">
                      Edit
                    </button>
                    <button onClick={()=>setisDialogOpen(true)} className="px-3 py-1 text-xs border text-red-600 rounded hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

