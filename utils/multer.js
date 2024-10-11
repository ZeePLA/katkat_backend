import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

class FileUploader {
  constructor(options = {}) {
    // Dynamically resolve path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.uploadDir = options.uploadDir || path.join(__dirname, "..", "database", "uploads");

    this.preSuffix = options.preSuffix || "file"; // Default preSuffix
    this.storage = options.storage || this.createDiskStorage; // Default storage
    this.limits = options.limits || { fileSize: 1000000 }; // Default limits
    this.fileFilter = options.fileFilter || this.defaultFileFilter; // Default file filter

    // Call to ensure upload directory exists
    this.ensureUploadDir();
  }

  // Ensure that the upload directory exists
  ensureUploadDir = async () => {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (err) {
      console.error("Error creating upload directory", err);
    }
  };

  // Create default disk storage
  createDiskStorage = (preSuffix = "file", storagePath = this.uploadDir) => {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, storagePath);
      },
      filename: (req, file, cb) => {
        cb(null, `${preSuffix}-${Date.now()}${path.extname(file.originalname)}`);
      },
    });
  };

  // Default file filter for restricting file types (e.g., images only)
  defaultFileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
    }
  };

  // General method to configure and return a Multer instance
  configureMulter = (
    preSuffix = this.preSuffix,
    storagePath = this.storagePath,
    limits = this.limits,
    fileFilter = this.fileFilter
  ) => {
    const storage = this.createDiskStorage(preSuffix, storagePath);
    return multer({
      storage,
      limits,
      fileFilter,
    });
  };

  // Single file upload handler
  uploadSingle = (fieldName, preSuffix = "file", storagePath = this.uploadDir) => {
    return (req, res, next) => {
      const upload = this.configureMulter(preSuffix, storagePath).single(fieldName);

      upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        next();
      });
    };
  };

  // Multiple files upload handler (with dynamic file count)
  uploadMultiple = (fieldName, maxCount, storagePath = this.uploadDir) => {
    return (req, res, next) => {
      const upload = this.configureMulter(this.preSuffix, storagePath).array(fieldName, maxCount);
      upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        next();
      });
    };
  };

  // Handle file uploads by multiple field names
  uploadByFields = (fields, storagePath = this.uploadDir) => {
    return (req, res, next) => {
      const upload = this.configureMulter(storagePath).fields(fields);

      upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        next();
      });
    };
  };

  // Upload any number of files (useful for field arrays or unpredictable uploads)
  uploadAny = (storagePath = this.uploadDir) => {
    return (req, res, next) => {
      const upload = this.configureMulter(storagePath).any();

      upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        next();
      });
    };
  };

  // Custom error handling for multer errors
  static handleMulterErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      res.status(400).json({ error: err.message });
    } else if (err) {
      // General errors
      res.status(500).json({ error: "An error occurred during file upload." });
    } else {
      next();
    }
  };
}

const fileUploader = new FileUploader();

export { fileUploader, FileUploader };
