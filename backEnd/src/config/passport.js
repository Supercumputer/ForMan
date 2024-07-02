const passport = require("passport");

const LocalStrategy = require("passport-local");

const JwtStrategy = require("passport-jwt").Strategy;

const Users = require("../models/user");

const {
  comparePassword,
  generateAccessToken,
} = require("../services/authService");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access-token"];
  }
  return token;
};

const configPassport = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (_email, _password, done) => {
        try {
          if (!_email || !_password) {
            return done(null, false, {
              message: "Email và mật khẩu là bắt buộc.",
            });
          }

          const res = await Users.findOne({ email: _email }).populate({
            path: "role",
            select: "name permissions -_id",
            populate: { path: "permissions", select: "route description -_id" },
          });

          if (!res) {
            return done(null, false, { message: "Email không đúng." });
          }

          const checkPass = comparePassword(_password, res.password);

          if (!checkPass) {
            return done(null, false, { message: "Mật khẩu không đúng." });
          }

          const { email, password, ...userData } = res.toObject();

          const payLoad = {
            email,
            role: userData.role,
          };

          const accessToken = generateAccessToken(payLoad);

          const data = {
            userData,
            accessToken,
          };

          return done(null, data);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SERVICE,
      },

      async (jwt_payload, done) => {
        const user = await Users.findOne(
          { email: jwt_payload.email },
          { password: 0 }
        ).populate({
          path: "role",
          select: "name permissions -_id",
          populate: { path: "permissions", select: "route description -_id" },
        });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Người dùng không tồn tại." });
        }
      }
    )
  );
};

module.exports = configPassport;
