import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props ): Promise<Metadata> {
  const slug = (await params).slug

   const res = await fetch(`http://localhost:3000/api/package/get/${slug}`);


  const post = await res.json();
  console.log(post.title);
  console.log(post.description);

  return {
    title: post?.title || "Package Details",
    description: post?.description || "Explore travel packages",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
