import express from "express";
const router = express.Router();

import staticsRouter from "./statics-router.js";
import authRouter from "./auth-router.js";
import dbTaskRouter from "./db-router.js";
import fileManagementRouter from "./file-router.js";

router.use("/statics", staticsRouter);
router.use("/auth", authRouter);
router.use("/db", dbTaskRouter);
router.use("/file", fileManagementRouter);

export default router;
