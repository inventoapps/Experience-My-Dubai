"use client"
import { ReactNode, useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useRouter } from 'next/navigation';

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {

  return (
    <div className="min-h-screen sm:flex">
  
      <Sidebar/> 
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
