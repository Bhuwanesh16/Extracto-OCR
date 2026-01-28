# Extracto-OCR
Extracto OCR – Project Overview

Extracto OCR is a lightweight, full-stack Optical Character Recognition (OCR) application that allows users to upload images or scanned PDF documents and instantly extract selectable, machine-readable text through a clean, production-style web interface.

The frontend is built with React + Vite and features an industrial-grade dark UI with drag-and-drop file uploads, live file validation, upload progress indicators, and intuitive actions such as copy extracted text and reset. The interface is designed for clarity, speed, and a smooth user experience.

The backend is powered by a Flask REST API that integrates Tesseract OCR for text extraction and Poppler (via pdf2image) for handling PDF documents. It supports common image formats including PNG, JPG, JPEG, and TIFF, as well as multi-page PDFs. Uploaded files are securely processed on the server, converted to images when required, and passed through Tesseract for accurate text recognition.

The system returns structured OCR results and clear, user-friendly error messages, enabling the frontend to reliably display extracted text or precise diagnostic feedback. Extracto OCR is designed to be simple, efficient, and easily extensible for real-world OCR workflows.
