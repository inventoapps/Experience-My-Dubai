"use client"
import DeletePopup from "@/components/DeletePopup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function AllActivityPage(){
    const [activities, setActivities] = useState<ActivityType[]>([]);
    const [loading , setLoading] = useState(true);
    const router = useRouter();
    const [isDialogOpen , setisDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

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
    
    useEffect(()=>{
       fetchActiviy();
    },[]);

    const deletePackage = async(id:string)=>{
       try {
        const payload = {id};
        const res = await fetch('/api/admin/activity/delete', {
        method : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        
      })

       if(res.ok){
         setisDialogOpen(false);
         fetchActiviy();
       }
      
    } catch (error) {
       console.log("error", error);
    }
    }
    return (
        <section>
              <div className="space-y-6">
                <h1 className="text-xl font-semibold">All Activity Packages</h1>
        
                {loading ? (
                  <p>Loading...</p>
                ) : activities.length === 0 ? (
                  <p className="text-gray-500">No packages found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {activities.map((activity) => (
                      <div
                        key={activity._id}
                        className="border bg-white rounded-xl shadow-sm overflow-hidden"
                      >
                        <div className="h-40 w-full bg-gray-100">
                          <img
                            src={activity.gallery?.[0] || "/no-image.png"}
                            alt={activity.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
        
                        <div className="p-4 space-y-1">
                          <h2 className="font-semibold text-sm">{activity.title}</h2>
                          <p className="text-xs text-gray-500">
                            {activity.city}, {activity.country}
                          </p>
        
                          <div className="text-sm font-semibold mt-1">
                            ₹{activity.discountPrice || activity.price}
                            {activity.discountPrice && (
                              <span className="text-xs text-gray-500 line-through ml-2">
                                ₹{activity.price}
                              </span>
                            )}
                          </div>
                           <DeletePopup  isOpen={isDialogOpen} 
                                         onCancel={() => setisDialogOpen(false)}
                                         onConfirm={() => deleteId && deletePackage(deleteId)}
                                  />
        
                          <div className="flex gap-2 mt-3">
                            <button onClick={()=>router.push('/admin/activity/edit')} className="px-3 py-1 text-xs border rounded hover:bg-gray-50">
                              Edit
                            </button>
                            <button onClick={()=>{
                              setisDialogOpen(true)
                              setDeleteId(activity._id)
                            }
                              }   className="px-3 py-1 text-xs border rounded text-red-600 hover:bg-red-50">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
    )
}