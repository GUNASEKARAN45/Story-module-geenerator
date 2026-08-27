import { describe, it, expect } from "vitest";
import { handleProductCatalogAction } from "../src/services/productsService";

describe("ProductCatalog", () => {
  it("executes business logic cleanly", async () => {
    const res = await handleProductCatalogAction("query");
    expect(res.status).toBe("success");
  });
});