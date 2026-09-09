import ScrollToTop from "@/components/common/ScrollToTop";
import VendorsListing from "@/components/vendor/VendorsListing";
import { getCategories } from "@/services/categoryService";
import { getLocations } from "@/services/locationService";
import { getVendors } from "@/services/vendorService";

interface VendorsPageProps {
  searchParams: Promise<{
    location?: string;
    category?: string;
  }>;
}

export default async function VendorsPage({
  searchParams,
}: VendorsPageProps) {
  const params = await searchParams;

  const [vendors, categories, locations] =
    await Promise.all([
      getVendors(),
      getCategories(),
      getLocations(),
    ]);

  return (
    <>
      <ScrollToTop />

      <main>
        <VendorsListing
          vendors={vendors}
          categories={categories}
          locations={locations}
          initialLocation={params.location ?? "all"}
          initialCategory={params.category ?? "all"}
        />
      </main>
    </>
  );
}