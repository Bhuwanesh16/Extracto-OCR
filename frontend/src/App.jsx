import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!image) {
      setPreviewUrl("");
      return undefined;
    }

    const nextUrl = URL.createObjectURL(image);
    setPreviewUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [image]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      setError("Please select a valid image file (PNG, JPG, JPEG, TIFF).");
      setImage(null);
      setPreviewUrl("");
      return;
    }

    setError("");
    setImage(file);
  };

  const uploadImage = async () => {
    if (!image) {
      setError("Add an image before extracting text.");
      return;
    }

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://127.0.0.1:5000/ocr", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("The server could not process this image. Try again.");
      }

      const data = await response.json();
      setText(data.text || "");
    } catch (err) {
      setText("");
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Industrial-grade OCR Utility</p>
        <h1>Extracto OCR</h1>
        <p className="lede">
          Upload an image, extract the text, and keep your workflow moving with
          a clean, reliable interface.
        </p>
      </header>

      <main className="grid">
        <section className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Step 1</p>
              <h2>Upload an image</h2>
              <p className="muted">
                Supported formats: PNG, JPG, JPEG, TIFF. Max 10 MB recommended.
              </p>
            </div>
            <div className="status-row">
              <span
                className={`status-dot ${
                  error ? "status-error" : image ? "status-ready" : "status-idle"
                }`}
              />
              <span className="status-label">
                {error
                  ? "Needs attention"
                  : image
                  ? "Ready to extract"
                  : "Waiting for file"}
              </span>
            </div>
          </div>

          <label className="file-drop" htmlFor="file-input">
            {previewUrl ? (
              <img src={previewUrl} alt="Selected" className="preview" />
            ) : (
              <div className="file-drop__placeholder">
                <div className="icon-circle">⬆️</div>
                <p className="drop-title">Drag & drop or browse</p>
                <p className="muted small">
                  High-contrast scans deliver the best results.
                </p>
              </div>
            )}
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="visually-hidden"
          />

          <div className="actions">
            <label className="btn secondary" htmlFor="file-input">
              Choose Image
            </label>
            <button
              className="btn primary"
              onClick={uploadImage}
              disabled={!image || isLoading}
            >
              {isLoading ? "Extracting..." : "Extract Text"}
            </button>
          </div>

          {image && (
            <div className="file-meta">
              <div>
                <p className="muted">Selected file</p>
                <p className="file-name">{image.name}</p>
              </div>
              <p className="muted">{(image.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          )}

          {error && <div className="alert error">{error}</div>}
        </section>

        <section className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Step 2</p>
              <h2>Extracted text</h2>
              <p className="muted">
                Text is ready to copy, review, or hand off downstream.
              </p>
            </div>
            {isLoading && <span className="badge">Processing</span>}
          </div>

          <textarea
            rows="14"
            value={text}
            readOnly
            placeholder="Your extracted text will appear here after processing."
          />
        </section>
      </main>
    </div>
  );
}

export default App;
