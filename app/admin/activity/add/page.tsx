"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import mongoose from "mongoose";



interface FAQItem {
  question: string;
  answer: string;
}

interface ItineraryItem {
   title : string;
   description : string;
}

interface GalleryType {
   image : string;
   alt : string;
}


interface PackageType {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  location: string;
  city: string;
  country: string;

  price: number;
  discountPrice: number;
  rating: number;
  totalRatings : number;
  description: string;
  tags : string[];
  category : string;

  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  gallery: GalleryType[];
  itinearary : ItineraryItem;

  faqs: FAQItem[];


  metaTitle?: string;
  metaDescription?: string;
  published?: boolean;
}



export default function PackageForm() {
  const [loading, setLoading] = useState(true);


  // Form States
  const [highlights, setHighlights] = useState([""]);
  const [inclusions, setInclusions] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);
  //In gallery first image we use as a thumbnail and others we use in package info gallery
  const [gallery, setGallery] = useState<GalleryType[]>([{image : "" , alt : ""},
    {image : "" , alt : ""},{image : "" , alt : ""},
    {image : "" , alt : ""}]);

  const [tourFaqs, setTourFaqs] = useState<FAQItem[]>([
    { question: "", answer: "" },
  ]);

  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
      {title: "", description: "" },
    ]);
  
  const [status, setStatus] =
    useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  




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
    copy[i].image = base64;     
    setGallery(copy);
  }

  const handleAltChange = async (e:ChangeEvent<HTMLInputElement>, i:number)=>{
      const val = e.target.value;
      const copy = [...gallery];
      copy[i].alt = val;
      setGallery(copy)

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
      duration: fd.get('duration'),
      price: Number(fd.get("price")),
      discountPrice: Number(fd.get("discountPrice")),
      rating: Number(fd.get("rating")),
      totalRatings : Number(fd.get('totalRatings')),
      description: fd.get("description"),


      highlights,
      inclusions,
      exclusions,
      gallery,
      itinerary,


      faqs: tourFaqs.map((f) => ({
        question: f.question,
        answer: f.answer,
      })),

      metaTitle: fd.get("metaTitle"),
      metaDescription: fd.get("metaDescription"),
      submitType,
    };


   
    const res = await fetch("/api/admin/activity/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setStatus("error");
      setMessage("Failed to Publish package.");
      return;
    }

    setStatus("success");
    setMessage(
      submitType === "publish" ? "Activity Published" : "Saved Draft"
    );
  }




  return (
    <div className="flex gap-6">
      
      <form onSubmit={handleSubmit} className="space-y-6 flex-1 max-w-4xl">     
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
          <h1 className="text-xl font-semibold">
             Add Activity Package
          </h1>

           {/* Save and Publish Buttons */}
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <button
              type="submit"
              name="submitType"
              value="save"
              className="border px-3 py-2 rounded w-full md:w-auto cursor-pointer"
            >
              Save Draft
            </button>

            <button
              type="submit"
              name="submitType"
              value="publish"
              className="border px-3 py-2 rounded bg-black text-white w-full md:w-auto cursor-pointer"
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

        {/* Basic Information */}

        <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-semibold">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="title" label="Title"  />
            <Input name="slug" label="Slug"  />

            <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          

             <Input
              name="country"
              label="Country"
            />
            <Input name="city"
             label="City"  />
            <Input
              name="location"
              label="Location"
            />

            </section>
            
  
           
           
        <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">

        
            <Input
              name="duration"
              label="Duration (In hours)"
              type="number"

            />


            <Input label="Category" name="category" />
            <Input label="Tags (comma separated)" name="tags" />

  

        </section>

            <Input
              name="price"
              label="Price"
              type="number"
            />
            <Input
              name="discountPrice"
              label="Discount Price"
              type="number"
            />
            <Input
              name="rating"
              label="Rating"
            />

            <Input
              name="totalRatings"
              label="totalRatings"
              type="number"
            />
          </div>

          <Textarea
            name="description"
            label="Short Overview"
          />

          
        </section>

        {/* Inclusion & Exclusion */}

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

         {/* Gallery */}
        <section className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-sm font-semibold mb-3">Gallery (4 Images)</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {gallery.map((item, i) => (
              <div key={i} className="mb-4">
    
              {/* Upload Image */}
              <Input
                type="file"
                accept="image/*"
                label={`Image ${i + 1}`}
                onChange={(e) => handleImageUpload(e, i)}
              />

              {/* Alt Text */}
              <Input
                type="text"
                label={`Image ${i + 1} Alt text`}
                value={item.alt}
                onChange={(e) => handleAltChange(e, i)}
                className="mt-2"
              />

              </div>

            ))}
          </div>
        </section>
        {/* Itinerary */}

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

        {/* FAQs Section */}

      
        <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-semibold">FAQs</h2>


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

        <section className="bg-white p-4 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-semibold">SEO</h2>

          <Input
            name="metaTitle"
            label="Meta Title"
          />
          <Textarea
            name="metaDescription"
            label="Meta Description"
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
