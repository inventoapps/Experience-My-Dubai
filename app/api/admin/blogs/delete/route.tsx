import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/blog";

export async function DELETE(req:NextRequest) {
    try {
        await connectDB();
   
        const {id} = await req.json();

        

        if(!id){
            return NextResponse.json({message:"Blogs Id is required"},{status:404});
        }
       
        const deletedBlogs = await  Blog.findByIdAndDelete(id);
        console.log("Hi Rohit, I think everything is fine here")
        return NextResponse.json({message:"Blogs is Deleted",data:deletedBlogs},{status:200}) 
    } catch (error) {
        return NextResponse.json({message:"Internal Server Error"},{status:501});
    }
}