const Users = require("../models/user");
const GroupRoles = require("../models/groupRole");
const { hashPassword, comparePassword } = require("../services/authService");
const sendEmail = require("../config/mail");

const paginate = async (req, res) => {
  try {
    const {
      type = "",
      keyword = "",
      page = 1,
      limit = process.env.PAGE_SIZE,
    } = req.query;

    let typeRegex = new RegExp(`^${type}`, "i");

    let keywordRegex = new RegExp(keyword, "i");

    const roles = await GroupRoles.find({ name: { $regex: typeRegex } });

    const roleIds = roles.map((role) => role._id);

    let skip = (page - 1) * limit;

    // Điều kiện chung
    const searchCondition = {
      $and: [
        { role: { $in: roleIds } },
        {
          $or: [
            { fullName: { $regex: keywordRegex } },
            { userName: { $regex: keywordRegex } },
            { email: { $regex: keywordRegex } },
          ],
        },
      ],
    };

    const [users, totalCount] = await Promise.all([
      Users.find(searchCondition).select("-password").skip(skip).limit(limit),
      Users.countDocuments(searchCondition),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({ users, totalPages, currentPage: page });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const findByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const users = await Users.find({ email: { $regex: new RegExp(email, "i") } }, { password: 0 }).limit(10);

    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ status: true, users });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const findById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }

    const user = await Users.findById(id, { password: 0 }).populate({
      path: "role",
      select: "name",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ status: true, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const create = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const avatar = req.file.path;

    if (!firstName || !lastName || !email || !password || !role) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const findUserByEmail = await Users.findOne({ email });

    if (findUserByEmail) {
      return res
        .status(400)
        .json({ status: false, message: "Email already exists" });
    }

    const hashPass = hashPassword(password);

    const createUser = await Users.create({
      ...req.body,
      avatar,
      userName: "@" + firstName,
      password: hashPass,
    });

    if (createUser) {
      return res
        .status(201)
        .json({ status: true, message: "User created successfully" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to create user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const sendFeedback = async (req, res) => {
  try {
    const { template, feedBack, emails = [] } = req.body;


    if (!template || !feedBack || !emails) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }
    const emailSubject = template === 1 ? "Special Voucher Just for You!" : "Important Notification";
    const emailText = "";
    let emailHTML = "";

    if (template === 1) {
      emailHTML = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
              <div style="background-color: #007bff; padding: 20px; border-radius: 10px 10px 0 0; color: white; text-align: center;">
                  <h1 class="text-2xl font-bold">Special Voucher Just for You!</h1>
              </div>
              <div style="padding: 20px;">
                  <p class="text-lg">Dear Mr,</p>
                  <p>${feedBack}</p>
                  <p>Thank you for being a valued customer!</p>
                  <p>Best regards,</p>
                  <p>Your Company Name</p>
              </div>
              <div style="background-color: #f4f4f4; padding: 10px; text-align: center; border-radius: 0 0 10px 10px;">
                  <p style="margin: 0;">&copy; 2024 Your Company Name. All rights reserved.</p>
              </div>
          </div>`
    } else {
      emailHTML = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                  <div style="background-color: #28a745; padding: 20px; border-radius: 10px 10px 0 0; color: white; text-align: center;">
                      <h1 class="text-2xl font-bold">Important Notification</h1>
                  </div>
                  <div style="padding: 20px;">
                      <p class="text-lg">Dear Mr,</p>
                      <p>We have an important update for you:</p>
                      <p>${feedBack}</p>
                      <p>If you have any questions or need further assistance, please do not hesitate to contact us.</p>
                      <p>Best regards,</p>
                      <p>Your Company Name</p>
                  </div>
                  <div style="background-color: #f4f4f4; padding: 10px; text-align: center; border-radius: 0 0 10px 10px;">
                      <p style="margin: 0;">&copy; 2024 Your Company Name. All rights reserved.</p>
                  </div>
              </div>`
    }

    await sendEmail(emails.join(","), emailSubject, emailText, emailHTML);

    return res
      .status(200)
      .json({ status: true, message: "Email sent successfully" });


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const softDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "User id is required" });
    }

    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const deletedUser = await Users.delete({ _id: id });

    if (deletedUser) {
      return res
        .status(200)
        .json({ status: true, message: "User deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to delete user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const softDeleteUsers = async (req, res) => {
  try {
    const ids = req.body;

    if (ids.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "User ids is required" });
    }

    const deletedUsers = await Users.delete({ _id: { $in: ids } });

    if (deletedUsers) {
      return res
        .status(200)
        .json({ status: true, message: "User deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to delete user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }

    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const password = req.body.password
      ? hashPassword(req.body.password)
      : user.password;
    const avatar = req.file?.path ?? user.avatar;

    const updateUser = await Users.updateOne(
      { _id: id },
      {
        ...req.body,
        avatar,
        password,
      },
      { new: true }
    );

    if (updateUser.modifiedCount > 0) {
      return res
        .status(200)
        .json({ status: true, message: "User updated successfully" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to update user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const countUser = async (req, res) => {
  try {
    const count = await Users.countDocumentsWithDeleted();
    return res.status(200).json(count);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    const id = req.params.id

    if (!email || !password || !newPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User not found" });
    }

    if (user._id != id) {
      return res
        .status(400)
        .json({ status: false, message: "Tài khoản không khớp với tài khoản đang đăng nhập." });
    }

    const checkPass = comparePassword(password, user.password);

    if (!checkPass) {
      return res
        .status(400)
        .json({ status: false, message: "Password không đúng" });
    }

    const hashPass = hashPassword(newPassword);

    user.password = hashPass;

    await user.save();

    return res.status(200).json({ status: true, message: "Đổi mật khẩu thành công." });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  paginate,
  findById,
  findByEmail,
  create,
  softDeleteUser,
  softDeleteUsers,
  update,
  countUser,
  resetPassword,
  sendFeedback
};
