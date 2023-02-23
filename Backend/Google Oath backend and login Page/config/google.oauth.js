const GoogleStrategy = require("passport-google-oauth20").Strategy;

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

module.exports = passport;
