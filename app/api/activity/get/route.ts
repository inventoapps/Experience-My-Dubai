import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
            await connectDB();
            const data = await Activity.find({});
            console.log("Get Data")
            return NextResponse.json({message:"Get all activity" , data:data},{status:200})    
    }
    catch (error : any) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"},{status:500});
     }
}