"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function AdminHeader() {
  const router = useRouter();

  
  
  const handleLogOut =  async()=>{
     try {
       const res = await fetch('/api/adminAuth/logout',{
         method : "POST"
       });

       if(res.ok){
        router.push("/authorization/login")
       }
      
     } catch (error) {
       console.log(error)
     }
     
     
  }
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between ">
      <h2 className="text-sm font-semibold">Admin Panel</h2>
      <button onClick={handleLogOut} className="text-xs border rounded px-3 py-1">Logout</button>
    </header>
  );
}
