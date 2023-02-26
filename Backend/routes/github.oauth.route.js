const { response } = require("express");
const express = require("express");
const passport = require("passport");
const { UserModel } = require("../model/user.model");
const githublogin = express.Router();
const GitHubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
//! post login route  given from github developer settings

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// nessesary passport middlewares

githublogin.use(
  session({
    secret: process.env.access_key,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

githublogin.use(passport.initialize());
githublogin.use(passport.session());

// check database status

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "https://defiant-lime-kangaroo.cyclic.app/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
      const name = profile._json.login;
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

githublogin.get(
  "/auth/github/",
  passport.authenticate("github", { scope: ["profile"] })
);

githublogin.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect:
      "..",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    // console.log(req.user);
    res.status(200).json({ userData: req.user });
  }
);

module.exports = { githublogin };

// sve and varify
