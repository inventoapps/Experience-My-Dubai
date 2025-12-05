import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, {params} : {params : Promise<{ id : string}>}){
   try {

      await connectDB();
      const {id} = await params;
    
      
      const activity = await Activity.findById(id);

      return NextResponse.json({message:"Get activity", data:activity},{status:200});
    
   } catch (error) {
     console.log("Error in activiy", error);
     return NextResponse.json({error:"Something went wrong!"},{status:500})
   }
}