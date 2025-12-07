"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const auth = useAuth();
  const setAdmin = auth?.setAdmin;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     try {
      const res  =  await fetch('/api/adminAuth/login', {
         method : "POST",
         headers : {'Content-Type' : "application/json"},
         body : JSON.stringify(form)
      });

      const data = await res.json();
      if(res.ok){
        router.push('/admin/dashboard');
      }
      else{
        alert("Invalid Credential")
      }
      
     } catch (error) {
       console.log(error);
     }

    // if (form.email === "rohitjuyalp205@gmail.com" && form.password === "rohit123") {
    //   localStorage.setItem('isAdmin',"rohit");
    //   router.push(`/admin/dashboard/?key=${process.env.MY_SECRET_ADMIN_KEY}`);
    // } else {
    //   alert("Invalid credentials");
    // }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-gray-100 px-6"
      aria-labelledby="admin-login"
    >
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1
          id="admin-login"
          className="text-2xl font-bold mb-6 text-center"
        >
          Admin Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded-lg"
              placeholder="admin@example.com"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded-lg"
              placeholder="••••••"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
