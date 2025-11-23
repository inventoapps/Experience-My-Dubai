"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 relative bg-gray-50">
   
      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-gray-700" />
      </button>

 
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md p-6 rounded-xl border bg-white shadow-sm"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Register to{" "}
          <span className="bg-linear-to-r from-green-300 via-green-500 to-green-800 bg-clip-text text-transparent">
            ExperienceMyDubai
          </span>
        </h2>

        <h3 className="text-gray-400 text-center text-sm">
          Create Your Account
        </h3>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-300 outline-none"
          required
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-300 outline-none"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-300 outline-none"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-300 outline-none"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all"
        >
          Register
        </button>
      </form>
    </section>
  );
}
