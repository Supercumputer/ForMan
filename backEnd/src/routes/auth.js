const express = require("express");
const router = express.Router();
var passport = require("passport");

const authController = require("../controllers/authController");

router.post("/register", authController.Register);

router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
  }),
  authController.Login
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authController.Logout
);

router.get(
  "/checklogin",
  passport.authenticate("jwt", { session: false }),
  authController.CheckLogin
);

module.exports = router;
