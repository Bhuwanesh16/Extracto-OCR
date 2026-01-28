import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    // Image preview only
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    setPreviewUrl("");
  }, [file]);

  const applyFile = (selectedFile) => {
    if (!selectedFile) return;

    const isImage = selectedFile.type.startsWith("image/");
    const isPdf = selectedFile.type === "application/pdf";

    if (!isImage && !isPdf) {
      setError("Supported formats: PNG, JPG, JPEG, TIFF, PDF.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    applyFile(selectedFile);
  };

  const resetAll = () => {
    setFile(null);
    setText("");
    setError("");
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Add a file before extracting text.");
      return;
    }

    setIsLoading(true);
    setError("");
    setCopied(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/ocr", {
        method: "POST",
        body: formData
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.error || `Request failed (${response.status}). Please try again.`
        );
      }

      setText(data?.text || "");
    } catch (err) {
      setText("");
      setError(err.message || "Something went wrong.");
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
          Upload an image or scanned PDF and extract text instantly.
        </p>
      </header>

      <main className="grid">
        {/* STEP 1 */}
        <section className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Step 1</p>
              <h2>Upload a file</h2>
              <p className="muted">
                Supported formats: PNG, JPG, JPEG, TIFF, PDF.
              </p>
            </div>

            <div className="status-row">
              <span
                className={`status-dot ${
                  error
                    ? "status-error"
                    : file
                    ? "status-ready"
                    : "status-idle"
                }`}
              />
              <span className="status-label">
                {error
                  ? "Needs attention"
                  : file
                  ? "Ready to extract"
                  : "Waiting for file"}
              </span>
            </div>
          </div>

          <label
            className={`file-drop ${isDragging ? "is-dragging" : ""}`}
            htmlFor="file-input"
            onDragEnter={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              applyFile(e.dataTransfer.files?.[0]);
            }}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="preview" />
            ) : file?.type === "application/pdf" ? (
              <div className="file-drop__placeholder">
                <div className="icon-circle">📄</div>
                <p className="drop-title">PDF selected</p>
                <p className="muted small">Scanned PDFs are supported</p>
              </div>
            ) : (
              <div className="file-drop__placeholder">
                <div className="icon-circle">⬆️</div>
                <p className="drop-title">Drag & drop, or click to browse</p>
                <p className="muted small">
                  High-contrast scans work best.
                </p>
              </div>
            )}
          </label>

          <input
            id="file-input"
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="visually-hidden"
          />

          <div className="actions">
            <label className="btn secondary" htmlFor="file-input">
              Choose File
            </label>

            <button
              className="btn primary"
              onClick={uploadFile}
              disabled={!file || isLoading}
            >
              {isLoading ? "Extracting..." : "Extract Text"}
            </button>
          </div>

          {file && (
            <div className="file-meta">
              <div>
                <p className="muted">Selected file</p>
                <p className="file-name">{file.name}</p>
              </div>
              <div className="file-meta__right">
                <p className="muted">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  className="btn tertiary"
                  onClick={resetAll}
                  disabled={isLoading}
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {error && <div className="alert error">{error}</div>}
        </section>

        {/* STEP 2 */}
        <section className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Step 2</p>
              <h2>Extracted text</h2>
              <p className="muted">
                Text is ready to copy or reuse.
              </p>
            </div>

            <div className="header-actions">
              {isLoading ? (
                <span className="badge info">Processing</span>
              ) : text ? (
                <span className="badge success">Ready</span>
              ) : (
                <span className="badge subtle">No output yet</span>
              )}

              <button
                className="btn secondary"
                onClick={copyToClipboard}
                disabled={!text || isLoading}
              >
                {copied ? "Copied" : "Copy"}
              </button>

              <button
                className="btn tertiary"
                onClick={() => setText("")}
                disabled={!text || isLoading}
              >
                Clear
              </button>
            </div>
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
