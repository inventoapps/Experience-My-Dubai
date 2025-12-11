import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TourPackage } from "@/models/package";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
   

    const finalGallery: { image: string; alt: string }[] = [];

    const published = body.submitType === "publish";
    const publishedAt = published ? new Date() : null;

    // Handle Gallery Uploads
    if (Array.isArray(body.gallery) && body.gallery.length > 0) {
        for (const item of body.gallery) {
          const { image, alt } = item;

          // Skip empty 
          if (!image || image.trim() === "") {
            continue;
          }

          const upload = await cloudinary.uploader.upload(image);

          finalGallery.push({
            image: upload.secure_url,
            alt: alt || "",
          });
        }
}


    
    // Create Package in DB
    const pkg = await TourPackage.create({
      ...body,
      gallery: finalGallery,
      published,
      publishedAt,
    });

    return NextResponse.json(
      {
        message: published ? "Package Published" : "Draft Saved",
        data: pkg,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("PACKAGE_CREATE_ERROR", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
