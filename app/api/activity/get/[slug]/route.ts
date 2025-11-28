import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

 
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    const packageData = await Activity.findOne({ slug });

    if (!packageData) {
      return NextResponse.json(
        { message: "Package Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Package fetched successfully",
        data: packageData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET_PACKAGE_ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
