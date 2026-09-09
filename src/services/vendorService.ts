import vendorsData from "@/data/vendors.json";
import type { Vendor } from "@/types/vendor";

const vendors = vendorsData as Vendor[];

export async function getVendors(): Promise<Vendor[]> {
  return vendors;
}

export async function getFeaturedVendors(): Promise<Vendor[]> {
  return vendors.filter((vendor) => vendor.featured);
}

export async function getVendorBySlug(
  slug: string,
): Promise<Vendor | undefined> {
  return vendors.find((vendor) => vendor.slug === slug);
}