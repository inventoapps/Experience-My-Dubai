import { connectDB } from "@/lib/mongodb";
import { TourPackage } from "@/models/package";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest , {params}:{params: Promise<{query : string}>}) {
    try {
        let {query} = await params;
        let queryNumber = Number(query)


        await connectDB();
        const packages = await TourPackage.find().limit(queryNumber);

        return NextResponse.json({message:"Get Packages", data:packages},{status:200});
        
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Internal Sever Error"},{status:500})
    }
}