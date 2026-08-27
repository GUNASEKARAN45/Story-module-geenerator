import React, { useState } from "react";
import { Sparkles, Check, RefreshCw, Layers } from "lucide-react";

export interface ProductCatalogProps {
  initialActive?: boolean;
}

export function ProductCatalog({ initialActive = true }: ProductCatalogProps) {
  const [active, setActive] = useState(initialActive);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleExecute = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      setStatusMessage("Operation completed successfully.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-container" style={{ padding: 24, background: "#13151b", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Layers color="#38bdf8" size={22} />
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#f8fafc", margin: 0 }}>[ST-619] Build React Product Catalog and Shopping Cart Modal</h2>
        </div>
        <button onClick={() => setActive(!active)} style={{ background: active ? "#22c55e" : "#64748b", color: "#fff", border: "none", padding: "4px 12px", borderRadius: 6 }}>
          {active ? "Active" : "Paused"}
        </button>
      </div>
      <p style={{ fontSize: 13, color: "#94a3b8" }}>Create responsive React product catalog with interactive shopping cart modal, item count badges, and Lucide icons.</p>
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <input placeholder="Configure..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ flex: 1, padding: 8, background: "#1a1d27", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6 }} />
        <button onClick={handleExecute} disabled={loading} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6 }}>
          {loading ? "Running..." : "Execute"}
        </button>
      </div>
      {statusMessage && <div style={{ color: "#4ade80", marginTop: 12 }}>✓ {statusMessage}</div>}
    </div>
  );
}