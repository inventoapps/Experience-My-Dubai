"use client"
import { Rewind } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface EnquiryProps {
  isOpen: boolean;
  price: number;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EnquiryForm({
  isOpen,
  message = "Are you sure you want to delete this? This action cannot be undone.",
  onConfirm,
  onCancel,
}: EnquiryProps) {
  const [form , setForm] = useState({
    name : "",
    email : "",
    phone : "",
    guests :"",
    arrivalDate : "",
    comments : ""
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
     setForm ({...form , [e.target.name]:e.target.value} )
  }
  const router = useRouter();

  const handleSubmit = async(e:React.FormEvent)=>{
     e.preventDefault();

     const enquiryData = {
      ...form,
      pageUrl: "sdfaf"
     };

     try {
      const res = await fetch('/api/enquiry/',{
        method:"POST",
        headers:{'Content-Types':'application/json'},
        body: JSON.stringify(enquiryData),
      });

      if (res.ok) {
        router.push("/");
      }
      const data = await res.json();
      console.log(data.message);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/40 backdrop-blur-sm 
          transition-opacity duration-300 
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onCancel}
      />

     
      <section
        className={`
          fixed left-1/2 top-0 
          transform -translate-x-1/2 
          w-full max-w-md px-4
          transition-all duration-500 ease-out
          backdrop-blur-sm

          
          ${isOpen ? "translate-y-12 opacity-100 z-999" : "-translate-y-full opacity-0"}
        `}
      >
        <form
          className="
            space-y-5 
            bg-white 
            dark:bg-neutral-900 
            border 
            border-border 
            p-8 
            rounded-xl 
            shadow-lg
          "

          onSubmit={handleSubmit}
        >
       
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Full Name</label>
            <input
              required
              placeholder="John Carter"
              className="
                border border-border 
                w-full p-3 rounded-lg bg-background 
                focus:ring-2 focus:ring-accent
              "
              name="name"
              onChange={handleChange}
              value={form.name}
              
            />
          </div>

      
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="xyz@gmail.com"
              className="
                border border-border 
                w-full p-3 rounded-lg bg-background 
                focus:ring-2 focus:ring-accent
              "
              name="email"
              onChange={handleChange}
              value={form.email}

            />

          </div>

    
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+91 • Mobile Number"
              className="
                border border-border 
                w-full p-3 rounded-lg bg-background 
                focus:ring-2 focus:ring-accent
              "
              name='phone'
              onChange={handleChange}
              value={form.phone}
  
            />
          </div>

          <div className="flex gap-2">
            <label className="text-sm font-medium mb-1">Date of Arrival</label>
            <input
              placeholder="10 Dec"
              className="
                border border-border 
                w-full p-3 rounded-lg bg-background 
                focus:ring-2 focus:ring-accent
              "
              name="arrivalDate"
              required
              onChange={handleChange}
              value={form.arrivalDate}
            />
          </div>

          
            <label className="text-sm font-medium mt-3 mb-1">Number of Guest</label>
            <input
              placeholder="No. of Travelers"
              className="
                border border-border 
                w-full p-3 rounded-lg bg-background 
                focus:ring-2 focus:ring-accent
              "
              name="guests"
              required
              onChange={handleChange}
              value={form.guests}
            />
        

          <label className="text-sm font-medium mt-3 mb-1 hidden sm:block">Comment</label>
            <textarea
              placeholder="Comment"
              className="
                border border-border 
                w-full p-3 rounded-lg bg-background 
                focus:ring-2 focus:ring-accent resize-x hidden sm:block
              "
              name="comments"
              onChange={handleChange}
              value={form.comments}
            />

          

         
          <button
            type="submit"
            className="
              bg-red-500 text-white px-6 py-3 
              rounded-lg w-full font-semibold 
              hover:bg-red-600 transition cursor-pointer
            "
            onClick={onConfirm}
          >
            Submit
          </button>
        
        </form>
      </section>
    </>
  );
}
