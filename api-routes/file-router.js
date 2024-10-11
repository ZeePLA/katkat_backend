import express from "express";
const fileManagementRouter = express.Router();
import { fileUploader, FileUploader } from "../utils/multer.js";

fileManagementRouter.post(
  "/upload-single",
  fileUploader.uploadSingle("uploadFile", "profpict"),
  FileUploader.handleMulterErrors,
  (req, res) => {
    res.status(200).json("Upload Successfull!");
  }
);

fileManagementRouter.post(
  "/upload-multiple",
  fileUploader.uploadMultiple("uploadFiles", 3),
  FileUploader.handleMulterErrors,
  (req, res) => {
    res.status(200).json("Upload Successfull!");
  }
);

fileManagementRouter.post(
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

export default fileManagementRouter;
