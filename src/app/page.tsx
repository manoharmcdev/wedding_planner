import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedVendors from "@/components/home/FeaturedVendors";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FinalCTA from "@/components/home/FinalCTA";
import ContactForm from "@/components/home/ContactForm";
import FindVendors from "@/components/home/FindVendors";
import { getCategories } from "@/services/categoryService";
import { getLocations } from "@/services/locationService";

export default async function HomePage() {
    const [categories, locations] = await Promise.all([
    getCategories(),
    getLocations(),
  ]);
  
  return (
    <>
      <Header />

      <main>
        <Hero />
        <CategorySection />
        <FeaturedVendors />
        <WhyChooseUs />
         <FindVendors
        categories={categories}
        locations={locations}
      />
        <ContactForm />
        <FinalCTA />
      </main>
    </>
  );
}