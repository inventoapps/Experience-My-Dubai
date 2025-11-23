import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest , context: { params: Promise<{ slug: string }>}){
    try {
        await connectDB();

        console.log("Hi bhai")
        
        const {slug} = await context.params;

        if(!slug){
            return NextResponse.json(
                 {message:"Slug is required"}
                ,{status:200});
        }

        const blog = await Blog.findOne({slug}); 

         return NextResponse.json({message:"Get all blogs",data:blog})
        
     } catch (error : any) {
        console.log(error)
        return NextResponse.json({message:"Internal Server Error"});
     }
};