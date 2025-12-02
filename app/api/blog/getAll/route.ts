import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        await connectDB();

        const data = await Blog.find({});
        return NextResponse.json({message:"Get all Blogs", data:data}, {status:201});
        
    } catch (error) {
        console.log("Error in geting blogs", error);
        return NextResponse.json({error:"Internal Server Error"}, {status:500});
    }
}