import Navbar from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import FormSection from "@/components/FormSection";
import Banner from "@/components/Banner";
import HeroBottom from "@/components/HeroBottom";
import BlogGrid from "./BlogsGrid";

 async function getBlogs(){
  const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/getAll` ,
     {next:{revalidate:60}});

  if(!res.ok){
     throw new Error("Error In fetching Blogs")
  }

  const data = await res.json();
  return data.data;
}

export default async function Blogs() {
   
     const blogs = await getBlogs();



  
  return (
    <>
     <Navbar theme={"dark"}/>
     <Banner title={"Dubai Travel Blogs"}/>
     <HeroBottom/>

     <section className="px-6 py-16 max-w-7xl mx-auto mt-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-10">
        Latest Dubai Travel Blogs
      </h2>


      <BlogGrid blogs={blogs}/>

      <FormSection/>
      <WhyChooseUs/>
    </section>

    </>
    );
}
