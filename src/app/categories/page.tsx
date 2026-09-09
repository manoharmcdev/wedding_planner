import ScrollToTop from "@/components/common/ScrollToTop";
import CategoriesListing from "@/components/categories/CategoriesListing";
import { getCategories } from "@/services/categoryService";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <ScrollToTop />

      <CategoriesListing categories={categories} />
    </>
  );
}