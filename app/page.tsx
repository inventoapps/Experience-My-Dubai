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
import Test from "@/components/Test"
import Slider from '@/components/Slider'
import HeaderTop from "@/components/HeaderTop";
import TourPackage from "@/components/TourPackages";
import PackageInfoSecond from '@/components/PackageInfoSecond'
import Services from "@/components/ServiceSection";
export default  function Home() {

  return (
    <div className="min-h-screen  bg-zinc-50 font-sans dark:bg-black overflow-hidden">
        {/* Hero Section with Hero Bottom */}
       <Hero/>
       <HeroBottom/>

       {/* First para of popular packages */}
       <PopularPackagesInfo/>


      
       {/* Popular Packages */}
        <PopularPackages/>

        {/* Packages By Region */}
        <PackageByRegion/>


        {/* Top Experience or Activity Section */}
       <TopExperience/>


       {/* More Tour packages */}
       <TourPackage/>
       
       {/* Form Section */}
       <FormSection/>

        {/* Services Section [Transport , Hotels , Guide]  */}
       <Services/>
    
        {/* Why Choose Us Section  */}

       <WhyChooseUs/>

       {/* User Testimonials */}
       <Testimonials/>

  
       {/* 4 images in Gallery */}
       <Gallery/>
      
      {/* Blog Section  */}
      <Blogs/>
       
      {/*  Secton Para of package Info */}
       <PackageInfoSecond/>

       {/* Frequently Asked Questions */}
       <FAQSection faqs={faqs} />

       {/* About Dubai Tourism */}
       <AboutDubaiTourism/>

       

    </div>
  );
}
