import categories from "@/data/categories.json";
import type { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  return categories as unknown as Category[];
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | undefined> {
  return (categories as unknown as Category[]).find(
    (category) => category.slug === slug,
  );
}