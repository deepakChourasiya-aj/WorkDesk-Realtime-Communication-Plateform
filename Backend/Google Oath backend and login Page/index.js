const express = require("express");
const passport = require("./config/google.oauth");
const cors = require("cors");
const app = express();
const redis = require("redis");

// const client = redis.createClient();

// client.on("error", (err) => console.log("Redis Client Error", err));

// client.connect();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Working Home Page !!");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
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
      email,
      picture,
    };
    console.log(user_data);
    // res.send(JSON.stringify(user_data))
    // here we will give our application Welcome Page LINK
    res.redirect("http://localhost:8080/welcomepage");
  }
);

app.get("/welcomepage", async (req, res) => {
  res.send("Login Successful  Welcome to the APP");
});
// Client_id = "1029703374378-pc19m0k7aodttom8lplr41k1cam9pinf.apps.googleusercontent.com"
// client_secret = "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"

app.listen(8080, () => {
  console.log("connected to the server with port 8080");
});
