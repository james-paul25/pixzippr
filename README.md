# 📷 PixZippr

**PixZippr** is a fast, modern web app for **batch watermarking images**, built using **React + Vite + Tailwind CSS** for the frontend and **Spring Boot** for the backend (coming soon).

---

## 🚀 Features

- ✅ Drag-and-drop multiple image upload
- ✅ Add text or image-based watermarks
- ✅ Live preview with draggable watermark
- ✅ Customize font, size, opacity, rotation, color
- ✅ Download all watermarked images as ZIP
- ✅ Responsive and mobile-friendly UI
- ✅ Dark mode support

---

## 🧭 How to Use

1. **Upload Images**
   - Drag and drop images into the uploader or click to select.
   - Thumbnails will appear in a grid preview.

2. **Select Watermark Type**
   - Choose either:
     - `Text` watermark: Customize content, font, size, color, opacity, rotation.
     - `Image` watermark: Upload a PNG/JPG watermark image.

3. **Customize & Preview**
   - Use sliders and inputs to fine-tune watermark appearance.
   - Drag the watermark directly on the preview to position it.

4. **Download**
   - Click **“Watermark & Download”** to generate a ZIP file with all processed images.

---

## 🔧 Tech Stack

### Frontend
- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 🖼️ Canvas API
- 📦 jszip, file-saver
- 📁 react-dropzone

### Backend (Coming Soon)
- 🔒 REST API for image processing, user auth, and history
- 👤 Allow users to log in and save watermark templates
- 💾 Store watermark settings per user for reuse across sessions
- 🕓 Saved history for previously watermarked batches
- 📂 Bulk image processing server-side for handling large uploads efficiently
- ⚙️ Background job support for asynchronous watermarking and zipping
---
