const Colors = require("../models/color");

const createColor = async (req, res) => {
  try {
    const { colorName, description } = req.body;

    if (!colorName || !description) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const existingColor = await Colors.findOne({ colorName });

    if (existingColor) {
      return res
        .status(400)
        .json({ status: false, message: "colorName already exists" });
    }

    const newColor = new Colors(req.body);

    await newColor.save();

    res.status(201).json({
      status: true,
      message: "Color created successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllColors = async (req, res) => {
  try {
    const data = await Colors.find();
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
        .json({ status: false, message: "Color id is required" });
    }

    const Color = await Colors.findById(id);

    if (!Color) {
      return res
        .status(404)
        .json({ status: false, message: "Color not found" });
    }

    res.status(200).json({ status: true, Color });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateColor = async (req, res) => {
  try {
    const { id } = req.params;

    const { colorName, description } = req.body;

    if (!colorName || !description) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const checkColorName = await Colors.findOne({ colorName });

    if (checkColorName && checkColorName._id.toString() !== id) {
      return res
        .status(400)
        .json({ status: false, message: "Color already exists" });
    }

    const updatedColor = await Colors.findByIdAndUpdate(
      {
        _id: id,
      },
      req.body,
      { new: true }
    );

    if (!updatedColor) {
      return res
        .status(404)
        .json({ status: false, message: "Color not found" });
    }

    res.status(200).json({
      status: true,
      message: "Color updated successfully",
      Color: updatedColor,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteColor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Color id is required" });
    }

    const deletedColor = await Colors.findByIdAndDelete(id);

    if (!deletedColor) {
      return res
        .status(404)
        .json({ status: false, message: "Color not found" });
    }

    res.status(200).json({
      status: true,
      message: "Color deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteColors = async (req, res) => {
  try {
    const ids = req.body;

    if (ids.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Color ids is required" });
    }

    const deletedColors = await Colors.deleteMany({ _id: { $in: ids } });

    if (deletedColors) {
      return res
        .status(200)
        .json({ status: true, message: "Color deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to delete color" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createColor,
  getAllColors,
  updateColor,
  detail,
  deleteColor,
  deleteColors
};
