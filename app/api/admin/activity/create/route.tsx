import { connectDB } from "@/lib/mongodb";
import { NextRequest , NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Activity from "@/models/Activity";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
export  async function POST(req:NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        let galleryUrls = [];

        if(body.gallery?.length > 0){
            for (const img of body.gallery) {
                const upload = await cloudinary.uploader.upload(img);
                galleryUrls.push(upload.secure_url);
              }

         const newActivity = await Activity.create({...body, gallery:galleryUrls});
           return NextResponse.json(
               {
                 message: body.submitType === "publish" ? "Package Published" : "Draft Saved",
                 data: newActivity
               },
               { status: 200 }
             );
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Something went wrong!"},{status:500});
    }
}