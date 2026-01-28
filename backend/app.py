from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
from pdf2image import convert_from_path
import os
import traceback

app = Flask(__name__)
CORS(app)

# -------------------- Configuration --------------------
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Tesseract path (Windows)
TESSERACT_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
if os.path.exists(TESSERACT_PATH):
    pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH
else:
    print(f"⚠️ Warning: Tesseract path not found: {TESSERACT_PATH}")

# ✅ Poppler path (manual install)
POPPLER_PATH = r"C:\Users\bhuwa\Downloads\Release-25.12.0-0\poppler-25.12.0\Library\bin"
if not os.path.exists(POPPLER_PATH):
    print(f"⚠️ Warning: Poppler path does not exist: {POPPLER_PATH}")

# -------------------- Routes --------------------
@app.route("/ocr", methods=["POST"])
def ocr():
    print("📥 OCR request received")

    try:
        uploaded = request.files.get("file") or request.files.get("image")
        if not uploaded:
            print("❌ No file key found")
            return jsonify({"error": "No file uploaded"}), 400

        filename = uploaded.filename
        if filename == "":
            print("❌ Empty filename")
            return jsonify({"error": "Empty filename"}), 400

        print("📄 Filename:", filename)

        # Ensure safe filename
        filename = os.path.basename(filename)
        path = os.path.join(UPLOAD_FOLDER, filename)
        uploaded.save(path)
        print("💾 File saved at:", path)

        extracted_text = ""

        # ================= PDF OCR =================
        if filename.lower().endswith(".pdf"):
            print("📄 Processing PDF...")

            if not os.path.exists(POPPLER_PATH):
                return (
                    jsonify(
                        {
                            "error": f"PDF processing requires Poppler. Install Poppler and set POPPLER_PATH correctly. Current: {POPPLER_PATH}"
                        }
                    ),
                    400,
                )

            try:
                pages = convert_from_path(
                    path,
                    dpi=300,
                    poppler_path=POPPLER_PATH,
                )
            except Exception as e:
                return (
                    jsonify(
                        {
                            "error": f"Failed to read PDF. Ensure Poppler is installed and the PDF is valid. Details: {e}"
                        }
                    ),
                    400,
                )

            print(f"📑 Total pages: {len(pages)}")
            for i, page in enumerate(pages):
                print(f"🔍 OCR page {i + 1}")
                extracted_text += f"\n--- Page {i + 1} ---\n"
                extracted_text += pytesseract.image_to_string(page)

        # ================= IMAGE OCR =================
        else:
            print("🖼 Processing image...")
            try:
                img = Image.open(path)
            except Exception as e:
                return jsonify({"error": f"Invalid image file. Details: {e}"}), 400

            if not os.path.exists(TESSERACT_PATH):
                return (
                    jsonify(
                        {
                            "error": "Tesseract not found. Install Tesseract OCR and verify the path in backend/app.py."
                        }
                    ),
                    400,
                )
            extracted_text = pytesseract.image_to_string(img)

        print("✅ OCR completed successfully")
        return jsonify({"text": extracted_text})

    except Exception as e:
        print("🔥 OCR FAILED 🔥")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
