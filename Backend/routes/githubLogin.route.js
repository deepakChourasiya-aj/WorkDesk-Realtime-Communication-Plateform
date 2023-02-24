const express = require('express');
const passport = require('passport');
const { UserModel } = require('../model/user.model');
const githublogin = express.Router();
const GitHubStrategy = require('passport-github2').Strategy;


//! post login route  given from github developer settings

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID ;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;


passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/githublogin/auth/github"
},
function(accessToken, refreshToken, profile, done) {
  console.log(profile);
  console.log(accessToken);
  console.log(done);
} 
));


  githublogin.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

  githublogin.get('/auth/github/', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });





module.exports = { githublogin }


// sve and varify