export async function unlockContact(
  vendorId: number,
  amount: number
) {
  if (!vendorId || !amount) {
    return {
      success: false,
      message: "Invalid payment information."
    };
  }

  return {
    success: true,
    paymentId: `MOCK-${Date.now()}`,
    vendorId,
    amount,
    message: "Contact unlocked successfully."
  };
}