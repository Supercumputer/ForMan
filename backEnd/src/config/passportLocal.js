const passport = require("passport");

const { Strategy } = require("passport-local");

const Users = require("../models/user");

const { comparePassword } = require("../services/authService");
const role = require("../models/role");

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, user);
  });
});

passport.deserializeUser(async (user, done) => {
  try {
    const findUser = await Users.findOne({ email: user.email });

    if (!findUser) {
      return done(null, false, { message: "User not found" });
    }

    const data = {
      _id: findUser._id,
      email: findUser.email,
      role: findUser.role,
      userName: findUser.userName,
    };

    done(null, data);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const findUser = await Users.findOne({ email });
     
      if (!findUser) {
        return done(null, false, { message: "User not found" });
      }

      if (!comparePassword(password, findUser.password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
