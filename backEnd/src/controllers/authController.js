const Users = require("../models/user");
require("dotenv").config();
const {
  hashPassword,
  generateAccessToken,
  gennerateRefreshToken,
  verifyToken,
} = require("../services/authService");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const findUserByEmail = await Users.findOne({ email });

    if (findUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPass = hashPassword(password);

    const createUser = await Users.create({
      ...req.body,
      userName: "@" + firstName,
      password: hashPass,
    });

    if (createUser) {
      return res.status(201).json({ status: true, message: "User created successfully" });
    } else {
      return res.status(400).json({ status: false, message: "Failed to create user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      let payLoad = {
        email: req.user.email,
        role: req.user.role,
        userName: req.user.userName,
      };

      const refreshToken = gennerateRefreshToken(payLoad);
      const accessToken = generateAccessToken(payLoad);

      await Users.updateOne(
        { email: req.user.email },
        { refreshToken },
        { new: true }
      );

      res.cookie("refreshToken", refreshToken, {
        maxAge: process.env.MAX_AGE_REFRESH_TOKEN,
        httpOnly: true,
      });

      const resData = {
        refreshToken,
        accessToken
      };

      return res.status(200).json({
        message: "Login successfully",
        status: true,
        resData,
      });

    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const googleLogin = (req, res) => {
  try {

    res.cookie("refreshToken", req.user.refreshToken, {
      maxAge: process.env.MAX_AGE_REFRESH_TOKEN,
      httpOnly: true,
    });

    res.redirect(`http://localhost:3000/auth-success?accessToken=${req.user.accessToken}`);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const cookie = req.cookies;

    if (!cookie && !cookie.refreshToken) {
      return res.status(400).json({
        message: "No refresh token in cookie.",
      });
    }

    await Users.updateOne(
      { refreshToken: cookie.refreshToken },
      { refreshToken: "" },
      { new: true }
    );

    res.clearCookie("refreshToken", { httpOnly: true, secure: true });

    return res.status(200).json({ status: true, message: "Logout successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    const verifyRefreshToken = verifyToken(refreshToken);

    if (verifyRefreshToken.error) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = await Users.findOne({ refreshToken });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const accessToken = generateAccessToken({
      email: user.email,
      role: user.role,
      userName: user.userName,
    });

    return res.status(200).json({ status: true, accessToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const getAccount = async (req, res) => {
  try {

    const userData = await Users.findOne({ email: req.user.email });

    const { _id: id, email, userName, role, ...users } = userData

    return res.status(200).json({
      status: true,
      resData: { id, email, userName, role },
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getAccount,
  googleLogin,
  refreshToken
};
