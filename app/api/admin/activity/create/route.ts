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
        const finalGallery : {image : string , alt : string}[] = [];

        const published = body.submitType === 'publish' ? true : false;
        const publishedAt = body.submitType === 'publish' ? new Date() : null;


        if(Array.isArray(body.gallery) && body.gallery.length >0 ){
            for(const item of body.gallery){
               const {image , alt} = item;

               //if image empty -> skip

               if (!image || image.trim() === "") {
                  continue;
               }

               const upload = await cloudinary.uploader.upload(image, {folder:"activity_package"});

               finalGallery.push({
               image: upload.secure_url,
               alt: alt || "",
              });
              }
        }
   
         const newActivity = await Activity.create({...body, gallery:finalGallery , published , publishedAt});
          return NextResponse.json(
              {
                message: body.submitType === "publish" ? "Package Published" : "Draft Saved",
                data: newActivity
              },
              { status: 200 }
            );
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Something went wrong!"},{status:500});
    }
}