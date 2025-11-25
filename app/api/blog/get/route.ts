import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        await connectDB();

        const blogs = await Blog.find({}).sort({createdAt:-1}).limit(3);

         return NextResponse.json({message:"Get all blogs",data:blogs})
        
     } catch (error : any) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"});
     }
};