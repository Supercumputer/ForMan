const Sizes = require("../models/size");

const createsize = async (req, res) => {
  try {
    const { sizeName, description } = req.body;

    if (!sizeName || !description) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const existingsize = await Sizes.findOne({ sizeName });

    if (existingsize) {
      return res
        .status(400)
        .json({ status: false, message: "sizeName already exists" });
    }

    const newsize = new Sizes(req.body);

    await newsize.save();

    res.status(201).json({
      status: true,
      message: "size created successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllSizes = async (req, res) => {
  try {
    const data = await Sizes.find();
    res.status(200).json(data);
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
        .json({ status: false, message: "size id is required" });
    }

    const size = await Sizes.findById(id);

    if (!size) {
      return res.status(404).json({ status: false, message: "size not found" });
    }

    res.status(200).json({ status: true, size });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updatesize = async (req, res) => {
  try {
    const { id } = req.params;

    const { sizeName, description } = req.body;

    if (!sizeName || !description) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const checksizeName = await Sizes.findOne({ sizeName });

    if (checksizeName && checksizeName._id.toString() !== id) {
      return res
        .status(400)
        .json({ status: false, message: "size already exists" });
    }

    const updatedsize = await Sizes.findByIdAndUpdate(
      {
        _id: id,
      },
      req.body,
      { new: true }
    );

    if (!updatedsize) {
      return res.status(404).json({ status: false, message: "size not found" });
    }

    res.status(200).json({
      status: true,
      message: "size updated successfully",
      size: updatedsize,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createsize,
  getAllSizes,
  updatesize,
  detail,
};
