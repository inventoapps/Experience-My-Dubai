"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar({ theme }: { theme: "light" | "dark" }) {
  const auth = useAuth();
  const user = auth?.user;
  const setUser = auth?.setUser!;

  const [scrolled, setScrolled] = useState(false); // Tracks scroll position for sticky navbar styling
  const [isOpen, setIsOpen] = useState(false); // Mobile menu open/close toggle

  const router = useRouter();

  const handleLogOut = async () => {
    try {
      // Logs out user from API route
      const res = await fetch("api/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        setUser(null); // Clears user from global auth context
        router.push("/"); // Redirect to homepage
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Detect scroll to apply shrink + sticky + shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300); // Navbar becomes solid after 300px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Decides navbar text color depending on theme + scroll
  const textColor =
    scrolled ? "text-black" : theme === "light" ? "text-black" : "text-white";

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-white shadow-md py-5" : "bg-transparent py-5"}
        ${textColor}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className={`font-bold text-xl ${textColor}`}>
          ExperienceMyDubai
        </Link>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center space-x-8 text-sm ${textColor}`}>
          {/* Hash links for homepage sections */}
          <Link href="/#blogs" className="hover:opacity-70 transition">
            Read Blogs
          </Link>

          <Link href="/#packages" className="hover:opacity-70 transition">
            Holiday Tour Packages
          </Link>

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={handleLogOut}
              className="px-5 py-1.5 border border-current rounded-md hover:opacity-70 cursor-pointer"
            >
              LogOut
            </button>
          ) : (
            <button
              onClick={() => router.push("/register")}
              className="px-5 py-1.5 border border-current rounded-md hover:opacity-70"
            >
              Register
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className={`md:hidden ${textColor}`}>
          {isOpen ? (
            <X onClick={() => setIsOpen(false)} size={26} />
          ) : (
            <Menu onClick={() => setIsOpen(true)} size={26} />
          )}
        </div>

       
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          className={
            `fixed top-12 left-[40%] w-full bg-white 
            flex flex-col items-start gap-6 rounded-lg
            pt-12 pl-6 transition-translate ease-in-out animation-duration-initial overflow-hidden  
            z-99 text-black py-12  ${isOpen ? "translate-x-1 opacity-100 z-999" : "-translate-x-full opacity-0"} `}
          
        >
          {/* User Auth */}
          {user ? (
            <button onClick={handleLogOut} className="underline hover:opacity-70 cursor-pointer">
              LogOut
            </button>
          ) : (
            <button
              onClick={() => router.push("/register")}
              className="underline rounded-md hover:opacity-70"
            >
              Register
            </button>
          )}

          {/* Same homepage section links */}
          <Link href="/#blogs" className="hover:opacity-70 transition">
            Read Blogs
          </Link>

          <Link href="/#packages" className="hover:opacity-70 transition">
            Holiday Tour Packages
          </Link>
        </div>
      )}
    </nav>
  );
}
