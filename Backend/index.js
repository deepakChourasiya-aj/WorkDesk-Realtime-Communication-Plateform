const express = require("express");
const redis = require("redis");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { dbConnection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { authenticate } = require("./middlewares/authenticate.middleware");
const { weatherRouter } = require("./routes/weather.route");
const { LogoutRouter } = require("./routes/logout.route");

// middleware

app.use(cookieParser());
app.use(express.json());
app.use(cors());


app.get('/', (req,res)=>res.send('home_Route'))

// routers
app.use('/user',userRouter)
app.use(authenticate) //will validate login status
app.use('/weather',weatherRouter)
app.use('/logout',LogoutRouter)

// generate new token
app.get('/newToken',async(req,res) => {
  const refreshToken = res.cookies.Rre
})

// server listens
app.listen(8080, async () => {
  try {
    dbConnection;
    console.log(`server listening on ${8080}`);
  } catch (error) {
    console.log(`error while connecting to ${error.message}`);
  }
});

