import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest) {
  try {
      await connectDB();

      const {id} = await req.json();

      console.log("This id", id);


      const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
      console.log(deletedEnquiry);

      return NextResponse.json({message:"Enquiry is deleted" , data : deletedEnquiry},{status:200});

    
  } catch (error) {
     console.log("Error in deleting enquiry", error);
     return NextResponse.json({error:"Something went wrong!"},{status:500})
  }
}