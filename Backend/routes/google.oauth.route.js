require("dotenv").config();
const express = require('express');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const googlelogin = express.Router();
const passport = require("passport");
const { UserModel } = require('../model/user.model');
const session = require("express-session");

// nesseccry middlwars

googlelogin.use(
  session({
    secret: process.env.access_key,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
googlelogin.use(passport.initialize());
googlelogin.use(passport.session());


// check database status callbacks

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


//oauth provider

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://defiant-lime-kangaroo.cyclic.app/auth/google/callback",
      scope : ["profile", "email"]
    },
    async function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
      const name = profile._json.name;
      const email = profile._json.email;
      // console.log(name, email);

      //! mongoDB  - saving user information

      try {
        const user = await UserModel.find({ email });
        // console.log(user);
        // if email not present
        if (user.length === 0) {
          const newUser = new UserModel({
            name,
            email,
            password: process.env.authKey,
          });
          await newUser.save();
        }
        // rediection function
      } catch (error) {
        console.log(error.message);
      }
      done(null, { name, email });
    }
  )
);

// login route

googlelogin.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile","email"] })
);

// varify route

googlelogin.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      "..",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    // console.log(req.user);
    res.status(200).json({ GoogleUserData: req.user });
  }
);


module.exports = {
  passport,
  googlelogin
};
