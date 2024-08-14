const express = require("express");
const app = express();
const router = require("./api-routes/mainRouter");
const cors = require("cors");
const { client } = require("./database/db");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", router);

const PORT = 5001;

if (client.connect()) {
  console.log(`Connection established with database.`);
  app.listen(PORT, () => {
    console.log(`Backend is up on port ${PORT}`);
  });
} else {
  console.log(`Connection to database couldn't be established.`);
}
