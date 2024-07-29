const passport = require("passport");
const { upsertUserSocialMedia } = require("../services/authService");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

module.exports = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const type = "google";

      const rawData = {
        email: profile.emails[0].value,
        userName: profile.displayName,
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      };

      const user = await upsertUserSocialMedia(type, rawData);
      return cb(null, user);
    }
  )
);
