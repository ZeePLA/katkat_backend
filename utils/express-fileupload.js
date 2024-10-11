/*
import express from "express";
const app = express();
import fileUpload from "express-fileupload";
app.use(fileUpload());
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

// Dynamically resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the upload folder exists
async function ensureUploadDirectory() {
  const uploadDir = path.join(__dirname, "..", "database", "uploads");
  try {
    await fs.mkdir(uploadDir, { recursive: true });
    console.log(`Upload directory ensured: ${uploadDir}`);
  } catch (err) {
    console.error(`Error ensuring upload directory: ${err}`);
  }
}

// Async handler for upload route
async function fileUploader(req, res) {
  // Check if file exists
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No file uploaded.");
  }

  const { uploadFile } = req.files;
  const uploadPath = path.join(
    __dirname,
    "..",
    "database",
    "uploads",
    uploadFile.name
  );

  try {
    await ensureUploadDirectory();

    // Move file to target location using async/await
    await uploadFile.mv(uploadPath);
    console.log(`File uploaded: ${uploadFile.name}`);
    res.status(200).send("Successfully Uploaded!");
  } catch (err) {
    console.error(`Error uploading file: ${err}`);
    res.status(500).send("Failed to upload file.");
  }
}

export default fileUploader;
*/
