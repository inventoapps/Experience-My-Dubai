import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props ): Promise<Metadata> {
  const slug = (await params).slug

   const res = await fetch(`http://localhost:3000/api/activity/get/${slug}`);


  const post = await res.json();

  return {
    title: post?.title || "Activiy Details",
    description: post?.description || "Explore Activiy Packages",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
