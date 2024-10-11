import express from "express";
const authRouter = express.Router();
import { checkAuth, login, logout, register } from "../utils/auth-helper.js";

// auth routes
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.delete("/logout", logout);

authRouter.post("/dashboard", checkAuth, (req, res) => {
  const userLevel = req.user.userLevel;
  console.log(userLevel);
  res.sendStatus(200);
});

export default authRouter;
