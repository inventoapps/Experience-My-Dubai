"use client"

import { useEffect, useState } from "react"

export default function Blogs(){
    const [blogs, setBlogs] = useState(null);
    
    useEffect(()=>{
        const fetchAllBlogs = async ()=>{
            const res = await fetch('/api/blogs/get');
            
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
                    
                    <article
                    className="
                        bg-card 
                        border border-border 
                        rounded-xl 
                        shadow-sm 
                        hover:shadow-lg 
                        transition 
                        overflow-hidden
                    "
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

                    
                    <article
                    className="
                        bg-card 
                        border border-border 
                        rounded-xl 
                        shadow-sm 
                        hover:shadow-lg 
                        transition 
                        overflow-hidden
                    "
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                    >
                    <div className="h-48 w-full overflow-hidden">
                        <img
                        src="/blog2.jpg"
                        alt="Top 10 things to do in Dubai"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        itemProp="image"
                        />
                    </div>

                    <div className="p-5">
                        <p className="text-xs text-accent font-medium" itemProp="articleSection">
                        Experiences
                        </p>

                        <h3
                        className="text-lg font-semibold mt-2 text-foreground"
                        itemProp="headline"
                        >
                        Top 10 Things You Must Do in Dubai
                        </h3>

                        <p
                        className="text-sm text-muted-foreground mt-2 leading-relaxed"
                        itemProp="description"
                        >
                        Desert safari, skydiving, and hidden gems you shouldn’t miss.
                        </p>

                        <p className="text-xs text-muted-foreground mt-3" itemProp="datePublished">
                        Jan 2025
                        </p>
                    </div>
                    </article>

                    
                    <article
                    className="
                        bg-card 
                        border border-border 
                        rounded-xl 
                        shadow-sm 
                        hover:shadow-lg 
                        transition 
                        overflow-hidden 
                        hidden lg:block
                    "
                    itemScope
                    itemType="https://schema.org/BlogPosting"
                    >
                    <div className="h-48 w-full overflow-hidden">
                        <img
                        src="/blog3.jpg"
                        alt="Best places to visit in Dubai at night"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        itemProp="image"
                        />
                    </div>

                    <div className="p-5">
                        <p className="text-xs text-accent font-medium" itemProp="articleSection">
                        Nightlife
                        </p>

                        <h3
                        className="text-lg font-semibold mt-2 text-foreground"
                        itemProp="headline"
                        >
                        Best Places to Visit in Dubai at Night
                        </h3>

                        <p
                        className="text-sm text-muted-foreground mt-2 leading-relaxed"
                        itemProp="description"
                        >
                        Explore Dubai's magical nightlife — views, vibes & luxury.
                        </p>

                        <p className="text-xs text-muted-foreground mt-3" itemProp="datePublished">
                        Dec 2024
                        </p>
                    </div>
                     <button>View More</button>
                    </article>
                </div>
           </section>
     )
}