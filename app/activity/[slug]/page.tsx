import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";
import ClientDetails from "./ClientDetails";

// ISR
export const revalidate = 60 * 60 * 12;

async function getActivity(slug: string) {
  await connectDB();

  const activity = await Activity.findOne({ slug }).lean();

  if (!activity) return null;

  return JSON.parse(JSON.stringify(activity));
}

export async function generateStaticParams() {
  await connectDB();

  const activities = await Activity.find({}, { slug: 1 });

  return activities.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ActivityPage({
  params,
}: {
  params: { slug: string };
}) {
  const activity = await getActivity(params.slug);

  if (!activity) notFound();

  return (
    <>
      <Navbar theme="light" />
      <ClientDetails pkg={activity} />
    </>
  );
}
