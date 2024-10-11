import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserAuth from "../database/models/user-auth.js";

// Bcrypt hashes a plain password
async function passwordHasher(plainPassword) {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (err) {
    console.error("Error hashing password:", err);
    throw new Error("Error hashing password.");
  }
}

// Bcrypt-Password-Verification(forLogin)
async function checkUserPassword(passwordInput, storedPass) {
  try {
    return await bcrypt.compare(passwordInput, storedPass);
  } catch (err) {
    console.error("Error comparing passwords:", err);
    throw new Error("Error comparing passwords.");
  }
}

async function register(req, res) {
  const { email, password } = req.body;
  try {
    // Check if email exists
    const existingUser = await UserAuth.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    } else {
      //Hashing plain-password
      const hashedPassword = await passwordHasher(password);

      //Writing user to database
      const newUser = {
        email,
        passwordHash: hashedPassword,
      };
      await UserAuth.create(newUser);
      res.status(201).json(newUser);
    }
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error." });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserAuth.findOne({ where: { email } });
    if (!user || !(await checkUserPassword(password, user.passwordHash))) {
      return res.status(401).json({ message: "Incorrect credentials." });
    }
    //Generate Token
    const userId = user.id;
    const userLevel = user.userLevel;

    const accessToken = generateAccessToken(userId, userLevel);
    const refreshToken = generateRefreshToken(userId, userLevel);

    // Sends the refresh-token in a secure HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Enable in production for 'https'
      sameSite: "Strict", // Helps prevent CSRF attacks
    });
    // Sends the access-token in the header
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    console.log(`${user.email} logged in successfully.`);
    res.sendStatus(200);
    //.json({ message: "Logged in successfully.", accessToken, refreshToken });
  } catch (err) {
    console.error("Error during login process:", err);
    res.status(500).json({ message: "Server error." });
  }
}

// Generates access-token
function generateAccessToken(userId, userLevel) {
  return jwt.sign({ userId, userLevel }, process.env.ATS, {
    expiresIn: 30,
  });
}

// Generates refresh-token
function generateRefreshToken(userId, userLevel) {
  return jwt.sign({ userId, userLevel }, process.env.RTS, {
    expiresIn: "15m",
  });
}

// Authenticate access-token via header
function checkAuth(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token required." });

  jwt.verify(token, process.env.ATS, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return handleTokenExpiration(req, res, next);
      }
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

function handleTokenExpiration(req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const user = jwt.verify(refreshToken, process.env.RTS);

    // Generate new access token
    const accessToken = generateAccessToken(user.userId, user.userLevel);
    console.log("new user:", jwt.verify(accessToken, process.env.ATS));
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
}

async function logout(req, res) {
  //inform the client to flush access-token

  try {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.sendStatus(204);
  } catch (err) {
    console.error("Error during logout process:", err);
    res.status(500).json({ message: "Server error." });
  }
}

export { checkAuth, login, logout, register };
