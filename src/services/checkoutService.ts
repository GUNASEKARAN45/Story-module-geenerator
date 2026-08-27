export async function processPayment(req: { paymentMethod: string; cardNumber?: string; amount: number }) {
  if (req.cardNumber && req.cardNumber.startsWith("4000")) throw new Error("Card declined");
  const transactionId = "tx_stripe_" + Math.random().toString(36).substring(2, 9);
  return { ok: true, transactionId, pdfReceiptUrl: `https://storage.cadence.internal/invoices/${transactionId}.pdf` };
}