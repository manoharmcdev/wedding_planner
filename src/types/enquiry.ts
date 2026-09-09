export interface Enquiry {
  id: number;
  vendorId: number;
  userId: number;
  name: string;
  weddingDate: string;
  guestCount: number;
  message: string;
  status: "PENDING" | "CONTACTED" | "CLOSED";
}