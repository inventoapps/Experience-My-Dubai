import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest , {params} : {params : Promise<{id:string}>}) {
    try {
         
         await connectDB();
           
        const {id} = await params;
        
        if(!id){
            return NextResponse.json({message:"Activity Id is required"},{status:404});
        }
        
        const deletedBlogs = await  Activity.findByIdAndDelete(id);
        return NextResponse.json({message:"Activity is Deleted",data:deletedBlogs},{status:200}) 
        
    } catch (error) {
        console.log("Error In activity delete",error);
        return NextResponse.json({error:"Internal Sever Error"},{status:500});
    }
}