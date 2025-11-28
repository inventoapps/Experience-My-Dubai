"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import mongoose from "mongoose";

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}




interface FAQItem {
  title?: string;
  question: string;
  answer: string;
}

interface PackageType {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  location: string;
  city: string;
  country: string;
  duration: number;
  price: number;
  discountPrice?: number;
  rating?: number;
  totalRatings?:number;
  description: string;
  category: string;
  tags: string[];

  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  gallery: string[];

  faqs: FAQItem[];
  itinerary: ItineraryItem[];

  metaTitle?: string;
  metaDescription?: string;
  published?: boolean;
}



export default function PackageForm() {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);

  const [editPkg, setEditPkg] = useState<PackageType | null>(null);

  // Form States
  const [highlights, setHighlights] = useState([""]);
  const [inclusions, setInclusions] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);
  const [gallery, setGallery] = useState(["", "", ""]);
  const [faqSectionTitle, setFaqSectionTitle] = useState("");
  const [tourFaqs, setTourFaqs] = useState<FAQItem[]>([
    { question: "", answer: "" },
  ]);
  
  const [status, setStatus] =
    useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
 ;




  async function fetchPackages() {
    try {
      const res = await fetch("/api/admin/activity/get");
      const data = await res.json();
      setPackages(data.data || []);
    } catch (err) {
      console.error("ERR_FETCH_PACKAGES", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPackages();
  }, []);


 useEffect(() => {
  if (editPkg) {
    setHighlights(editPkg.highlights || [""]);
    setInclusions(editPkg.inclusions || [""]);
    setExclusions(editPkg.exclusions || [""]);
    setGallery(editPkg.gallery || ["", "", ""]);
    setTourFaqs(editPkg.faqs || [{ question: "", answer: "" }]);
    setFaqSectionTitle(editPkg.faqs?.[0]?.title || "");

  }
}, [editPkg]);

  function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}


 const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, i: number) => {
     const file = e.target.files?.[0];
     if (!file) return;
 
     const base64 = await fileToBase64(file);
 
     const copy = [...gallery];
     copy[i] = base64;     
     setGallery(copy);
   }


 

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");

    const fd = new FormData(e.currentTarget);
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const submitType = submitter.value;

    const payload = {
      title: fd.get("title"),
      slug: fd.get("slug"),
      location: fd.get("location"),
      city: fd.get("city"),
      country: fd.get("country"),
      duration: fd.get("duration"),
      price: Number(fd.get("price")),
      discountPrice: Number(fd.get("discountPrice")),
      rating: Number(fd.get("rating")),
      totalRatings : Number(fd.get('totalRatings')),
      description: fd.get("description"),

      highlights,
      inclusions,
      exclusions,
      gallery,
      id : editPkg?._id,

      faqs: tourFaqs.map((f) => ({
        title: faqSectionTitle,
        question: f.question,
        answer: f.answer,
      })),

      metaTitle: fd.get("metaTitle"),
      metaDescription: fd.get("metaDescription"),
      submitType,
    };

    if (editPkg) {
      const res = await fetch(`/api/admin/activity/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setStatus("error");
        setMessage("Failed to update package.");
        return;
      }

      setStatus("success");
      setMessage("Package updated successfully!");
      fetchPackages();
      return;
    }

    
    const res = await fetch("/api/admin/activity/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setStatus("error");
      setMessage("Failed to save package.");
      return;
    }

    setStatus("success");
    setMessage(
      submitType === "publish" ? "Tour Published" : "Saved Draft"
    );
    fetchPackages();
  }

  

  return (
    <div className="flex gap-6">
   
      <aside className="w-64 bg-white p-4 border rounded-xl h-[85vh] overflow-y-auto">
        <h3 className="font-semibold mb-3">All Packages</h3>

        {loading ? (
          <p>Loading...</p>
        ) : packages.length === 0 ? (
          <p className="text-sm text-gray-500">No packages found</p>
        ) : (
          packages.map((pkg) => (
            <div
              key={String(pkg._id)}
              className={`p-3 border rounded mb-2 cursor-pointer ${
                editPkg?._id === pkg._id ? "bg-gray-100" : ""
              }`}
              onClick={() => setEditPkg(pkg)}
            >
              <p className="font-medium text-sm">{pkg.title}</p>
              <p className="text-[11px] text-gray-500">{pkg.slug}</p>

            </div>
          ))
        )}
      </aside>

     
      <form onSubmit={handleSubmit} className="space-y-6 flex-1 max-w-4xl">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            {editPkg ? "Edit Tour Package" : "Add Tour Package"}
          </h1>

          <div className="flex gap-2">
            <button
              type="submit"
              name="submitType"
              value="save"
              className="border px-3 py-2 rounded"
            >
              Save Draft
            </button>
            <button
              type="submit"
              name="submitType"
              value="publish"
              className="border px-3 py-2 rounded bg-black text-white"
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

        <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-semibold">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="title" label="Title" defaultValue={editPkg?.title} />
            <Input name="slug" label="Slug" defaultValue={editPkg?.slug} />
          
            <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
              <Input
              name="location"
              label="Location"
              defaultValue={editPkg?.location}
            />
            <Input name="city" label="City" defaultValue={editPkg?.city} />
            <Input
              name="country"
              label="Country"
              defaultValue={editPkg?.country}
            />

            </section>

            <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">

 
            <Input
              name="duration"
              label="Duration (In hours)"
              type="number"
              defaultValue={editPkg?.duration}

            />


           <Input
              label="Category"
              name="category"
              defaultValue={editPkg?.category}
            />
            <Input
              label="Tags (comma separated)"
              name="tags"
              defaultValue={editPkg?.tags.join(", ")}/>

  

            </section>

            <Input
              name="price"
              label="Price"
              type="number"
              defaultValue={editPkg?.price}
            />
            <Input
              name="discountPrice"
              label="Discount Price"
              type="number"
              defaultValue={editPkg?.discountPrice}
            />
            <Input
              name="rating"
              label="Rating"
              type="number"
              defaultValue={editPkg?.rating}
            />

            <Input
              name="totalRatings"
              label="totalRatings"
              type="number"
              defaultValue={editPkg?.totalRatings}
            />
          </div>

          <Textarea
            name="description"
            label="Short Overview"
            defaultValue={editPkg?.description}
          />
        </section>

        {/* ========== HIGHLIGHTS & INCLUSIONS ========== */}
        <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-semibold">
            Highlights & What’s Included
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DynamicList
              title="Highlights"
              items={highlights}
              setItems={setHighlights}
            />
            <DynamicList
              title="Inclusions"
              items={inclusions}
              setItems={setInclusions}
            />
            <DynamicList
              title="Exclusions"
              items={exclusions}
              setItems={setExclusions}
            />
          </div>
        </section>

        {/* ========== GALLERY ========== */}
        <section className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-sm font-semibold mb-3">Gallery (3 Images)</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {gallery.map((img, i) => (
              <Input
                 type="file"
                accept="image/*"
                key={i}
                label={`Image ${i + 1}`}
                onChange={(e) => handleImageUpload(e, i)}
              />
            ))}
          </div>
        </section>

        {/* ========== FAQ ========== */}
        <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-semibold">FAQs</h2>

          <Input
            label="FAQ Section Title"
            value={faqSectionTitle}
            onChange={(e) => setFaqSectionTitle(e.target.value)}
          />

          <div className="space-y-4">
            {tourFaqs.map((faq, i) => (
              <div key={i} className="border p-3 rounded space-y-2">
                <Input
                  label="Question"
                  value={faq.question}
                  onChange={(e) => {
                    const c = [...tourFaqs];
                    c[i].question = e.target.value;
                    setTourFaqs(c);
                  }}
                />
                <Textarea
                  label="Answer"
                  value={faq.answer}
                  onChange={(e) => {
                    const c = [...tourFaqs];
                    c[i].answer = e.target.value;
                    setTourFaqs(c);
                  }}
                />
              </div>
            ))}

            <button
              type="button"
              className="text-xs border px-2 py-1 rounded"
              onClick={() =>
                setTourFaqs([...tourFaqs, { question: "", answer: "" }])
              }
            >
              + Add FAQ
            </button>
          </div>
        </section>

        {/* ========== SEO ========== */}
        <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-semibold">SEO</h2>

          <Input
            name="metaTitle"
            label="Meta Title"
            defaultValue={editPkg?.metaTitle}
          />
          <Textarea
            name="metaDescription"
            label="Meta Description"
            defaultValue={editPkg?.metaDescription}
          />
        </section>
      </form>
    </div>
  );
}

// ======================================
// SMALL COMPONENTS
// ======================================

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

function DynamicList({
  title,
  items,
  setItems,
}: {
  title: string;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-xs font-medium">{title}</span>
        <button
          type="button"
          className="text-[11px] border px-2 py-1 rounded"
          onClick={() => setItems([...items, ""])}
        >
          + Add
        </button>
      </div>

      <div className="space-y-2">
        {items.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              value={v}
              onChange={(e) => {
                const c = [...items];
                c[i] = e.target.value;
                setItems(c);
              }}
            />
            <button
              type="button"
              className="text-[11px] border px-2 rounded"
              onClick={() =>
                setItems(items.filter((_, idx) => idx !== i))
              }
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
