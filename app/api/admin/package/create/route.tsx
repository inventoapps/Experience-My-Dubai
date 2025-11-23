import { TourPackage } from "@/models/package";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";


export async function POST(req:NextRequest) {
  try {
    
     await connectDB();
     
     const body = await req.json();
     
     const pkg = await TourPackage.create(body);

    return NextResponse.json({
      message: "Package created successfully",
      data: pkg,
    } ,{status:200}
  );
    
  } catch (error:any) {
    console.log("This is the error",error);
    return NextResponse.json({error:"Internal Server Error"},{status:500});
  }
}