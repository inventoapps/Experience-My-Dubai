import { notFound } from "next/navigation";
import ClientDetails from "./ClientDetails";


/* Fetch Single Activity */

async function getActivity(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/activity/get/${slug}`,
    {
      next: { revalidate:60 },
    }
  );

  if (!res.ok) return null;

  const json = await res.json();
  return json?.data ?? null;
}

/* Generate Static Params */
// export async function generateStaticParams() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/activity/get`,
//     {
//       cache: "force-cache",
//     }
//   );

//   if (!res.ok) return [];

//   const json = await res.json();

//   return json.data.map((item: { slug: string }) => ({
//     slug: item.slug,
//   }));
// }

export default async function ActivityPage({params} : {params:Promise<{slug:string}>}){
     const slug = (await params).slug;
     const pkg = await getActivity(slug);

    if (!pkg) notFound();

    return (
      <>
        <ClientDetails pkg={pkg} />
      </>
    );

}