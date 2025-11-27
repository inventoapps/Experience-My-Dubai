import { NextRequest, NextResponse } from "next/server";
import { TourPackage } from "@/models/package";
import { connectDB } from "@/lib/mongodb";

export async function GET(req:NextRequest,context: { params: Promise<{ location: string }> }) {
    try {
        await connectDB();
        const {location} = await context.params;

        if(!location){
            return NextResponse.json({message:"There is no location"},{status:400})
        }

        const allPackages = await TourPackage.find({location:location});
        return NextResponse.json({data:allPackages},{status:200});
        
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Something went wrong!"},{status:500});
    }
}