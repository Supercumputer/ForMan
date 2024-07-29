const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const connectDb = require("./config/connectDb");
const router = require("./routes/index.js");
const configCors = require("./config/cors");

require("dotenv").config();
require("./config/passportLocal.js");
require("./config/passportGoogle.js")

const app = express();

const port = process.env.PORT || 3000;

configCors(app);

connectDb();

app.use(bodyParser.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
