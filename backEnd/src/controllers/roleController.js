const Roles = require("../models/role");

const createRole = async (req, res) => {
  try {
    const { route, description } = req.body;

    if (!route || !description) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const existingRole = await Roles.findOne({
      $or: [{ route }, { description }],
    });

    if (existingRole) {
      if (existingRole.route === route) {
        return res
          .status(400)
          .json({ status: false, message: "Route already exists" });
      }
      if (existingRole.description === description) {
        return res
          .status(400)
          .json({ status: false, message: "Description already exists" });
      }
    }

    const newRole = new Roles(req.body);
    await newRole.save();

    res.status(201).json({
      status: true,
      message: "Role created successfully",
      role: newRole,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Roles.find();
    res.status(200).json({status: true, roles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const detail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Role id is required" });
    }

    const role = await Roles.findById(id);

    if (!role) {
      return res.status(404).json({ status: false, message: "Role not found" });
    }

    res.status(200).json({ status: true, role });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;

    const { route, description } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Role id is required" });
    }

    if (!route || !description) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const updatedRole = await Roles.findByIdAndUpdate(
      {
        _id: id,
      },
      req.body,
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ status: false, message: "Role not found" });
    }

    res
      .status(200)
      .json({
        status: true,
        message: "Role updated successfully",
        role: updatedRole,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  updateRole,
  detail,
};
