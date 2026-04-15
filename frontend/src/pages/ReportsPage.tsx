import { useEffect, useId, useMemo, useRef, useState } from "react";
import "../App.css";

type ReportCategory = "Plast" | "Glas" | "Metall" | "Papper" | "Övrigt";
type ReportAmount = "Small" | "Medium" | "Large";

export function ReportsPage(props: { openImagePickerSignal?: number }) {
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  useEffect(() => {
    if (!props.openImagePickerSignal) return;
    // Auto-open file picker when user taps camera button (kamera -> välj bild)
    fileInputRef.current?.click();
  }, [props.openImagePickerSignal]);

  return (
    <div className="page">
      <header className="page-header">
        <div className="page-title">
          <div className="eyebrow">Reports</div>
          <h1 className="h1">Anmäl skräpigt område</h1>
          <p className="muted">
            Lägg till bild + plats och välj kategori/mängd. (Ready för backend
            senare)
          </p>
        </div>
      </header>

      <main className="reports-layout">
        <section className="card reports-image">
          <div className="reports-image-inner">
            {imageUrl ? (
              <img className="reports-preview" src={imageUrl} alt="Preview" />
            ) : (
              <div className="reports-placeholder">
                <div className="placeholder-badge">Bild</div>
                <div className="placeholder-title">Lägg till en bild</div>
                <div className="placeholder-sub">
                  Ta foto eller välj från fil. (förbereder upload)
                </div>
              </div>
            )}

            <div className="reports-image-actions">
              <input
                id={fileInputId}
                ref={fileInputRef}
                className="sr-only"
                type="file"
                accept="image/*"
                onChange={(e) => onPickImage(e.target.files?.[0] ?? null)}
              />
              <label className="btn btn-secondary" htmlFor={fileInputId}>
                Välj bild
              </label>
              <button
                className="btn btn-tertiary"
                type="button"
                onClick={() => setImageUrl(null)}
                disabled={!imageUrl}
              >
                Ta bort
              </button>
            </div>
          </div>
        </section>

        <section className="card reports-form">
          <div className="form-grid">
            <div className="field">
              <div className="label">Plats</div>
              <div className="field-row">
                <input
                  className="input"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  placeholder="Skriv adress / platsnamn (placeholder)"
                />
                <button className="btn btn-secondary" type="button" disabled>
                  Använd GPS
                </button>
              </div>
              <div className="hint">
                Placeholder för location input (kopplas till map/GPS senare).
              </div>
            </div>

            <div className="field">
              <div className="label">Kategori</div>
              <div className="chips">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={
                      c === category ? "chip chip-active" : "chip chip-idle"
                    }
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <div className="label">Mängd</div>
              <div className="segmented" role="tablist" aria-label="Amount">
                {(["Small", "Medium", "Large"] as const).map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={a === amount ? "seg seg-active" : "seg seg-idle"}
                    onClick={() => setAmount(a)}
                    role="tab"
                    aria-selected={a === amount}
                  >
                    {a === "Small" ? "Liten" : a === "Medium" ? "Mellan" : "Stor"}
                  </button>
                ))}
              </div>
              <div className="hint">
                Values hålls enkla (small/medium/large) så backend kan mappa
                senare.
              </div>
            </div>
          </div>

          <div className="reports-cta">
            <button className="btn btn-primary btn-xl" type="button">
              ANMÄL SKRÄPIGT OMRÅDE
            </button>
            <div className="hint">
              Skickar inte data än (ingen backend). Just layout + struktur.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

