export interface VendorReview {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export interface VendorProfile {
  vendorId: string;
  about: string;
  experience: string;
  services: string[];
  highlights: string[];
  gallery: string[];
  reviews: VendorReview[];
}