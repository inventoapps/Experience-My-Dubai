import Navbar from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import FormSection from "@/components/FormSection";
import Banner from "@/components/Banner";
import HeroBottom from "@/components/HeroBottom";
import PackagesGrid from "./PackagesGrid";

async function getPackages() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/package/get`,
    {
      next: { revalidate: 60 }, 
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch packages");
  }

  const data = await res.json();
  return data.data;
}

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <>
      <Navbar theme="dark" />
      <Banner title="All Dubai Tour Packages" />
      <HeroBottom />

      <section className="px-6 py-16 max-w-7xl mx-auto mt-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-10">
          Explore Dubai Packages
        </h1>

        {/* CLIENT COMPONENT */}
        <PackagesGrid packages={packages} />

        <FormSection />
        <WhyChooseUs />
      </section>
    </>
  );
}
