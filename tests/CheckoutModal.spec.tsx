import { describe, it, expect } from "vitest";
import { processPayment } from "../src/services/checkoutService";

describe("CheckoutModal", () => {
  it("processes payments successfully", async () => {
    const result = await processPayment({ paymentMethod: "card", amount: 97.91 });
    expect(result.ok).toBe(true);
  });
});