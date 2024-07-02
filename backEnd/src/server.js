const express = require("express");

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const session = require("express-session");

const passport = require("passport");

require("dotenv").config();

const connectDb = require("./config/connectDb");

const router = require("./routes/index.js");

const configCors = require("./config/cors");

const configPassport = require("./config/passport");

const app = express();

const port = process.env.PORT || 3000;

configCors(app);

app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: new session.MemoryStore(),
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

connectDb();

configPassport();

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
