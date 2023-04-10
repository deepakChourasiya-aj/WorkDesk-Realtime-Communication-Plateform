require("dotenv").config();
const jwt = require("jsonwebtoken");
const fs = require("fs");
// creating a new function for the authentication purpose to check valid user
const authenticate = (req, res, next) => {
  try {
    const Normal_Token = req.cookies.Normal_Token || "";

    // blacklisted the user

    const blacklistedToken = JSON.parse(
      fs.readFileSync("./blacklist.json", "utf-8")
    );
    // checking user token blacklisted file
    if (blacklistedToken.includes(Normal_Token)) {
      res.status(401).json({ message: "please login again" });
    } else {
      jwt.verify(Normal_Token, process.env.Normal_Token_key, (err, decoded) => {
        if (err) res.status(err).json({ message: err.message });
        else {
          next();
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { authenticate };
