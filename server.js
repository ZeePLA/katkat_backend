require("dotenv").config({ path: "./live.env" });
const express = require("express");
const app = express();
const router = require("./api-routes/mainRouter");
const cors = require("cors");
const { localClient, renderClient } = require("./database/db");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", router);

const PORT = process.env.BACKEND_PORT;

if (renderClient.connect()) {
  console.log(`Connection established with database.`);
  app.listen(PORT, () => {
    console.log(`Backend is up on port ${PORT}`);
  });
} else {
  console.log(`Connection to database couldn't be established.`);
}
