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
    const { submitType, id, gallery = [], ...updateData } = body;
   


    if (!id) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    if (body.totalRatings === undefined) {
      return NextResponse.json(
        { message: "Total ratings is required" },
        { status: 400 }
      );
    }

    const published = submitType === "publish";
    const publishedAt = published ? new Date() : null;

    // HANDLE GALLERY IMAGES
   
    const finalGallery: { image: string; alt: string }[] = [];

    for (const item of gallery) {
      const { image, alt } = item;

      if (!image) continue;

      // If it is base64 -> upload to Cloudinary
      if (image.startsWith("data:image")) {
        const uploaded = await cloudinary.uploader.upload(image, {
          folder: "tour_packages",
        });

        finalGallery.push({ image: uploaded.secure_url, alt });
      } else {
        // Already uploaded
        finalGallery.push({ image, alt });
      }
    }

    // UPDATE PACKAGE


    console.log(finalGallery);

    const updated = await TourPackage.findByIdAndUpdate(
      id,
      {
        ...updateData,
        gallery: finalGallery,
        published,
        publishedAt,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Package updated successfully",
      data: updated,
    });

  } catch (err: any) {
    console.error("UPDATE_PACKAGE_ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
