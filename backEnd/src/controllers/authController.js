const Users = require("../models/user");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const {
  hashPassword,
  generateAccessToken,
} = require("../services/authService");

const role = require("../models/role");

const register = async (req, res) => {
  try {
    const { userName, fullName, email, password } = req.body;

    if (!userName || !fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const findUserByEmail = await Users.findOne({ email });

    if (findUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPass = hashPassword(password);

    const createUser = await Users.create({
      ...req.body,
      password: hashPass,
    });

    if (createUser) {
      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    // req.session.isAuthenticated = true;
    if (req.isAuthenticated()) {
      return res.status(200).json({
        message: "Login successfully",
        status: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const googleLogin = (req, res) => {
  try {
    if (req.user && req.isAuthenticated()) {
      res.redirect("http://localhost:3000");
    } else {
      res.redirect("http://localhost:3000/login");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  try {
    req.session.destroy();
    req.logout((err) => {
      return res.status(200).json({status: true, message: "Logout successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAccount = async (req, res) => {
  try {
    if (req.user && req.isAuthenticated()) {
      const refreshToken = uuidv4();

      await Users.updateOne(
        { email: req.user.email },
        { refreshToken },
        { new: true }
      );

      let payLoad = {
        email: req.user.email,
        role: req.user.role,
        userName: req.user.userName,
      };

      const accessToken = generateAccessToken(payLoad);

      res.cookie("accessToken", accessToken, {
        maxAge: process.env.MAX_AGE_ACCESS_TOKEN,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: process.env.MAX_AGE_REFRESH_TOKEN,
        httpOnly: true,
      });

      const resData = {
        refreshToken,
        accessToken,
        email: req.user.email,
        role: req.user.role,
        userName: req.user.userName,
        id: req.user._id,
      };

      // req.session.destroy();

      return res.status(200).json({
        message: "Login successfully",
        status: true,
        resData,
      });
    } else {
      return res.status(401).json({ message: "You are not logged in" });
    }
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
};
