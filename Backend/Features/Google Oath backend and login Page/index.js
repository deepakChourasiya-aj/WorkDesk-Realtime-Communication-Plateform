const express = require("express");
const passport = require("./config/google.oauth");
const cors = require("cors");
const app = express();
const redis = require("redis");
const { googlelogin } = require("./config/google.oauth")

// const client = redis.createClient();

// client.on("error", (err) => console.log("Redis Client Error", err));

// client.connect();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Working Home Page !!");
});



app.get("/welcomepage", async (req, res) => {
  res.send("Login Successful  Welcome to the APP");
});
// Client_id = "1029703374378-pc19m0k7aodttom8lplr41k1cam9pinf.apps.googleusercontent.com"
// client_secret = "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"

app.listen(8080, () => {
  console.log("connected to the server with port 8080");
});
