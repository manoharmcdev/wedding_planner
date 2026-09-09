export interface Payment {
  id: number;
  userId: number;
  vendorId: number;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  purpose: "CONTACT_UNLOCK";
  createdAt: string;
}