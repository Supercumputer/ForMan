const Products = require("../models/product");
const Variants = require("../models/variant");

const createProduct = async (req, res) => {
  try {
    const {
      code,
      name,
      category,
      brand,
      color,
      size,
      description,
      price,
      quantity,
    } = req.body;

    const images = req.files.map((file) => file.path) || [];

    if (!code || !name || !category || !brand) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const existingProduct = await Products.findOne({
      $or: [{ code }, { name }],
    });

    if (existingProduct) {
      return res
        .status(400)
        .json({ status: false, message: "Product already exists" });
    }

    const productNew = await Products.create({
      code: code.toUpperCase(),
      name,
      category: category.split(",") || [],
      brand,
      description,
    });

    if (!productNew) {
      return res
        .status(400)
        .json({ status: false, message: "Failed to create product" });
    }

    const variantNew = await Variants.create({
      product_id: productNew._id,
      mbt: `${code.toUpperCase()}_BT1`,
      color,
      size,
      price,
      quantity,
      images,
    });

    if (!variantNew) {
      return res
        .status(400)
        .json({ status: false, message: "Failed to create variant" });
    }

    return res
      .status(201)
      .json({ status: true, message: "Product created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    // Get query parameters for pagination and search
    const { page = 1, limit = 10, keyword = "" } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Aggregation pipeline
    const pipeline = [
      {
        $lookup: {
          from: "variants",
          localField: "_id",
          foreignField: "product_id",
          as: "variants",
        },
      },
      {
        $unwind: {
          path: "$variants",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          category: { $first: "$category" },
          brand: { $first: "$brand" },
          code: { $first: "$code" },
          views: { $first: "$views" },
          createdAt: { $first: "$createdAt" },
          image: { $first: "$variants.images" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          category: 1,
          brand: 1,
          code: 1,
          views: 1,
          createdAt: 1,
          image: { $arrayElemAt: ["$image", 0] }, // Get the first image from the variants' images array
        },
      },
    ];

    // Add match stage for search if a keyword is provided
    if (keyword) {
      pipeline.unshift({
        $match: {
          $or: [
            { code: { $regex: keyword, $options: "i" } }, // Case insensitive search on codeco
            { name: { $regex: keyword, $options: "i" } }, // Case insensitive search on name
            { description: { $regex: keyword, $options: "i" } }, // Case insensitive search on description
          ],
        },
      });
    }

    const countPipeline = [...pipeline, { $count: "totalCount" }];
    const countResult = await Products.aggregate(countPipeline);
    const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;
    const totalPage = Math.ceil(totalCount / limitNumber);

    // Add sort, skip, and limit stages for pagination
    pipeline.push(
      { $sort: { createdAt: -1 } }, // Sort by createdAt descending
      { $skip: skip }, // Skip documents for pagination
      { $limit: limitNumber } // Limit the number of documents
    );

    const products = await Products.aggregate(pipeline);

    await Products.populate(products, { path: "category brand" });

    return res.status(200).json({ status: true, products, totalPage });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Product id is required" });
    }
    const product = await Products.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    return res.status(200).json({ status: true, product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Product id is required" });
    }

    const { code, name, category, brand } = req.body;

    if (!code || !name || !category || !brand) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const product = await Products.findByIdAndUpdate(
      {
        _id: id,
      },
      { ...req.body, category: req.body.category.split(",") },
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Product updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const softDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Product id is required" });
    }

    const existingProduct = await Products.findById(id);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    const product = await Products.delete({ _id: id });

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const softDeleteProducts = async (req, res) => {
  try {
    const ids = req.body;

    if (ids.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Product ids is required" });
    }

    const deletedProducts = await Products.delete({ _id: { $in: ids } });

    if (deletedProducts) {
      return res
        .status(200)
        .json({ status: true, message: "Product deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to delete Product" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const countProduct = async (req, res) => {
  try {
    const count = await Products.countDocumentsWithDeleted();
    return res.status(200).json(count);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "Product slug is required" });
    }

    const product = await Products.findOne({ slug: slug });

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    const variants = await Variants.find({ product_id: product._id }).populate({ path: 'color size', select: 'colorName sizeName', }).populate({ path: 'product_id', populate: { path: 'category' } }).sort({
      sale: -1,
    });

    if (!variants || variants.length === 0) {
      return res
        .status(404)
        .json({ message: "No variants found for this product" });
    }

    const defaultVariant = variants[0];

    return res.json({ variants, defaultVariant });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  softDeleteProducts,
  softDeleteProduct,
  countProduct,
  getProductBySlug,
};
