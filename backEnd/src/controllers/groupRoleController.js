const GroupRoles = require("../models/groupRole");

const createGroupRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    if (!name || !permissions) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const existingRole = await GroupRoles.findOne({ name });

    if (existingRole) {
      return res
        .status(400)
        .json({ status: false, message: "Role name already exists" });
    }

    const newGroupRole = new GroupRoles(req.body);
    await newGroupRole.save();

    res.status(201).json({
      status: true,
      message: "Group role created successfully",
      groupRole: newGroupRole,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getGroupRoles = async (req, res) => {
  try {
    const { type = "" } = req.query;
    let regex = new RegExp(`^${type}`, "i");
    const groupRoles = await GroupRoles.find({ name: { $regex: regex } });
    res.status(200).json({ status: true, groupRoles });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const detail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Group role id is required" });
    }

    const groupRole = await GroupRoles.findById(id).populate("permissions");

    if (!groupRole) {
      return res
        .status(404)
        .json({ status: false, message: "Group role not found" });
    }

    res.status(200).json({ status: true, groupRole });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Group role id is required" });
    }

    const { name, permissions } = req.body;

    if (!name || !permissions) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const updateGroupRole = await GroupRoles.findByIdAndUpdate(
      {
        _id: id,
      },
      req.body,
      { new: true }
    );

    if (!updateGroupRole) {
      return res
        .status(404)
        .json({ status: false, message: "Group role not found" });
    }

    res.status(200).json({
      status: true,
      message: "Group role updated successfully",
      groupRole: updateGroupRole,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteGroupRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Group role id is required" });
    }

    const deleteGroupRole = await GroupRoles.findByIdAndDelete(id);
    
    if (!deleteGroupRole) {
      return res
        .status(404)
        .json({ status: false, message: "Group role not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Group role deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGroupRole,
  getGroupRoles,
  detail,
  update,
  deleteGroupRole,
};
