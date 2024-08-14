var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

async function passwordHasher(plainPassword) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log("Hashed password:", hashedPassword);
    return hashedPassword;
  } catch (err) {
    console.error(err);
  }
}

async function checkUser(passwordInput, storedPassword) {
  try {
    return await bcrypt.compare(passwordInput, storedPassword);
  } catch (err) {
    console.error(err);
    throw new Error("Error comparing passwords.");
  }
}

module.exports = { passwordHasher, checkUser };
