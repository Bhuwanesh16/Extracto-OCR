from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
from pdf2image import convert_from_path
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Tesseract path (Windows)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Poppler path (Windows) – change if needed
POPPLER_PATH = r"C:\poppler\Library\bin"

@app.route("/ocr", methods=["POST"])
def ocr():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filename = file.filename.lower()
    path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(path)

    extracted_text = ""

    try:
        # ✅ PDF OCR
        if filename.endswith(".pdf"):
            pages = convert_from_path(path, poppler_path=POPPLER_PATH)

            for i, page in enumerate(pages):
                page_text = pytesseract.image_to_string(page)
                extracted_text += f"\n--- Page {i + 1} ---\n{page_text}"

        # ✅ Image OCR
        else:
            img = Image.open(path)
            extracted_text = pytesseract.image_to_string(img)

        return jsonify({"text": extracted_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
