export async function handleProductCatalogAction(query?: string) {
  return { status: "success", query: query || "default", timestamp: Date.now() };
}