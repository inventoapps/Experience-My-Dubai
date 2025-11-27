import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
            await connectDB();
            const allActivities = await Activity.find({});
            return NextResponse.json({message:"Get all actinity" , data:allActivities})    
    }
    catch (error : any) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"});
     }
}