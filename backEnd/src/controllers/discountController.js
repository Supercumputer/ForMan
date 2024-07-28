const discount = require("../models/discount");
const Discounts = require("../models/discount");
const { updateDiscounts, checkDiscountValidity } = require("../services/discountService");
const create = async (req, res) => {
  try {
    const { code, description, percentage, validFrom, validTo, quantity } =
      req.body;

    if (
      !code ||
      !description ||
      !percentage ||
      !validFrom ||
      !validTo ||
      !quantity
    ) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const existingRole = await Discounts.findOne({ code: code });

    if (existingRole) {
      return res
        .status(400)
        .json({ status: false, message: "Discount code already exists" });
    }

    const data = {
      ...req.body,
      code: code.toUpperCase(),
    };

    const newDiscount = new Discounts(data);
    await newDiscount.save();

    return res.status(201).json({
      status: true,
      message: "Discount created successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getAll = async (req, res) => {
  try {

    await updateDiscounts()

    const { page = 1, limit = 10, keyword = "" } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const [discounts, totalCount] = await Promise.all([
      Discounts.find({ code: { $regex: keyword, $options: "i" } })
        .skip(skip)
        .limit(limitNumber)
        .sort({ createdAt: -1 }),
      Discounts.countDocuments({ code: { $regex: keyword, $options: "i" } }),
    ]);
    const totalPages = Math.ceil(totalCount / limit);

    res
      .status(200)
      .json({ status: true, discounts, totalPages, currentPage: pageNumber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Discount id is required" });
    }

    const discount = await Discounts.findByIdAndDelete(id);

    if (!discount) {
      return res
        .status(404)
        .json({ status: false, message: "Discount not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Discount deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Discount id is required" });
    }

    const discount = await Discounts.findById(id);

    if (!discount) {
      return res
        .status(404)
        .json({ status: false, message: "Discount not found" });
    }

    res.status(200).json({ status: true, discount });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateDiscountByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const { user_id } = req.body;

    const discount = await Discounts.findOne({ code: code.toUpperCase() });

    discount.usedBy.filter((id) => id !== user_id);

    discount.quantity += 1;

    await discount.save();

    return res.status(200).json({ status: true, message: "Discount updated successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Discount id is required" });
    }

    if (req.body.code) {
      req.body.code = req.body.code.toUpperCase();
    }

    const discount = await Discounts.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!discount) {
      return res
        .status(404)
        .json({ status: false, message: "Discount not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Discount updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteDiscounts = async (req, res) => {
  try {
    const ids = req.body;

    if (ids.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Discount ids is required" });
    }

    const deletedDiscounts = await Discounts.deleteMany({ _id: { $in: ids } });

    if (deletedDiscounts) {
      return res
        .status(200)
        .json({ status: true, message: "Discount deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to delete Discount" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getDiscountByCode = async (req, res) => {
  try {
    const { code } = req.params;

    await updateDiscounts()

    const check = await checkDiscountValidity(code, req?.user?._id);

    if (!check.status) {
      return res.status(400).json({ status: false, message: check.message });
    }

    return res.status(200).json({ status: true, discount: check.discount });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  deleteDiscount,
  getDiscount,
  updateDiscount,
  deleteDiscounts,
  getDiscountByCode,
  updateDiscountByCode
};
