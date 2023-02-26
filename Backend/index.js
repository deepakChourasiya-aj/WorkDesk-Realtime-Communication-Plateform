const express = require("express");
const redis = require("redis");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routes/user.route");
const { authenticate } = require("./middlewares/authenticate.middleware");
const { LogoutRouter } = require("./routes/logout.route");
const { dbconnetion } = require("./configs/db");
const { GntRouter } = require("./routes/generateNewToken.route");
const http = require("http");
const { githublogin } = require("./routes/github.oauth.route");
const passport = require("passport");
const { googlelogin } = require("./routes/google.oauth.route");
const app = express();
const server = http.createServer(app);

// middleware

app.use(cookieParser());
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => res.send("home_Route"));

// Oauth
app.use("/", githublogin);
app.use("/", googlelogin);
// routers
app.use("/user", userRouter);
app.use(authenticate); //  will validate login status
app.use("/newtoken", GntRouter);
app.use("/logout", LogoutRouter);

// server listens
app.listen(process.env.port, async () => {
  try {
    dbconnetion;
    console.log(`server listening on ${8080}`);
  } catch (error) {
    console.log(`error while connecting to ${error.message}`);
  }
});
