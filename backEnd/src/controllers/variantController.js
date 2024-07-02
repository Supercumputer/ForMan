const Variants = require("../models/variant");
const Products = require("../models/product");
const Comments = require("../models/comment");
const getAllVariantById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Product id is required" });
    }

    const products = await Variants.find({ product_id: id });

    return res.status(200).json({ status: true, products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getVariant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Product id is required" });
    }

    const variant = await Variants.findById(id);

    if (!variant) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    return res.status(200).json({ status: true, variant });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const createVariant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Product id is required" });
    }

    const { color, size, price, quantity, sale } = req.body;

    if (!color || !size || !price || !quantity) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const mbtExist = await Variants.findOne({
      $and: [{ product_id: id }, { color }, { size }],
    });

    if (mbtExist) {
      return res
        .status(400)
        .json({ status: false, message: "Variant already exists" });
    }

    const mbt = await Promise.all([
      Products.findOne({ _id: id }),
      Variants.findOneWithDeleted({ product_id: id }).sort({ _id: -1 }),
    ]).then(([product, variant]) => {
      let stt;
      console.log(variant);
      if (variant != null && Object.keys(variant).length > 0) {
        let index = variant.mbt.lastIndexOf("_BT") + 3;
        stt = Number(variant.mbt.slice(index)) + 1;
      } else {
        stt = 1;
      }

      return `${product.code}_BT${stt}`;
    });

    const newVariant = new Variants({
      product_id: id,
      mbt,
      color,
      size,
      price,
      quantity,
      sale,
      images: req.files.map((file) => file.path) || [],
    });

    await newVariant.save();

    return res
      .status(201)
      .json({ status: true, message: "Variant created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Variant id is required" });
    }

    const product = await Variants.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Variant not found" });
    }

    const data = await Variants.delete({ _id: id });

    if (data.deletedCount === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Variant not deleted" });
    }

    return res.status(200).json({ status: true, message: "Variant deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateVariant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Variant id is required" });
    }

    const { color, size, price, quantity, sale } = req.body;

    if (!color || !size || !price || !quantity) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const variant = await Variants.findById(id);

    if (!variant) {
      return res
        .status(404)
        .json({ status: false, message: "Variant not found" });
    }

    const mbtExist = await Variants.findOne({
      $and: [{ product_id: variant.product_id }, { color }, { size }],
    });

    if (mbtExist && mbtExist._id.toString() !== id) {
      return res
        .status(400)
        .json({ status: false, message: "Variant already exists" });
    }

    const images =
      req.files.length > 0
        ? req.files.map((file) => file.path)
        : variant.images;

    const data = await Variants.updateOne(
      { _id: id },
      {
        color,
        size,
        price,
        quantity,
        sale,
        images,
      },
      { new: true }
    );

    if (data.modifiedCount === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Variant not updated" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Variant updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const softDeleteVariants = async (req, res) => {
  try {
    const ids = req.body;
   
    if (ids.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Variant ids is required" });
    }

    const deletedVariants = await Variants.delete({ _id: { $in: ids } });
    
    if (deletedVariants) {
      return res
        .status(200)
        .json({ status: true, message: "Variant deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to delete Variant" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getRatings = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1 } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Variant id is required" });
    }

    // const comments = await Comments.findOne({
    //   $and: [{ variant_id: id }, { page }],
    // }).populate({
    //   path: "comments",
    //   populate: { path: "user_id", select: "firstName lastName email avatar" },
    // });

    // const commentsCount = await Comments.countDocuments({ variant_id: id });

    const [comments, totalPages] = await Promise.all([
      Comments.findOne({ $and: [{ variant_id: id }, { page }] }).populate({
        path: "comments",
        populate: {
          path: "user_id",
          select: "firstName lastName email avatar",
        },
      }),
      Comments.countDocuments({ variant_id: id }),
    ]);

    return res.status(200).json({ status: true, comments, totalPages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updatereply = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Rating id is required" });
    }

    const { reply, item_id } = req.body;

    const rating = await Comments.findOne({ _id: id });

    rating.comments.find(
      (comment) => comment._id.toString() === item_id
    ).reply = reply;

    await rating.save();

    return res
      .status(200)
      .json({ status: true, message: "Reply updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllVariantById,
  getVariant,
  createVariant,
  deleteVariant,
  softDeleteVariants,
  updateVariant,
  getRatings,
  updatereply,
};
