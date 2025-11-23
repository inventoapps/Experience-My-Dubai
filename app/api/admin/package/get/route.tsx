import { TourPackage } from "@/models/package";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET(req:NextRequest){
     try {
        await connectDB();
        const allPackages = await TourPackage.find();

        return NextResponse.json({message:"Get all packges",data:allPackages})
        
     } catch (error : any) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"});
     }
}