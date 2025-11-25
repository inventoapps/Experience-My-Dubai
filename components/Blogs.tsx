"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Blogs(){
    const [blogs, setBlogs] = useState<any>(null);
    const router = useRouter();
    
    useEffect(()=>{
        const fetchAllBlogs = async ()=>{
            const res = await fetch('/api/blog/get');
            const data = await res.json();

            if(res.ok){
                setBlogs(data.data);
            }
            
        }
        fetchAllBlogs()
    },[])
    
    return (
           <section
                className="px-6 py-14 max-w-7xl mx-auto"
                aria-labelledby="blogs-heading"
                >
                
                <h2
                    id="blogs-heading"
                    className="text-3xl sm:text-4xl font-bold text-foreground mb-8"
                >
                    Latest Dubai Travel Blogs
                </h2>

               
                <div
                    className="
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    lg:grid-cols-3 
                    gap-8
                    "
                >
                {blogs?.map((val:any , idx:number)=>{
                        return (
                            <article key={idx}
                            className="
                                bg-card 
                                border border-border 
                                rounded-xl 
                                shadow-sm 
                                hover:shadow-lg 
                                transition 
                                overflow-hidden
                                cursor-pointer
                            "
                            onClick={()=>router.push(`/blogs/${val.slug}`)}
                            itemScope
                            itemType="https://schema.org/BlogPosting"
                            >
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                src="/blog1.jpg"
                                alt="How to plan Dubai trip in 2025"
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                itemProp="image"
                                />
                            </div>

                            <div className="p-5">
                                <p className="text-xs text-accent font-medium" itemProp="articleSection">
                                Travel Tips
                                </p>

                                <h3
                                className="text-lg font-semibold mt-2 text-foreground"
                                itemProp="headline"
                                >
                                How to Plan a Perfect Dubai Trip in 2025
                                </h3>

                                <p
                                className="text-sm text-muted-foreground mt-2 leading-relaxed"
                                itemProp="description"
                                >
                                From best travel months to cost-saving hacks — here's your complete guide.
                                </p>

                                <p className="text-xs text-muted-foreground mt-3" itemProp="datePublished">
                                Feb 2025
                                </p>
                            </div>
                            </article>
                     )
                    })}
                </div>
           </section>
     )
}