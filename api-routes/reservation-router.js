import express from "express";
const reservationRouter = express.Router();
import { constructDate, deconstructDate } from "../utils/reservation-logic.js";

//   userId, shopName, hairdresserId, services, appointmentDate, appointmentStartTime, appointmentEndTime

reservationRouter.get("/view", (req, res) => {
  const { appointmentDate, appointmentStartTime } = req.body;
  const output = constructDate(appointmentDate, appointmentStartTime);
  res.status(200).json(output);
});

reservationRouter.post("/create", (req, res) => {
  const {} = req.body;
});

reservationRouter.put("/edit", (req, res) => {
  const {} = req.body;
});

reservationRouter.delete("/cancel", (req, res) => {
  const {} = req.body;
});

export default reservationRouter;
