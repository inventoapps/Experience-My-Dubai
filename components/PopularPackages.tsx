"use client"
import Slider from "@/components/Slider";
import CarouselDemo from "./CarouselDemo";
import { useEffect, useState } from "react";
import AllPackagesPage from "@/app/admin/package/view/page";
import EnquiryForm from "./EnquiryFormPopUp";
import {PackageCardSkeleton} from './sekeleton/PackageCardSkeleton '

interface GalleryType {
  image : string;
  alt : string;
}
interface PackageType {
  _id: string;
  title: string;
  slug: string;
  price: number;
  discountPrice?: number;
  city: string;
  country: string;
  gallery: GalleryType[];
}


interface optionType {
   id : number;
   label : string;
}
export default function PopularPackages(){
    const [packages, setPackages] = useState<PackageType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [pageUrl , setPageUrl] = useState<string | undefined>('/');
    const [activeId , setActiveId] = useState<number>(1);
    
    const option = [
       {id:1 , label:"All"},
       {id:2 , label:"5–8 Days"},
       {id:3 , label:"10+ Days"},
       {id:4, label:"Less than 5 Days"}
    ]
  
    
      
    
      async function fetchPackages() {
        try {
          const res = await fetch(`/api/package/${activeId}`);
          const data = await res.json();
          setPackages(data.data || []);
        } catch (err) {
          console.error("ERR_FETCH_PACKAGES", err);
        }
        finally{
          setLoading(false);
        }
      }
    
      useEffect(() => {
        fetchPackages();
      }, [activeId]);


      if(loading){
        return(
          <div className="py-12 sm:py-16 px-4 sm:px-0 bg-accent/5 max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8" >Popular Dubai Tour Packages</h2>
            <div className="flex flex-wrap gap-2 mt-4 sm:px-12  px-6 mb-10">

            {option.map((item: optionType, idx: number) => (
              <button
                onClick={() => setActiveId(item.id)}
                key={idx}
                className={`px-3 py-1 border border-gray-400 ${
                  activeId === item.id
                    ? "bg-[#025378] text-white border-none"
                    : "bg-transparent"
                } text-sm rounded-lg`}
              >
                {item.label}
              </button>
              ))}
            </div>
            <div className="flex max-w-5xl mx-auto gap-10">
                 {Array.from({ length: 3 }).map((_, i) => (
                 <PackageCardSkeleton key={i} />
            ))}
            </div>
           
            </div>
        )
        }

      
    
    return (
      <>
       <section className="py-12 sm:py-16 px-4 sm:px-0 bg-accent/5 ">
          <div className="max-w-7xl mx-auto">

           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8" >Popular Dubai Tour Packages</h2>
          <div className="flex flex-wrap gap-2 mt-4 sm:px-12  px-6">
            {option.map((item: optionType, idx: number) => (
              <button
                onClick={() => setActiveId(item.id)}
                key={idx}
                className={`px-3 py-1 border border-gray-400 ${
                  activeId === item.id
                    ? "bg-[#025378] text-white border-none"
                    : "bg-transparent"
                } text-sm rounded-lg`}
              >
                {item.label}
              </button>
              ))}
            </div>

          
        </div>

        

        
     {packages.length > 0  ? 
          <Slider packages={packages} setIsDialogOpen={setIsDialogOpen} route={"packages"} setPageUrl={setPageUrl}/>
 :
      <div className="py-16 text-center text-2xl font-bold text-gray-500 max-w-7xl" >Packages Not Found</div>
     } 
       
      
    </section>
    
      <EnquiryForm
              
              isOpen={isDialogOpen}
              price={799}
              onCancel={() => setIsDialogOpen(false)}
              onConfirm={() => setIsDialogOpen(false)}
              pageUrl={pageUrl}
        />

      </>
    )
       
}