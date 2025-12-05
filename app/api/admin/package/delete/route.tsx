import { TourPackage } from "@/models/package";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function DELETE(req:NextRequest ) {
    try {
        await connectDB();
        const {id} = await req.json();

        if(!id){
            return NextResponse.json({message:"Package Id is required"},{status:404});
        }
        
        const deltedPackage =  await TourPackage.findByIdAndDelete(id);

        console.log(deltedPackage);

        return NextResponse.json({message:"Package is Deleted",data:deltedPackage}) 
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:501});
    }
}