import Header from "@/components/layout/Header";
import FavoritesContent from "@/components/favorites/FavoritesContent";
import ScrollToTop from "@/components/common/ScrollToTop";

export default function FavoritesPage() {
  return (
    <>
      <Header />

      <FavoritesContent />

      <ScrollToTop />
    </>
  );
}