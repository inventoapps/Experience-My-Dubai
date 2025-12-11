import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props ): Promise<Metadata> {
  const slug = (await params).slug

   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/package/get/${slug}`);


  const post = await res.json();
  

  return {
    title: post?.title || "Package Details",
    description: post?.description || "Explore travel packages",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
