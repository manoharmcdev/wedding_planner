export interface Vendor {
  id: string;
  name: string;
  slug: string;

  category: string;
  subcategory: string;
  location: string;

  rating: number;
  reviewCount: number;

  startingPrice: number;

  verified: boolean;
  featured: boolean;

  description: string;

  coverImage: string;
  images: string[];

  /**
   * Contact information is protected.
   * These values must NOT be returned by the public API
   * until the user has successfully completed payment.
   */
  instagram: string;
  whatsapp: string;

  /**
   * Indicates whether contact information requires payment
   * before it can be accessed.
   */
  contactLocked: boolean;
}