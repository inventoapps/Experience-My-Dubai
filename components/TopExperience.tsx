"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import CarouselDemo from "./CarouselDemo";

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
    
    
    return (
        <section 
            className="py-12 sm:py-16 max-w-7xl mx-auto"
            aria-labelledby="top-experiences-heading"
            >
      
            <h2
                id="top-experiences-heading"
                className="text-3xl font-bold text-foreground mb-6 uppercase"
            >
                Top Dubai Experiences
            </h2>

        
            <div
                className=""
            >

                <CarouselDemo packages={activities} setIsDialogOpen={setIsDialogOpen} route={"activity"} />
                
                
                
            </div>
        </section>

    )
}


                // <article 
                // className="border border-border p-5 rounded-xl bg-card shadow-sm hover:shadow-md transition"
                // aria-label="Desert Safari experience in Dubai"
                // >
                // <h3 className="font-semibold text-lg text-foreground">Desert Safari</h3>
                // <p className="text-sm text-muted-foreground mt-1">
                //     Adventure through dunes, camel rides & Arabian nights.
                // </p>
                // </article>

               
                // <article 
                // className="border border-border p-5 rounded-xl bg-card shadow-sm hover:shadow-md transition"
                // aria-label="Burj Khalifa tour experience in Dubai"
                // >
                // <h3 className="font-semibold text-lg text-foreground">Burj Khalifa Tour</h3>
                // <p className="text-sm text-muted-foreground mt-1">
                //     Visit the world’s tallest building with stunning views.
                // </p>
                // </article>

            
                // <article 
                // className="border border-border p-5 rounded-xl bg-card shadow-sm hover:shadow-md transition"
                // aria-label="Skydiving experience over Dubai"
                // >
                // <h3 className="font-semibold text-lg text-foreground">Skydiving Dubai</h3>
                // <p className="text-sm text-muted-foreground mt-1">
                //     Experience an adrenaline rush above Palm Jumeirah.
                // </p>
                // </article>

              
                // <article 
                // className="border border-border p-5 rounded-xl bg-card shadow-sm hover:shadow-md transition"
                // aria-label="Dubai city sightseeing tour"
                // >
                // <h3 className="font-semibold text-lg text-foreground">Dubai City Tour</h3>
                // <p className="text-sm text-muted-foreground mt-1">
                //     Explore historic souks, landmarks & cultural hotspots.
                // </p>
                // </article>