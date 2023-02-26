const express = require('express');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const googlelogin = express.Router();
const passport = require("passport");

require("dotenv").config();
// console.log(process.env.GOOGLE_CLIENT_SECRET);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);

      // console.log(profile)
      // console.log()
    }
  )
);

googlelogin.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

googlelogin.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async function (req, res) {
    // Successful authentication, redirect home.
    const name = req.user._json.name;
    const email = req.user._json.email;
    const picture = req.user._json.picture;
    const user_data = {
      name,
      password: "user",
      email,
      picture,
    };
    console.log(user_data);
    // res.send(JSON.stringify(user_data))
    // here we will give our application Welcome Page LINK
    res.redirect("http://localhost:8080/welcomepage");
  }
);


module.exports = {
  passport,
  googlelogin
};
