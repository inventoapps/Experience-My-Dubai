"use client"
import { DivideIcon } from "lucide-react";
import { dirname } from "path";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { useEffect, useState } from "react";
import HeroBottom from "@/components/HeroBottom";
import CarouselDemo from "@/components/CarouselDemo";
import TopExperience from "@/components/TopExperience";
import FormSection from "@/components/FormSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import { useParams } from "next/navigation";
import EnquiryForm from "@/components/EnquiryFormPopUp";



export default function Page(){
    const [index , setIndex] = useState(0);
    const [packages , setPackages] = useState<any[]>([]);
    const {location} = useParams();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [loading , setLoading] = useState(true);
    const [pageUrl , setPageUrl] = useState<string | undefined>("/"); 


    

    const  FAQs = [
  {
    "question": "What is Downtown Dubai famous for?",
    "answer": "Downtown Dubai is known for its iconic landmarks such as the Burj Khalifa, The Dubai Mall, Dubai Fountain, and luxurious hotels and lifestyle attractions."
  },
  {
    "question": "Is Downtown Dubai good for tourists?",
    "answer": "Yes, Downtown Dubai is one of the most popular tourist areas offering shopping, sightseeing, dining, entertainment, and luxury experiences all in one place."
  },
  {
    "question": "How far is Downtown Dubai from the airport?",
    "answer": "Downtown Dubai is approximately 15–20 minutes from Dubai International Airport by car or taxi."
  },
  {
    "question": "What can I do in Downtown Dubai?",
    "answer": "You can visit the Burj Khalifa, explore The Dubai Mall, watch the Dubai Fountain show, dine at premium restaurants, and enjoy many entertainment options."
  },
  {
    "question": "Is Downtown Dubai expensive?",
    "answer": "Downtown Dubai is considered a luxury area, but it offers both premium and budget-friendly options depending on where you shop, dine, or stay."
  },
  {
    "question": "What is the best time to visit Downtown Dubai?",
    "answer": "The best time to visit is from November to March when the weather is pleasant for outdoor activities and fountain shows."
  },
  {
    "question": "Is Downtown Dubai walkable?",
    "answer": "Yes, the area is pedestrian-friendly with well-designed walkways connecting major landmarks like Dubai Mall and the Burj Khalifa."
  },
  {
    "question": "Are there free things to do in Downtown Dubai?",
    "answer": "Yes, you can watch the Dubai Fountain show, explore the Dubai Mall, walk around the boulevard, and enjoy stunning views of the Burj Khalifa."
  },
  {
    "question": "Where can I park in Downtown Dubai?",
    "answer": "The Dubai Mall offers free parking, and many hotels and attractions in the area provide valet and public parking options."
  }
]
    useEffect(()=>{
        const getPackages = async()=>{
           try {

             const res = await fetch(`/api/package/region/${location}`)
             const data = await res.json();
            if(res.ok){
             setPackages(data.data)
            }

            
           } catch (error) {
             console.log(error);
           }
           finally{
             setLoading(false)
           }
          
        }

        getPackages();
    },[location]);

    const images = [
    {
      src: "/images/Burj-Khalifa.webp",
      alt: "Night view of Downtown Dubai with the illuminated Burj Khalifa",
    },
    {
      src: "/images/Palm-Jumeirah-Dubai.webp",
      alt: "Aerial view of Palm Jumeirah in Dubai",
    },
    {
      src: "/images/Dubai-Marina-Skyline.webp",
      alt: "Stunning sunset view of the Dubai Marina skyline",
    },
  ];

  useEffect(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 4000);
  
      return () => clearInterval(timer);
    }, []);


    if (loading) return <p className="p-8 text-center">Loading...</p>;
    if (!packages) return <p className="p-8 text-center">Package not found</p>;

  

    return (
        <div className="w-full">
         <Navbar theme="dark" />
         {/* Hero Section for pacageby region */}
         <section className="relative h-[65vh] sm:h-[70vh] md:h-[60vh] w-full overflow-hidden">
         
               <div className="absolute inset-0">
                 {images.map((img, i) => (
                   <div
                     key={i}
                     className={`
                       absolute inset-0 bg-cover bg-center 
                       transition-opacity duration-1500 ease-in-out
                       ${i === index ? "opacity-100" : "opacity-0"}
                     `}
                     style={{ backgroundImage: `url(${img.src})` }}
                   />
                 ))}
         
                
                 <div className="absolute inset-0 bg-black/50"></div>
               </div>
         
             
               <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 gap-3">
                 <h2 className="text-4xl sm:text-5xl font-bold drop-shadow-xl">
                      <span className="text-[#025378] font-bold">Down Town</span> Dubai Tour Packages
                 </h2>
         
                 
               </div>
         </section>
      
         <HeroBottom/>

         {/* All packages by region */}
         <section className="py-12 sm:py-16  max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">All Down Town Dubai Tour Packages</h2>
           {packages.length > 0 ?  <CarouselDemo packages={packages} setIsDialogOpen={setIsDialogOpen}  route="packagebyregion" setPageUrl={setPageUrl}  /> : 
                  <div className="py-16 text-center text-2xl font-bold text-gray-500" >Packages Not Found</div>
                }

         </section>


         <TopExperience/>
         <FormSection/>
         <WhyChooseUs/>
         <FAQSection faqs={FAQs}/>


         {/* Enquiry Form when you will click the enquiry button in cards */}

         <EnquiryForm
                       isOpen={isDialogOpen}
                       price={799}
                       onCancel={() => setIsDialogOpen(false)}
                       onConfirm={() => setIsDialogOpen(false)}
                       pageUrl={pageUrl}
                 />

        </div>
    )
}