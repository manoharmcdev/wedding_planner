import locationsData from "@/data/locations.json";

export interface LocationOption {
  id: string;
  name: string;
}

const locations = locationsData as unknown as LocationOption[];

export async function getLocations(): Promise<LocationOption[]> {
  return locations;
}