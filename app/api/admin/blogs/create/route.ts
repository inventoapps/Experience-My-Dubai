import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/blog";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});



export async function POST(req:NextRequest) {
    try {
        await connectDB();
        
        const body = await req.json();
        const published = body.submitType === 'publish' ? true : false;
        const publishedAt = body.submitType === 'publish' ? new Date() : null;

        let thumbnailURL;

        if(body?.thumbnail){
           const uploaded = await cloudinary.uploader.upload(body?.thumbnail);
           thumbnailURL = uploaded.secure_url;
        }
             
        const blog = await Blog.create({...body , thumbnail : thumbnailURL , published , publishedAt});

        return NextResponse.json({message:"Blog is created",data:blog},{status:200});
        
    } catch (error) {
       console.log("Error in creating Blog",error);
       return NextResponse.json({error:"Internal Sever Error"},{status:500}); 
    }
}