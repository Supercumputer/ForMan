const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.post("/login", passport.authenticate("local"), authController.login);

router.get(
  "/google",
  passport.authenticate("google")
);

router.get(
  "/google/callback",
  passport.authenticate("google"),
  authController.googleLogin
);

router.get("/logout", authController.logout);

router.get("/account", authController.getAccount);

module.exports = router;
