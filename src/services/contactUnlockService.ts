const STORAGE_KEY = "wednest_contact_unlocks";

function getUnlocks(): Record<string, boolean> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return {};
    }

    const parsed: unknown = JSON.parse(stored);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return {};
    }

    return parsed as Record<string, boolean>;
  } catch {
    return {};
  }
}

function saveUnlocks(
  unlocks: Record<string, boolean>,
): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(unlocks),
  );
}

export function isContactUnlocked(
  vendorId: string,
): boolean {
  const unlocks = getUnlocks();

  return unlocks[vendorId] === true;
}

export function saveContactUnlock(
  vendorId: string,
): void {
  const unlocks = getUnlocks();

  unlocks[vendorId] = true;

  saveUnlocks(unlocks);
}

export function removeContactUnlock(
  vendorId: string,
): void {
  const unlocks = getUnlocks();

  delete unlocks[vendorId];

  saveUnlocks(unlocks);
}

export function clearContactUnlocks(): void {
  saveUnlocks({});
}