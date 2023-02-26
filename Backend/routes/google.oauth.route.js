const express = require('express');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const googlelogin = express.Router();
const passport = require("passport");
const { UserModel } = require('../model/user.model');

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
    //! mongoDB  - saving user information
    let user = {name,email}
    try {
      const user = await UserModel.find({ email });
      // console.log(user);
      // if email not present
      if (user.length === 0) {
       const newUser = new UserModel({
          name,
          email,
          password: "google-login",
        });
        await newUser.save();
      }
      // rediection function
    } catch (error) {
      console.log(error.message);
    }

    res.status(200).json({ userData: user });
  }
);


module.exports = {
  passport,
  googlelogin
};
