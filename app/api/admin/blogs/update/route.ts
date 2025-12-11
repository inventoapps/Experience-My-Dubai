import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function PUT(req: NextRequest) {
  try {
    await connectDB(); // ✅ REQUIRED

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { submitType, id, ...updatedData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const published = submitType === "publish";
    const publishedAt = published ? new Date() : null;

    console.log("Received content:", updatedData.content);

    const prevBlog = await Blog.findOne({slug:updatedData.slug});

    console.log("prevBlog" , prevBlog);

    let thumbnailURL : string = updatedData.thumbnail ;

    if (
      updatedData.thumbnail &&
      typeof updatedData.thumbnail === "string" &&
      updatedData.thumbnail.startsWith("data:image")
    ) {
        const uploaded = await cloudinary.uploader.upload(
          updatedData.thumbnail
        );
        thumbnailURL = uploaded.secure_url;
      
    }

    if(thumbnailURL === ''){
        thumbnailURL = prevBlog?.thumbnail;
    }


    const updateObj = {
      ...updatedData,
      thumbnail: thumbnailURL,
      published,
      publishedAt,
    };


    const updatedBlog = await Blog.findByIdAndUpdate(id, updateObj, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Blog updated successfully",
        data: updatedBlog,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
