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
export default  function Home() {

  return (
    <div className="min-h-screen  bg-zinc-50 font-sans dark:bg-black overflow-hidden">
        <HeaderTop/>
        <Hero/>
       <HeroBottom/>
       <PopularPackagesInfo/>
      
       <section id="packages">
          <PopularPackages/>
       </section>

        <PackageByRegion/>
       
       <TopExperience/>
       <TourPackage/>
       <FormSection/> 
       <section id="whyChooseUs">

       <WhyChooseUs/>
       <Testimonials/>

       </section>
       
       <Gallery/>
       <section id="blogs">
          <Blogs/>
       </section>

       <PackageInfoSecond/>
       <FAQSection faqs={faqs} />
       <AboutDubaiTourism/>

       <FinalCTA/> 

    </div>
  );
}
