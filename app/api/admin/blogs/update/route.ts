import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest){
    try {
        const {submitType , id,...updatedData} = await req.json();

        const published = submitType === 'publish' ? true : false;
        const publishedAt = submitType === 'publish' ? new Date() : null;

        console.log(published)
        
        if (!id) {
        return NextResponse.json(
            { error: "Blog ID is required" },
            { status: 400 }
        );
    } 
     const updated  = await Blog.findByIdAndUpdate(id , {updatedData , published , publishedAt} ,
       {new: true, runValidators: true,
    });

    if(!updated) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Blog updated successfully",
      data: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
