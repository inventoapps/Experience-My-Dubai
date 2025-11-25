import { TourPackage } from "@/models/package";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { id, gallery, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }

  
    let finalGallery = [];

    if (gallery?.length > 0) {
      for (const img of gallery) {
        // If it's base64 → upload to Cloudinary
        if (img.startsWith("data:image")) {
          const upload = await cloudinary.uploader.upload(img);
          finalGallery.push(upload.secure_url);
        } else {
          // If it's already a Cloudinary URL → keep it
          finalGallery.push(img);
        }
      }
    }


    const updated = await TourPackage.findByIdAndUpdate(
      id,
      { 
        ...updateData, 
        gallery: finalGallery 
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Package updated successfully",
      data: updated,
    });

  } catch (err: any) {
    console.log("UPDATE_PACKAGE_ERROR", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
