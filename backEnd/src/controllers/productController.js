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
const getAllProductsTrash = async (req, res) => {
  try {
    const { limit = 10, page = 1, name } = req.query
    console.log(req.query);

    const filter = {}

    if (name) {
      filter.name = { $regex: name, $options: "i" }
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const vproducts = await Products.findWithDeleted(filter).populate({ path: "category", select: "categoryName" }).populate({ path: "brand", select: "brandName" })

    let listProductDeleted = vproducts.filter(product => product.deleted === true)

    let totalPages = Math.ceil(listProductDeleted.length / limitNumber)


    let products = listProductDeleted.slice(skip, (skip + limit))

    return res.status(200).json({ status: true, products, totalPages, currentPage: pageNumber })

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, category, brand, createdAt, name } = req.query

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = {}

    if (category) {
      filter.category = { $in: [category] };
    }

    if (brand) {
      filter.brand = brand
    }

    if (createdAt) {
      const inputDate = new Date(createdAt);
      const startDate = inputDate;
      const endDate = new Date(inputDate);
      endDate.setDate(endDate.getDate() + 1); // Tăng 1 ngày

      filter.createdAt = {
        $gte: startDate,
        $lt: endDate
      };
    }


    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const products = await Products.find(filter).populate({ path: "category", select: "categoryName" }).populate({ path: "brand", select: "brandName" }).skip(skip).limit(limitNumber).sort({ createdAt: -1 })

    const totalRecords = await Products.countDocuments({})

    const totalPages = Math.ceil(totalRecords / limitNumber);

    return res.status(200).json({ status: true, products, totalPages, currentPage: pageNumber });

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
const restoreProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Products.restore({ _id: id });

    return res
      .status(200)
      .json({ status: true, message: "Product restored successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const destroyProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Product id is required" });
    }

    const product = await Products.deleteOne({ _id: id });

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    await Variants.deleteMany({ product_id: id });

    return res
      .status(200)
      .json({ status: true, message: "Product deleted successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const destroyProducts = async (req, res) => {
  try {
    const ids = req.body;

    if (ids.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Product ids is required" });
    }

    const deletedProducts = await Products.deleteMany({ _id: { $in: ids } });

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
}
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
  restoreProduct,
  destroyProduct,
  destroyProducts,
  getAllProductsTrash
};
