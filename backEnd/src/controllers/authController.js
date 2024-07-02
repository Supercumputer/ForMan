const Users = require("../models/user");
const { hashPassword } = require("../services/authService");

const Register = async (req, res) => {
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

const Login = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.cookie("access-token", req.user.accessToken, {
        httpOnly: true,
        sameSite: true,
      });

      res.status(200).json({
        message: "Login successfully",
        status: true,
        user: req.user.userData,
      });
    } else {
      console.log("ko biet");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const Logout = (req, res) => {
  try {
    res.clearCookie("access-token");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const CheckLogin = (req, res) => {
  try {
    if (req.isAuthenticated()) {
     
      res.status(200).json({ status: true, user: req.user });
      
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  Register,
  Login,
  Logout,
  CheckLogin,
};
