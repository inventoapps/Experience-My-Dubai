"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // for icons

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔹 Mobile Top Bar */}
      <div className="md:hidden px-6 text-black border-b  py-4 flex justify-between">
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>

        <div className="font-medium">
          MyExperienceDubai
        </div>
      </div>

      {/* 🔹 Sidebar Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* 🔹 Main Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 
          w-64 h-full bg-white border-r flex flex-col 
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="px-4 py-4 border-b flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold">ExperienceMyDubai Admin</h1>
            <p className="text-[11px] text-gray-500">Manage tours, blogs & enquiries</p>
          </div>

          {/* Close button for mobile */}
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <p className="px-2 text-[10px] uppercase tracking-wide text-gray-500 mb-1">
            General
          </p>
          <Link href="/admin/dashboard" className="block px-3 py-2 rounded hover:bg-gray-100">
            Dashboard
          </Link>

          <p className="px-2 text-[10px] uppercase tracking-wide text-gray-500 mt-4 mb-1">
            Tour Packages
          </p>

          <Link href="/admin/package/add" className="block px-3 py-2 rounded hover:bg-gray-100">
            Add Tour Package
          </Link>
          <Link href="/admin/package/view" className="block px-3 py-2 rounded hover:bg-gray-100">
            View Tour Packages
          </Link>
          <Link href="/admin/package/edit" className="block px-3 py-2 rounded hover:bg-gray-100">
            Edit Tour Packages
          </Link>

          <p className="px-2 text-[10px] uppercase tracking-wide text-gray-500 mt-4 mb-1">
            Blog
          </p>

          <Link href="/admin/blogs/add" className="block px-3 py-2 rounded hover:bg-gray-100">
            Add Blog Article
          </Link>
          <Link href="/admin/blogs/view" className="block px-3 py-2 rounded hover:bg-gray-100">
            View Blog Articles
          </Link>
          <Link href="/admin/blogs/edit" className="block px-3 py-2 rounded hover:bg-gray-100">
            Edit Blog Articles
          </Link>

          <p className="px-2 text-[10px] uppercase tracking-wide text-gray-500 mt-4 mb-1">
            Activity
          </p>

          <Link href="/admin/activity/add" className="block px-3 py-2 rounded hover:bg-gray-100">
            Add Activity Package
          </Link>
          <Link href="/admin/activity/view" className="block px-3 py-2 rounded hover:bg-gray-100">
            View Activity Package
          </Link>
          <Link href="/admin/activity/edit" className="block px-3 py-2 rounded hover:bg-gray-100">
            Edit Activity Package
          </Link>

          <p className="px-2 text-[10px] uppercase tracking-wide text-gray-500 mt-4 mb-1">
            Enquiries
          </p>

          <Link href="/admin/enquiry/view" className="block px-3 py-2 rounded hover:bg-gray-100">
            View Enquiries
          </Link>
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t text-xs text-gray-500">Logged in as Admin</div>
      </aside>
    </>
  );
}
