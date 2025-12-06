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
    console.log(isAdmin)

    if(!isAdmin){
       router.push('/authorization/login')
    }
    setLoading(false)
  },[])


  if(loading){
    return <div className='animate-caret-blink h-screen flex justify-center items-center'>
              Loading....
           </div>
  }

  return (
    <div className="min-h-screen sm:flex">
  
         <Sidebar/>
        

      
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
