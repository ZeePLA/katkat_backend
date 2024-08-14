const express = require("express");
const router = express.Router();
const { pool, client } = require("../database/db");
const { passwordHasher, checkUser } = require("../controllers/jwtAuth");

// get-test
router.get("/", (req, res) => {
  console.log("Get request received.");
  res.status(200).json({ Message: "Get request received." });
});

// db-test-api
router.get("/users", async (req, res) => {
  const output = await client.query("SELECT * FROM users;");
  res.status(200).json(output.rows);
});

// register-api
router.post("/auth/register", async (req, res) => {
  const { id, username, email, password } = req.body;
  try {
    // Checking if username exists
    const usernameQueryText = "SELECT COUNT(*) FROM users WHERE username=$1";
    const usernameQueryValues = [username];
    const usernameResult = await client.query(
      usernameQueryText,
      usernameQueryValues
    );
    const usernameExists = usernameResult.rows[0].count > 0;

    if (usernameExists) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // Checking if email exists
    const emailQueryText = "SELECT COUNT(*) FROM users WHERE email=$1";
    const emailQueryValues = [email];
    const emailResult = await client.query(emailQueryText, emailQueryValues);
    const emailExists = emailResult.rows[0].count > 0;

    if (emailExists) {
      return res.status(400).json({ message: "Email already in use." });
    } else {
      const hashedPass = await passwordHasher(password);

      const queryText =
        "INSERT INTO users(id, username, email, password) VALUES($1, $2, $3, $4) RETURNING *";
      const queryValues = [id, username, email, hashedPass];
      const result = await client.query(queryText, queryValues);
      const output = result.rows[0];
      res.status(201).json(output);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error." });
  }
});

// login-api
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //Checking if email registered before.
    const emailQueryText = "SELECT COUNT(*) FROM users WHERE email=$1";
    const emailQueryValues = [email];
    const emailResult = await client.query(emailQueryText, emailQueryValues);
    const emailExists = emailResult.rows[0].count > 0;

    if (!emailExists) {
      return res.status(401).json({ message: "Incorrect credentials." });
    }
    //Checking if password stored in database.
    const passQueryText = "SELECT password FROM users WHERE email=$1";
    const passQueryValues = [email];
    const passResult = await client.query(passQueryText, passQueryValues);

    if (passResult.rows.length === 0) {
      return res.status(401).json({ message: "Incorrect credentials." });
    }

    const storedPass = passResult.rows[0].password;
    console.log(storedPass);
    const isMatch = await checkUser(password, storedPass);

    if (isMatch) {
      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(401).json({ message: "Incorrect credentials." });
    }
  } catch (err) {
    console.log("Error during login process:", err); // Log any errors that occur
    res.status(500).json({ message: "Server error." });
  }
});

// api-not-found
router.all("/*", (req, res) => {
  console.log("Endpoint doesn't exist.");
});

module.exports = router;
