import { TourPackage } from "@/models/package";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }

    const updated = await TourPackage.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true,
    });

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
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
