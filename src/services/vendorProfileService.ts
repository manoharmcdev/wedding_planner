import vendorProfilesData from "@/data/vendorProfiles.json";
import type { VendorProfile } from "@/types/vendorProfile";

const vendorProfiles = vendorProfilesData as VendorProfile[];

export async function getVendorProfile(
  vendorId: string,
): Promise<VendorProfile | undefined> {
  return vendorProfiles.find(
    (profile) => profile.vendorId === vendorId,
  );
}