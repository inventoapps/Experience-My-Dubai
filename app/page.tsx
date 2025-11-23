import Image from "next/image";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PopularPackages from "@/components/PopularPackages"
import HeroBottom from "@/components/HeroBottom";
import RecentlyBooked from "@/components/RecentlyBooked";
import CarouselDemo from "@/components/CarouselDemo";
import PackageByRegion from "@/components/PackageByRegion";
import TopExperience from "@/components/TopExperience";
import FormSection from "@/components/FormSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Blogs from "@/components/Blogs";
import FAQSection from "@/components/FAQSection";
import AboutDubaiTourism from "@/components/AboutDubaiTourism";
import FinalCTA from "@/components/FinalCTA";
import PopularPackagesInfo from "@/components/PopularPackageInfo";
import { faqs } from "@/config/constant";


export default function Home() {
  return (
    <div className="min-h-screen  bg-zinc-50 font-sans dark:bg-black">
       <Hero/>
       <HeroBottom/>
       <PopularPackagesInfo/>
       <PopularPackages/>
       <PackageByRegion/>
       <TopExperience/>
       <FormSection/> 
       <WhyChooseUs/>
       <Testimonials/>
       <Gallery/>
       <Blogs/>
       <FAQSection faqs={faqs} />
       <AboutDubaiTourism/>
       <FinalCTA/>
      

    </div>
  );
}
