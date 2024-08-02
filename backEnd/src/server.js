const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const connectDb = require("./config/connectDb.js");
const router = require("./routes/index.js");
const configCors = require("./config/cors.js");
const { app, io, server } = require("./config/socket.io.js");
require("dotenv").config();

require("./config/passportLocal.js");
require("./config/passportGoogle.js")

const port = process.env.PORT || 3002;

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

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
