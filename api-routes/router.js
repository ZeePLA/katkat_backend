import express from "express";
const router = express.Router();

import staticsRouter from "./statics-router.js";
import authRouter from "./auth-router.js";
import dbTaskRouter from "./db-router.js";
import fileManagementRouter from "./file-router.js";
import reservationRouter from "./reservation-router.js";

router.use("/statics", staticsRouter);
router.use("/auth", authRouter);
router.use("/db", dbTaskRouter);
router.use("/file", fileManagementRouter);
router.use("/reservation", reservationRouter);

export default router;
