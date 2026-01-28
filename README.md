# Extracto-OCR 📄

<div align="center">

**A lightweight, full-stack Optical Character Recognition (OCR) application**

[![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Flask](https://img.shields.io/badge/Flask-3.x-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Tesseract](https://img.shields.io/badge/Tesseract-OCR-blue)](https://github.com/tesseract-ocr/tesseract)

*Extract selectable, machine-readable text from images and PDFs instantly*

</div>

---

## 🌟 Overview

Extracto-OCR transforms images and scanned PDF documents into editable text through a clean, production-ready web interface. Built with modern technologies and designed for speed, accuracy, and user experience.

### ✨ Key Features

- **🎯 Drag & Drop Upload** - Intuitive file upload with visual feedback
- **📊 Live Validation** - Real-time file format and size checking
- **⚡ Fast Processing** - Powered by Tesseract OCR engine
- **📱 Responsive Design** - Works seamlessly on desktop and mobile
- **🌙 Dark Mode UI** - Industrial-grade dark interface for reduced eye strain
- **📋 One-Click Copy** - Instantly copy extracted text to clipboard
- **🔄 Multi-Page Support** - Process multi-page PDF documents
- **🛡️ Secure Processing** - Server-side file handling with validation

---

## 🏗️ Architecture

### Frontend Stack

```
React + Vite
├── Modern component architecture
├── Fast HMR (Hot Module Replacement)
├── Optimized production builds
└── Intuitive dark UI design
```

**Features:**
- Drag-and-drop file uploads
- Upload progress indicators
- Live file validation
- Text copy and reset actions
- Error handling with user-friendly messages

### Backend Stack

```
Flask REST API
├── Tesseract OCR integration
├── Poppler (pdf2image) for PDF processing
├── Multi-format support
└── Secure file handling
```

**Supported Formats:**
- 🖼️ PNG
- 📷 JPG / JPEG
- 📄 TIFF
- 📑 Multi-page PDF documents

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **Tesseract OCR** ([Installation Guide](https://github.com/tesseract-ocr/tesseract))
- **Poppler** (for PDF processing)

#### Installing Tesseract

**macOS:**
```bash
brew install tesseract
```

**Ubuntu/Debian:**
```bash
sudo apt-get install tesseract-ocr
```

**Windows:**
Download from [GitHub Releases](https://github.com/UB-Mannheim/tesseract/wiki)

#### Installing Poppler

**macOS:**
```bash
brew install poppler
```

**Ubuntu/Debian:**
```bash
sudo apt-get install poppler-utils
```

**Windows:**
Download from [Poppler for Windows](http://blog.alivate.com.au/poppler-windows/)

---

### 📦 Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/extracto-ocr.git
cd extracto-ocr
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

---

### ▶️ Running the Application

#### Start Backend Server

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python app.py
```

Backend will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 📖 Usage

1. **Open the Application** - Navigate to `http://localhost:5173` in your browser

2. **Upload a File** 
   - Drag and drop an image or PDF
   - Or click to browse and select a file

3. **Wait for Processing** - Watch the progress indicator as OCR runs

4. **View Results** - See the extracted text displayed in the interface

5. **Copy or Reset**
   - Click "Copy Text" to copy to clipboard
   - Click "Reset" to process another file

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React | UI component library |
| Vite | Build tool and dev server |
| CSS3 | Styling and animations |
| Fetch API | HTTP requests |

### Backend
| Technology | Purpose |
|------------|---------|
| Flask | Web framework |
| Tesseract OCR | Text extraction engine |
| pdf2image | PDF to image conversion |
| Pillow | Image processing |
| Flask-CORS | Cross-origin resource sharing |

---

## 📁 Project Structure

```
extracto-ocr/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── uploads/          # Temporary file storage
│
└── README.md
```

---

## 🔒 Security Considerations

- **File Validation** - Only accepted file formats are processed
- **Size Limits** - Maximum file size enforced on both client and server
- **Temporary Storage** - Uploaded files are removed after processing
- **Input Sanitization** - All inputs are validated before processing
- **CORS Configuration** - Properly configured for production deployment

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Tesseract not found**
```bash
# Verify installation
tesseract --version

# If not found, reinstall Tesseract
```

**Issue: PDF processing fails**
```bash
# Verify Poppler installation
pdftoppm -v

# If not found, reinstall Poppler
```

**Issue: CORS errors**
- Ensure backend is running on port 5000
- Check CORS configuration in Flask app
- Verify frontend is making requests to correct backend URL

---

## 🚢 Deployment

### Backend Deployment

For production deployment, consider using:
- **Gunicorn** as WSGI server
- **Nginx** as reverse proxy
- **Environment variables** for configuration

```bash
# Install Gunicorn
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend Deployment

```bash
# Build for production
npm run build

# Deploy the dist/ folder to your hosting service
```

Recommended platforms:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) - OCR engine
- [pdf2image](https://github.com/Belval/pdf2image) - PDF processing
- [React](https://reactjs.org/) - Frontend framework
- [Flask](https://flask.palletsprojects.com/) - Backend framework

---

## 📧 Contact

For questions or support, please open an issue on GitHub or contact the maintainers.

---

<div align="center">

**Made with ❤️ for the OCR community**

⭐ Star this repo if you find it useful!

</div>
