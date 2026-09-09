import type { User } from "@/types/user";

const STORAGE_KEY = "wednest_user";

export function saveUser(user: User): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user),
  );
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}

export function isLoggedIn(): boolean {
  return getStoredUser() !== null;
}