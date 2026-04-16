import { useId, useMemo, useState } from "react";
import "../App.css";

type ReportCategory = "Plast" | "Glas" | "Metall" | "Papper" | "Övrigt";
type ReportAmount = "Small" | "Medium" | "Large";

// Placeholder page file (ej inkopplad just nu) – Map är enda funktionella sidan
export function ReportsPage() {
  const fileInputId = useId();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [locationText, setLocationText] = useState("");
  const [category, setCategory] = useState<ReportCategory>("Plast");
  const [amount, setAmount] = useState<ReportAmount>("Small");

  const categories: ReportCategory[] = useMemo(
    () => ["Plast", "Glas", "Metall", "Papper", "Övrigt"],
    [],
  );

  function onPickImage(file: File | null) {
    if (!file) return;
    // Create preview URL (förhandsvisning), backend upload later
    const next = URL.createObjectURL(file);
    setImageUrl(next);
  }

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ margin: 0 }}>Reports</h2>
      <p style={{ opacity: 0.75, marginTop: 6 }}>
        Placeholder-fil för Reports-flödet. Inte inkopplad i navigationen just nu.
      </p>

      <div style={{ marginTop: 14 }}>
        <input
          id={fileInputId}
          type="file"
          accept="image/*"
          onChange={(e) => onPickImage(e.target.files?.[0] ?? null)}
        />
        {imageUrl && (
          <div style={{ marginTop: 10 }}>
            <img
              src={imageUrl}
              alt="Preview"
              style={{ width: "100%", maxWidth: 420, borderRadius: 12 }}
            />
          </div>
        )}
      </div>

      <div style={{ marginTop: 14 }}>
        <label>
          Plats:
          <input
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            placeholder="Skriv adress / platsnamn"
            style={{ display: "block", width: "100%", maxWidth: 420, marginTop: 6 }}
          />
        </label>
      </div>

      <div style={{ marginTop: 14 }}>
        <div>Kategori:</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              style={{
                padding: "8px 10px",
                borderRadius: 999,
                border: "1px solid rgba(164,164,164,0.55)",
                background: c === category ? "rgba(160,223,16,0.26)" : "rgba(247,255,228,0.9)",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <div>Mängd:</div>
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          {(["Small", "Medium", "Large"] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmount(a)}
              style={{
                padding: "8px 10px",
                borderRadius: 12,
                border: "1px solid rgba(164,164,164,0.55)",
                background: a === amount ? "rgba(67,202,142,0.22)" : "rgba(247,255,228,0.9)",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 16, opacity: 0.8 }}>
        <div>Selected:</div>
        <div>
          {category} / {amount} / {locationText || "(ingen plats)"}
        </div>
      </div>
    </div>
  );
}

