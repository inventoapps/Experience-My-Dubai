"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu ,X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";



export default function Navbar({ theme }: { theme: "light" | "dark" }) {
  const auth = useAuth();
  const user = auth?.user;
  const setUser = auth?.setUser!;

  const [scrolled, setScrolled] = useState(false);
  const [isOpen , setIsOpen] = useState(false);

  const router = useRouter();

  const handleLogOut = async()=>{
     try {

      const res = await fetch('api/auth/logout',{
          method : "POST"
      })

      if(res.ok){
         setUser(null);
         router.push('/')
      }
       
        
     } catch (error) {
       console.log(error);
     }
  }

  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = scrolled ? "text-black" : theme === "light" ? "text-black" : "text-white";

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}
        ${textColor}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className={`font-bold text-xl ${textColor}`}
        >
          ExperienceMyDubai
        </Link>

        {!scrolled && (
          <div className={`hidden md:flex items-center space-x-8 text-sm ${textColor}`}>
            <Link href="/#blogs" className="hover:opacity-70 transition">Read Blogs</Link>
            <Link href="/#packages" className="hover:opacity-70 transition">Holiday Tour Packages</Link>

            {
              user ? <button onClick={handleLogOut}  className="px-5 py-1.5 border border-current rounded-md hover:opacity-70 cursor-pointer">
                         LogOut
                      </button>
                      :

                      <button onClick={()=>router.push('/register')}  className="px-5 py-1.5 border border-current rounded-md hover:opacity-70">
                       Register
                      </button>               
            }
          </div>
        )}

        <div className={`md:hidden ${textColor}`}>
          {
            isOpen ? <X onClick={()=>setIsOpen(false)} size={26} /> :  <Menu onClick={()=>setIsOpen(true)} size={26} />
          }
          
        </div>

        {scrolled && (
          <div className="relative w-[250px] sm:w-[350px] hidden md:block ">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search…"
              className="pl-10 pr-4 py-2 w-full border rounded-lg bg-white text-black shadow border-gray"
            />
          </div>
        )}
      </div>

      {
          isOpen && <div className="fixed top-12 left-[40%] w-full  bg-white  flex flex-col items-start  gap-6 pt-12 pl-6   transition-all overflow-hidden z-99 text-black py-12 ">
                     {
                    user ? <button onClick={handleLogOut}  className="underline hover:opacity-70 cursor-pointer">
                              LogOut
                            </button>
                            :

                            <button onClick={()=>router.push('/register')}  className="underline rounded-md hover:opacity-70">
                            Register
                            </button>               
                     }

                      <Link href="/#blogs" className="hover:opacity-70 transition">Read Blogs</Link>
                      <Link href="/#packages" className="hover:opacity-70 transition">Holiday Tour Packages</Link>
    
                      

                   </div>
        }
    </nav>
  );
}
