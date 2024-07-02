const Brands = require("../models/brand");

const getAllBrand = async (req, res) => {
  try {
    const brands = await Brands.find({});

    res.status(200).json({ status: true, brands });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Brand id is required" });
    }

    const brand = await Brands.findById(id);

    if (!brand) {
      return res
        .status(404)
        .json({ status: false, message: "Brand not found" });
    }

    res.status(200).json({ status: true, brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createBrand = async (req, res) => {
  try {
    const { brandName } = req.body;

    const logo = req.file?.path || "";

    if (!brandName) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const existingBrand = await Brands.findOne({ brandName });

    if (existingBrand) {
      return res
        .status(400)
        .json({ status: false, message: "Brand already exists" });
    }

    const Brand = new Brands({ ...req.body, logo });

    await Brand.save();

    res
      .status(201)
      .json({ status: true, message: "Brand created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Brand id is required" });
    }

    const { brandName } = req.body;

    if (!brandName) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const existingBrand = await Brands.findOne({ _id: id });

    if (!existingBrand) {
      return res
        .status(404)
        .json({ status: false, message: "Brand not found" });
    }

    const updatedBrand = await Brands.updateOne(
      {
        _id: id,
      },
      { ...req.body, logo: req.file?.path || existingBrand.logo },
      { new: true }
    );

    if (!updatedBrand) {
      return res
        .status(404)
        .json({ status: false, message: "Brand not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Brand updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Brand id is required" });
    }

    const deletedBrand = await Brands.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res
        .status(404)
        .json({ status: false, message: "Brand not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Brand deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteBrands = async (req, res) => {
  try {
    const ids = req.body;

    if (ids.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Brand ids is required" });
    }

    const deletedBrands = await Brands.deleteMany({ _id: { $in: ids } });

    if (deletedBrands) {
      return res
        .status(200)
        .json({ status: true, message: "Brand deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to delete Brand" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBrand,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  deleteBrands
};
