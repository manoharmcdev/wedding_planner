export interface CreateEnquiryInput {
  vendorId: number;
  name: string;
  weddingDate: string;
  guestCount: number;
  message: string;
}

export async function createEnquiry(data: CreateEnquiryInput) {
  if (
    !data.vendorId ||
    !data.name ||
    !data.weddingDate ||
    !data.guestCount ||
    !data.message
  ) {
    return {
      success: false,
      message: "Please complete all enquiry details."
    };
  }

  return {
    success: true,
    message: "Enquiry submitted successfully.",
    data
  };
}