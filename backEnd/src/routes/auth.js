const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("../controllers/authController");
const { checkToken } = require("../middlewares/jwtAction");

router.post("/register", authController.register);

router.post("/login", passport.authenticate("local"), authController.login);

router.get(
  "/google",
  passport.authenticate("google")
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: '/login', session: false }),
  authController.googleLogin
);

router.get("/logout", authController.logout);

router.get("/account", checkToken, authController.getAccount);

router.get("/refreshtoken", authController.refreshToken);

module.exports = router;
