import express from "express";
const dbTaskRouter = express.Router();
import { syncAll } from "../database/db.js";

dbTaskRouter.post("/dbSync", (req, res) => {
  const syncWhat = req.body.syncWhat;

  if (syncWhat === "all") {
    syncAll();
  }
  res.status(201).json("db synced");
});

export default dbTaskRouter;
