"use client";

import { useEffect, useState } from "react";
import DeletePopup from "@/components/DeletePopup";
import { useRouter } from "next/navigation";
;


interface PackageType {
  _id: string;
  title: string;
  slug: string;
  price: number;
  discountPrice?: number;
  city: string;
  country: string;
  gallery: string[];
}

export default function AllPackagesPage() {
  
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setisDialogOpen] = useState(false)
  const [message, setMessage] = useState("");

  const router = useRouter();


  async function fetchPackages() {
    try {
      const res = await fetch("/api/admin/package/get");
      const data = await res.json();
      setPackages(data.data || []);
    } catch (err) {
      console.error("ERR_FETCH_PACKAGES", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPackages();
  }, []);

  const deletePackage = async (id: string)=>{
    try {
        const payload = {id};
        const res = await fetch('/api/admin/package/delete', {
        method : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        
      })

       if(res.ok){
         setMessage("Package Deleted");
         setisDialogOpen(false);
       }
      
    } catch (error) {
       setMessage("Error in deleting package");
       console.log("error", error);
    }
      
  }

  return (
    <section>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">All Tour Packages</h1>

        {loading ? (
          <p>Loading...</p>
        ) : packages.length === 0 ? (
          <p className="text-gray-500">No packages found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="border bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="h-40 w-full bg-gray-100">
                  <img
                    src={pkg.gallery?.[0] || "/no-image.png"}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 space-y-1">
                  <h2 className="font-semibold text-sm">{pkg.title}</h2>
                  <p className="text-xs text-gray-500">
                    {pkg.city}, {pkg.country}
                  </p>

                  <div className="text-sm font-semibold mt-1">
                    ₹{pkg.discountPrice || pkg.price}
                    {pkg.discountPrice && (
                      <span className="text-xs text-gray-500 line-through ml-2">
                        ₹{pkg.price}
                      </span>
                    )}
                  </div>
                   <DeletePopup  isOpen={isDialogOpen} 
                                 onCancel={() => setisDialogOpen(false)}
                                 onConfirm={() => deletePackage(pkg._id)}
                          />

                  <div className="flex gap-2 mt-3">
                    <button onClick={()=>router.push('/admin/blogs/edit')} className="px-3 py-1 text-xs border rounded hover:bg-gray-50">
                      Edit
                    </button>
                    <button onClick={()=>setisDialogOpen(true)}   className="px-3 py-1 text-xs border rounded text-red-600 hover:bg-red-50">
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
  );
}
