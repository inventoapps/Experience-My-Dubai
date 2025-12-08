"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import CarouselDemo from "./CarouselDemo";
import EnquiryForm from "./EnquiryFormPopUp";

interface ActivityType {
  _id: string;
  title: string;
  slug: string;
  price: number;
  discountPrice?: number;
  city: string;
  country: string;
  gallery: string[];
}

export default function TopExperience(){
    
    const [activities, setActivities] = useState<ActivityType[]>([]);
    const [loading , setLoading] = useState(true);
    const [isDialogOpen , setIsDialogOpen] = useState(false);
    const [pageUrl , setPageUrl] = useState<string | undefined>('/');
    const router = useRouter();

    
    
        
        useEffect(()=>{
           const fetchActiviy = async()=>{
              try {
                const res = await fetch('/api/admin/activity/get');
                const data = await res.json();
    
                if(res.ok){
                    setActivities(data.data || []);
                }
              } catch (error) {
                 console.log(error)
              }
    
              finally{
                 setLoading(false);
              }
           }
    
           fetchActiviy();
        },[]);

    if(loading){
        return <div className="max-w-7xl py-12 sm:py-16 px-4 sm:px-0 bg-accent/5 animate-ping">Loading...</div>
    }
    
    
    return (
        <section 
            className="py-12 sm:py-14 px-4 sm:px-0 max-w-7xl mx-auto overflow-hidden"
            aria-labelledby="top-experiences-heading"
            >
      
            <h2
                id="top-experiences-heading"
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
            >
                Top Dubai Experiences
            </h2>

        
            <div
                className=""
            >

            {activities ?   <CarouselDemo packages={activities} setIsDialogOpen={setIsDialogOpen} route={"activity"} setPageUrl={setPageUrl}  />
            :       <div className="py-16 text-center text-2xl font-bold text-gray-500 max-w-7xl" >Packages Not Found</div>}

                <EnquiryForm
                            isOpen={isDialogOpen}
                            price={799}
                            onCancel={() => setIsDialogOpen(false)}
                            onConfirm={() => setIsDialogOpen(false)}
                            pageUrl={pageUrl}
                    />
                
                
                
            </div>
        </section>

    )
}

