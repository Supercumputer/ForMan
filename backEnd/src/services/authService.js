const bcrypt = require("bcrypt");
const Users = require("../models/user");
var jwt = require('jsonwebtoken');
const saltRounds = 10;

require("dotenv").config();

const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const generateAccessToken = (data) => {
  let key = process.env.JWT_SERVICE;
  let token = null;
  try {
    token = jwt.sign(data, key, { expiresIn: "3d" });
  } catch (error) {
    console.log(error);
  }
  return token;
};

const gennerateRefreshToken = (data) => {
  let key = process.env.JWT_SERVICE;
  let token = null;
  try {
    token = jwt.sign(data, key, { expiresIn: "7d" });
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SERVICE;
  let decode = null;
  try {
    decode = jwt.verify(token, key);
    return decode;
  } catch (error) {
    return { error };
  }
};

const upsertUserSocialMedia = async (type, rawData) => {
  try {
    let user = null;

    if (type === "google") {
      user = await Users.findOne({ $and: [{ email: rawData.email }, { type }] });

      if (!user) {
        user = await Users.create({
          email: rawData.email,
          userName: rawData.userName,
          firstName: rawData.firstName,
          lastName: rawData.lastName,
          type: "google",
        })
      }
    }

    const accessToken = generateAccessToken(rawData)
    const refreshToken = gennerateRefreshToken(rawData)

    // user = await Users.findOneAndUpdate({email: rawData.email}, {refreshToken}, {new: true})
    user.refreshToken = refreshToken
    await user.save()

    return { accessToken, refreshToken }

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateAccessToken,
  gennerateRefreshToken,
  verifyToken,
  upsertUserSocialMedia
};
