import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import {TourPackage} from '@/models/package'


export async function GET(req:NextRequest){
    try {
        await connectDB();

        const packages = await TourPackage.find({});
        return NextResponse.json({data : packages},{status:200});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Something went Wrong!"},{status:500});
    }
}