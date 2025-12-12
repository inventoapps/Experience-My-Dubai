import { connectDB } from "@/lib/mongodb";
import { TourPackage } from "@/models/package";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ query: string }> }
) {
  try {
    await connectDB();

    const {query} = await params;

    let PopularPackages;

    if (query === '4') {
    
      PopularPackages = await TourPackage.find({
        "duration.days": { $lt: 5 }
      });
    }
     else if (query === '3') {
      // 10+ days
    
      PopularPackages = await TourPackage.find({
        "duration.days": { $gte: 10 }
      });
    }
     else if (query === '2') {
      // 5–8 days

      PopularPackages = await TourPackage.find({
        "duration.days": { $gte: 5, $lte: 8 }
      });
    } 
     else {
      // All
 
      PopularPackages = await TourPackage.find({});
    }

    return NextResponse.json(
      { message: "Get packages", data: PopularPackages },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
