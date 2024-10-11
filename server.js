import dotenv from "dotenv";
dotenv.config({ path: "./live.env" });
import express from "express";
import router from "./api-routes/router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbLogin, syncAll } from "./database/db.js";

const app = express();

//middlewares
/*
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "https://localhost:5001/"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    xssFilter: true,
    hidePoweredBy: true,
    noSniff: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    frameguard: {
      action: "deny",
    },
    referrerPolicy: {
      policy: "no-referrer",
    },
    featurePolicy: {
      features: {
        geolocation: ["'none'"],
        microphone: ["'none'"],
        camera: ["'none'"],
      },
    },
  })
);
*/

app.use(
  cors({
    origin: "https://localhost:5001/",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//router
app.use("/", router);

app.listen(process.env.BACKEND_PORT, async () => {
  await dbLogin();
  //await syncAll();
  console.log(`Node Server Is Running On Port ${process.env.BACKEND_PORT}`);
});
