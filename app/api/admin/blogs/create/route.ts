import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/blog";

export async function POST(req:NextRequest) {
    try {
        await connectDB();
        
        const body = await req.json();
             
        const blog = await Blog.create(body);

        return NextResponse.json({message:"Blog is created",data:blog},{status:200});
        
    } catch (error) {
       console.log("Error in creating Blog",error);
       return NextResponse.json({error:"Internal Sever Error"},{status:500}); 
    }
}