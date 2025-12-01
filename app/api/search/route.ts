import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TourPackage } from "@/models/package";
import Activity from "@/models/Activity";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const result1 = await TourPackage.find(
  { title: { $regex: q, $options: "i" } },
  { title: 1, slug: 1, gallery: 1 }
).limit(4);

const result2 = await Activity.find(
  { title: { $regex: q, $options: "i" } },
  { title: 1, slug: 1, gallery: 1 }
).limit(4);

// Combine as a single array
const finalResult = [...result1, ...result2];

return NextResponse.json(finalResult);

}
