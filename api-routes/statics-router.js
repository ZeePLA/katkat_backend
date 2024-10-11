import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import express from "express";
const staticsRouter = express.Router();

// Handling requests without file-extension
staticsRouter.use((req, res, next) => {
  if (req.path.indexOf(".") === -1) {
    req.url += ".html";
  }
  next();
});

staticsRouter.use(express.static(path.join(__dirname, "../public")));

export default staticsRouter;
