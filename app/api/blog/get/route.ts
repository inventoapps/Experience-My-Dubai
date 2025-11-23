import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        await connectDB();

        const blogs = await Blog.find();

         return NextResponse.json({message:"Get all blogs",data:blogs})
        
     } catch (error : any) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"});
     }
};