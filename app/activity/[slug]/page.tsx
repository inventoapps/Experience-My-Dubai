import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";

export const revalidate = 60 * 60 * 12;

// 👇 CLIENT ONLY COMPONENT
const ClientDetails = dynamic(() => import("./ClientDetails"), {
  ssr: false,
});

async function getActivity(slug: string) {
  await connectDB();
  const activity = await Activity.findOne({ slug }).lean();
  return activity;
}

export async function generateStaticParams() {
  await connectDB();
  const activities = await Activity.find({}, { slug: 1 }).lean();

  return activities.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ActivityPage({
  params,
}: {
  params: { slug: string };
}) {
  const pkg = await getActivity(params.slug);

  if (!pkg) notFound();

  return (
    <>
      <Navbar theme="light" />
      <ClientDetails pkg={pkg} />
    </>
  );
}
