import { getVendors } from "@/services/vendorService";
import type { Vendor } from "@/types/vendor";

const STORAGE_KEY = "wednest_favorites";

function getFavoriteIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (id): id is string => typeof id === "string",
    );
  } catch {
    return [];
  }
}

function saveFavoriteIds(ids: string[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...new Set(ids)]),
  );
}

export async function getFavoriteVendors(): Promise<Vendor[]> {
  const favoriteIds = getFavoriteIds();

  if (favoriteIds.length === 0) {
    return [];
  }

  const vendors = await getVendors();

  return favoriteIds
    .map((id) => vendors.find((vendor) => vendor.id === id))
    .filter((vendor): vendor is Vendor => Boolean(vendor));
}

export function isFavorite(vendorId: string): boolean {
  return getFavoriteIds().includes(vendorId);
}

export function addFavorite(vendorId: string): void {
  const favoriteIds = getFavoriteIds();

  if (!favoriteIds.includes(vendorId)) {
    favoriteIds.push(vendorId);
  }

  saveFavoriteIds(favoriteIds);
}

export function removeFavorite(vendorId: string): void {
  const favoriteIds = getFavoriteIds().filter(
    (id) => id !== vendorId,
  );

  saveFavoriteIds(favoriteIds);
}

export function toggleFavorite(vendorId: string): boolean {
  if (isFavorite(vendorId)) {
    removeFavorite(vendorId);
    return false;
  }

  addFavorite(vendorId);
  return true;
}

export function getFavoriteCount(): number {
  return getFavoriteIds().length;
}

export function clearFavorites(): void {
  saveFavoriteIds([]);
}