"use client";

import { useEffect, useState, useRef , ChangeEvent } from "react";
import mongoose from "mongoose";

type Blog = {
  _id: mongoose.Types.ObjectId;
  title : string;
  slug: string;
  author: string;
  category: string;
  tags: string[];
  thumbnail: string;
  content: string;
  faq: { question: string; answer: string }[];
  views: number;
  published: boolean;
  metaTitle?: string;
  metaDescription?: string;
};



export default function BlogForm() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Which blog is currently being edited
  const [editBlog, setEditBlog] = useState<Blog | null>(null);

  // Form states
  const [faq, setFaq] = useState([{ question: "", answer: "" }]);
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [thumbnail , setThumbanail] = useState("");  



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


  useEffect(() => {
    if (editBlog) {
      setFaq(editBlog.faq || [{ question: "", answer: "" }]);

      // Fill rich text editor
      if (editorRef.current) {
        editorRef.current.innerHTML = editBlog.content;
      }
      setContent(editBlog.content);
    }
  }, [editBlog]);

  function applyFormat(cmd: string, value?: string) {
    if (cmd === "createLink") {
      const url = prompt("Enter URL", "https://");
      if (!url) return;
      document.execCommand("createLink", false, url);
    } else if (cmd === "formatBlock") {
      document.execCommand("formatBlock", false, value);
    } else {
      document.execCommand(cmd, false, value);
    }

    setContent(editorRef.current?.innerHTML || "");
  }

  function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

   const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;
      
          const base64 = await fileToBase64(file);
      
          setThumbanail(base64);
        }

  // ================= SUBMIT FORM (CREATE / UPDATE) =================
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");

    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const submitType = submitter.value;

    // Tags handle
    const tagsStr = (fd.get("tags") as string) || "";
    const tags = tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title : fd.get('title'),
      slug: fd.get("slug"),
      author: fd.get("author"),
      category: fd.get("category"),
      tags,
      thumbnail,
      content,
      faq,
      metaTitle: fd.get("metaTitle"),
      metaDescription: fd.get("metaDescription"),
      published: submitType === "publish",
      id : editBlog?._id
    };

    


    if (editBlog) {
      const res = await fetch(`/api/admin/blogs/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setStatus("error");
        setMessage("Failed to update blog");
        return;
      }

      setStatus("success");
      setMessage("Blog updated successfully!");
      fetchBlogs();
      return;
    }

    // ---- ELSE CREATE NEW ----
    const res = await fetch("/api/admin/blogs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setStatus("error");
      setMessage("Failed to save");
      return;
    }

    setStatus("success");
    setMessage(
      submitType === "publish"
        ? "Blog published successfully"
        : "Blog saved as draft"
    );

    fetchBlogs();
  }


  
  // ============================================
  // UI START
  // ============================================

  return (
    <div className="flex gap-6">
      {/* ---------- SIDEBAR ---------- */}
      <aside className="w-64 bg-white p-4 border rounded-xl h-[85vh] overflow-y-auto">
        <h3 className="font-semibold mb-3">All Blogs</h3>

        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-sm text-gray-500">No blogs found</p>
        ) : (
          blogs.map((b) => (
            <div
              key={String(b._id)}
              className={`p-3 border rounded mb-2 cursor-pointer ${
                editBlog?._id === b._id ? "bg-gray-100" : ""
              }`}
              onClick={() => setEditBlog(b)}
            >
              <p className="font-medium text-sm">{b.slug}</p>
              <p className="text-[11px] text-gray-500">{b.category}</p>

              
            </div>
          ))
        )}
      </aside>

      {/* ---------- MAIN FORM ---------- */}
      <form onSubmit={handleSubmit} className="space-y-6 flex-1 max-w-3xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
            <h1 className="text-xl font-semibold">Edit Blog</h1>

            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <button
                type="submit"
                name="submitType"
                value="save"
                className="px-3 py-2 border rounded w-full md:w-auto"
              >
                Save Draft
              </button>

              <button
                type="submit"
                name="submitType"
                value="publish"
                className="px-3 py-2 border rounded bg-black text-white w-full md:w-auto"
              >
                Publish
              </button>
            </div>
            </div>


        {message && (
          <p
            className={`text-xs ${
              status === "success"
                ? "text-green-600"
                : status === "error"
                ? "text-red-600"
                : ""
            }`}
          >
            {message}
          </p>
        )}

        {/* BASIC INFO */}
        <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-semibold">Basic Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
             label="Title"
             name="title"
             defaultValue={editBlog?.title}
             required
             />
            <Input
              label="Slug"
              name="slug"
              defaultValue={editBlog?.slug}
              required
            />
            <Input
              label="Author"
              name="author"
              defaultValue={editBlog?.author}
            />
            <Input
              label="Category"
              name="category"
              defaultValue={editBlog?.category}
            />
            <Input
              label="Tags (comma separated)"
              name="tags"
              defaultValue={editBlog?.tags.join(", ")}
            />
            <Input label="Thumbnail URL"
           name="thumbnail" 
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)

            }
             />
          </div>
        </section>

        {/* CONTENT */}
        <section className="bg-white p-4 rounded-xl shadow-sm space-y-3">
          <h2 className="text-sm font-semibold">Content</h2>

          <div className="flex gap-1 text-xs mb-1">
            <FormatButton label="B" onClick={() => applyFormat("bold")} />
            <FormatButton
              label="H2"
              onClick={() => applyFormat("formatBlock", "H2")}
            />
            <FormatButton
              label="H3"
              onClick={() => applyFormat("formatBlock", "H3")}
            />
            <FormatButton
              label="Link"
              onClick={() => applyFormat("createLink")}
            />
          </div>

          <div
            ref={editorRef}
            contentEditable
            className="border rounded p-3 min-h-[200px] bg-white"
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
          />
        </section>

        {/* SEO */}
        <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <Input
            label="Meta Title"
            name="metaTitle"
            defaultValue={editBlog?.metaTitle}
          />
          <Textarea
            label="Meta Description"
            name="metaDescription"
            defaultValue={editBlog?.metaDescription}
          />
        </section>

        {/* FAQ */}
        <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold">FAQ</h2>
            <button
              type="button"
              className="text-xs border px-2 py-1 rounded"
              onClick={() => setFaq([...faq, { question: "", answer: "" }])}
            >
              + Add FAQ
            </button>
          </div>

          <div className="space-y-3">
            {faq.map((item, i) => (
              <div key={i} className="border p-3 rounded space-y-2">
                <Input
                  label="Question"
                  value={item.question}
                  onChange={(e) => {
                    const copy = [...faq];
                    copy[i].question = e.target.value;
                    setFaq(copy);
                  }}
                />
                <Textarea
                  label="Answer"
                  value={item.answer}
                  onChange={(e) => {
                    const copy = [...faq];
                    copy[i].answer = e.target.value;
                    setFaq(copy);
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </form>
    </div>
  );
}



function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-xs font-medium block mb-1">{label}</label>
      <input {...props} className="w-full border rounded px-3 py-2 text-sm" />
    </div>
  );
}

function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <label className="text-xs font-medium block mb-1">{label}</label>
      <textarea {...props} className="w-full border rounded px-3 py-2 text-sm" />
    </div>
  );
}

function FormatButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border px-2 py-1 rounded text-xs"
    >
      {label}
    </button>
  );
}
