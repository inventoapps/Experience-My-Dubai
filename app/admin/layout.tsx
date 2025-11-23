"use client"
import { ReactNode, useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useRouter } from 'next/navigation';

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading ,setLoading] = useState(true);
  useEffect(()=>{
    const isAdmin = localStorage.getItem('isAdmin');

    if(!isAdmin){
       router.push('/admin/login')
    }
    setLoading(false)
  },[])
  if(loading){
    return <div className='animate-caret-blink h-screen flex justify-center items-center'>
              Loading....
           </div>
  }
  return (
    <div className="min-h-screen flex">

        
        <Sidebar/>
     
       {/* <aside className="w-64 bg-gray-900 text-white p-6 space-y-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col space-y-4">
          <a href="/admin/dashboard" className="hover:text-gray-300">Dashboard</a>

          <a href="/admin/package/add" className="hover:text-gray-300">Add Package</a>
          <a href="/admin/package/view" className="hover:text-gray-300">View Packages</a>

          <a href="/admin/blogs/add" className="hover:text-gray-300">Add Blog</a>
          <a href="/admin/blogs/view" className="hover:text-gray-300">View Blogs</a>

          <a href="/admin/login" className="hover:text-red-400 mt-6"> <span><LogOut/></span> <span>LogOut</span></a>
        </nav>
      </aside>  */}

      
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
