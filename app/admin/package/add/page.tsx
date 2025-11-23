"use client";

import { useEffect, useState } from "react";
import mongoose from "mongoose";

// ============ TYPES ================
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

interface DurationType {
  days: number;
  nights: number;
  breakdown: {
    location: string;
    days: number;
  }[];
}

interface PackageType {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  location: string;
  city: string;
  country: string;
  duration: DurationType;
  price: number;
  discountPrice?: number;
  rating?: number;
  description: string;

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
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
    { day: 1, title: "", description: "" },
  ]);

  const [status, setStatus] =
    useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [durationDays, setDurationDays] = useState<number>(0);
  const [durationNights, setDurationNights] = useState<number>(0);
  const [durationBreakdown, setDurationBreakdown] = useState<
  { location: string; days: number }[]> ([{ location: "", days: 0 }]);



  async function fetchPackages() {
    try {
      const res = await fetch("/api/admin/package/get");
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
      duration: {durationDays,durationNights ,durationBreakdown},
      price: Number(fd.get("price")),
      discountPrice: Number(fd.get("discountPrice")),
      rating: Number(fd.get("rating")),
      description: fd.get("description"),

      highlights,
      inclusions,
      exclusions,
      gallery,

      itinerary,

      faqs: tourFaqs.map((f) => ({
        title: faqSectionTitle,
        question: f.question,
        answer: f.answer,
      })),

      metaTitle: fd.get("metaTitle"),
      metaDescription: fd.get("metaDescription"),
      submitType,
    };


   
    const res = await fetch("/api/admin/package/create", {
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
           
<section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
  <h2 className="text-sm font-semibold">Duration</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
    <Input
      label="Total Days"
      type="number"
      value={durationDays}
      onChange={(e) => setDurationDays(Number(e.target.value))}
    />

    <Input
      label="Total Nights"
      type="number"
      value={durationNights}
      onChange={(e) => setDurationNights(Number(e.target.value))}
    />
  </div>


  <div className="space-y-3">
    <div className="flex justify-between">
      <h3 className="text-xs font-medium">Duration Breakdown</h3>
      <button
        type="button"
        className="text-[11px] border px-2 py-1 rounded"
        onClick={() =>
          setDurationBreakdown([
            ...durationBreakdown,
            { location: "", days: 0 },
          ])
        }
      >
        + Add Location
      </button>
    </div>

    {durationBreakdown.map((item, i) => (
      <div key={i} className="border p-3 rounded flex flex-col gap-2">
        <div className="flex gap-3">
          <Input
            label="Location"
            value={item.location}
            onChange={(e) => {
              const copy = [...durationBreakdown];
              copy[i].location = e.target.value;
              setDurationBreakdown(copy);
            }}
          />

          <Input
            label="Days"
            type="number"
            value={item.days}
            onChange={(e) => {
              const copy = [...durationBreakdown];
              copy[i].days = Number(e.target.value);
              setDurationBreakdown(copy);
            }}
          />
        </div>

        {i > 0 && (
          <button
            type="button"
            className="text-[11px] border px-2 py-1 rounded w-fit"
            onClick={() =>
              setDurationBreakdown(
                durationBreakdown.filter((_, idx) => idx !== i)
              )
            }
          >
            Remove
          </button>
        )}
      </div>
    ))}
  </div>
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
          </div>

          <Textarea
            name="description"
            label="Short Overview"
            defaultValue={editPkg?.description}
          />
        </section>

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

       
        <section className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-sm font-semibold mb-3">Gallery (3 Images)</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {gallery.map((img, i) => (
              <Input
                key={i}
                label={`Image ${i + 1}`}
                value={img}
                onChange={(e) => {
                  const c = [...gallery];
                  c[i] = e.target.value;
                  setGallery(c);
                }}
              />
            ))}
          </div>
        </section>

     
        <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <div className="flex justify-between">
            <h2 className="text-sm font-semibold">Itinerary</h2>

            <button
              type="button"
              className="text-xs border px-2 py-1 rounded"
              onClick={() =>
                setItinerary([
                  ...itinerary,
                  {
                    day: itinerary.length + 1,
                    title: "",
                    description: "",
                  },
                ])
              }
            >
              + Add Day
            </button>
          </div>

          <div className="space-y-4">
            {itinerary.map((item, i) => (
              <div key={i} className="border p-3 rounded space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs">Day {item.day}</span>

                  {i > 0 && (
                    <button
                      type="button"
                      className="text-xs border px-2 py-1 rounded"
                      onClick={() =>
                        setItinerary(itinerary.filter((_, idx) => idx !== i))
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>

                <Input
                  label="Title"
                  value={item.title}
                  onChange={(e) => {
                    const copy = [...itinerary];
                    copy[i].title = e.target.value;
                    setItinerary(copy);
                  }}
                />
                <Textarea
                  label="Description"
                  value={item.description}
                  onChange={(e) => {
                    const copy = [...itinerary];
                    copy[i].description = e.target.value;
                    setItinerary(copy);
                  }}
                />
              </div>
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
