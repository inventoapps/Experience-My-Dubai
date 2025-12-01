"use client";
import DeletePopup from "@/components/DeletePopup";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isDialogOpen , setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);


  async function getEnquiries() {
      try {
        const res = await fetch("/api/admin/enquiry/get");
        const data = await res.json();
        setEnquiries(data.allEnquiries || []);
      } catch (err) {
        console.log("Error fetching enquiries:", err);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    getEnquiries();
  }, []);

  const handleDelete = async(id:string)=>{

      const payload = {id};
      try {
        const res = await fetch('/api/admin/enquiry/delete',{
            method:"DELETE",
            headers : {'Content-Type' : 'application/json'},
            body:JSON.stringify(payload)
        })
        if(res.ok){
            setIsDialogOpen(false);
            getEnquiries();
        }
      } catch (error) {
         console.log(error);
      }
  }

  const filtered = enquiries.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase().trim()) ||
    item.email.toLowerCase().includes(search.toLowerCase().trim()) ||
    item.pageUrl.toLowerCase().includes(search.toLowerCase().trim())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-semibold">
        Loading Enquiries...
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">All Enquiries</h1>

    
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email or page..."
          className="w-full p-3 rounded-lg border bg-white shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>


      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Guests</th>
              <th className="p-3">Date</th>
              <th className="p-3">Page URL</th>
              <th className="p-3">Comments</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-4 text-center" colSpan={7}>
                  No enquiries found.
                </td>
              </tr>
            ) : (
              filtered.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 text-sm"
                >
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.guests || "Not Provided"}</td>
                  <td className="p-3">{item.arrivalDate || "Not Provided"}</td>
                  <td className="p-3 text-blue-600 underline" >
                    <Link href={item.pageUrl}>visit page</Link>
                    
                    
                  </td>
                  <td className="p-3">{item.comments || "—"}</td>
                  <td className="p-3 text-center">
                    <DeletePopup     isOpen={isDialogOpen} 
                                     onCancel={() => setIsDialogOpen(false)}
                                     onConfirm={() => deleteId && handleDelete(deleteId)}
                                    />
                    <button onClick={()=>{setIsDialogOpen(true)
                       setDeleteId(item._id.toString())}} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

   
      <div className="md:hidden grid gap-4 mt-4">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-600">No enquiries found.</p>
        ) : (
          filtered.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-xl shadow border"
            >
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <button onClick={()=>{
                    setIsDialogOpen(true)
                    setDeleteId(item._id.toString())
                }
                } className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer">
                  Delete
                </button>
              </div>

              <p className="text-sm mt-1 text-gray-700">{item.email}</p>

              <div className="mt-3 text-sm space-y-2">
                <p>
                  <strong>Guests:</strong> {item.guests}
                </p>
                <p>
                  <strong>Arrival Date:</strong> {item.arrivalDate}
                </p>
                <p className="text-blue-600 underline break-all">
                  <strong>Page:</strong> {item.pageUrl}
                </p>
                <p>
                  <strong>Comments:</strong>{" "}
                  {item.comments ? item.comments : "No comments"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
