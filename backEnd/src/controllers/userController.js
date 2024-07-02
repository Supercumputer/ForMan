const Users = require("../models/user");
const GroupRoles = require("../models/groupRole");
const { hashPassword } = require("../services/authService");
const user = require("../models/user");

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

    res.status(200).json({ user });
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

module.exports = {
  paginate,
  findById,
  create,
  softDeleteUser,
  softDeleteUsers,
  update,
  countUser,
};
