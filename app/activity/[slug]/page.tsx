import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import ClientDetails from "./ClientDetails";

const revalidate = 60 * 60 * 12;



async function getActivity(slug : string) {
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/activity/get/${slug}`);
   
   if(!res.ok){
      throw new Error("Failed to get activity");
   }

   const data = await res.json();
   return data.data;
}

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/activity/get`);

    const data = await res.json();



    return data.data.map((item: any) => ({
    slug: item.slug,
  }));
}

export default async function ActivityPage({params} : {params:Promise<{slug:string}>}){
     const slug = (await params).slug;
     const pkg = await getActivity(slug);

    if (!pkg) notFound();

    return (
      <>
        <Navbar theme="light" />
        <ClientDetails pkg={pkg} />
      </>
    );

}