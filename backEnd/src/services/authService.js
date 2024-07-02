const bcrypt = require("bcrypt");
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
  } catch (error) {
    console.log(error);
  }
  return decode;
};

module.exports = {
  hashPassword,
  comparePassword,
  generateAccessToken,
  gennerateRefreshToken,
  verifyToken,
};
