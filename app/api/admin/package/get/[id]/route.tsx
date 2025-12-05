import { TourPackage } from "@/models/package";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET(req:NextRequest,{ params }: { params: Promise<{ id: string }> }){
     try {
        await connectDB();
        const {id} = await params;
        const packageData = await TourPackage.findById(id);
        
        if(!packageData){
            return NextResponse.json({message:"package Not Found"},{status:404});
        }

        return NextResponse.json({message:"Get all packges",data:packageData},{status:200})
        
     } catch (error : any) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"});
     }
}