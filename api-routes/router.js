import express from "express";
const router = express.Router();
import staticsRouter from "./statics-router.js";
import authRouter from "./auth-router.js";

import { fileUploader, FileUploader } from "../utils/multer.js";

router.use("/statics", staticsRouter);
router.use("/auth", authRouter);

router.post("/dbSync", (req, res) => {});

router.post(
  "/upload-single",
  fileUploader.uploadSingle("uploadFile", "profpict"),
  FileUploader.handleMulterErrors,
  (req, res) => {
    res.status(200).json("Upload Successfull!");
  }
);

router.post(
  "/upload-multiple",
  fileUploader.uploadMultiple("uploadFiles", 3),
  FileUploader.handleMulterErrors,
  (req, res) => {
    res.status(200).json("Upload Successfull!");
  }
);

router.post(
  "/upload-fields",
  fileUploader.uploadByFields([
    { name: "profile-picture", maxCount: 1 },
    { name: "contract(signed)", maxCount: 1 },
    { name: "certificates", maxCount: 5 },
  ]),
  FileUploader.handleMulterErrors,
  (req, res) => {
    res.status(200).json("Upload Successfull!");
  }
);

export default router;
