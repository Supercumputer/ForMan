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

    const products = await Variants.find({ product_id: id })
      .populate({ path: "color", select: "colorName" })
      .populate({ path: "size", select: "sizeName" });

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
const getRatingByStar = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, star, limit = 10 } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Variant id is required" });
    }

    const listRatings = await Comments.find({ variant_id: id }).populate({
      path: "comments",
      populate: {
        path: "user_id",
        select: "firstName lastName email avatar",
      },
    });

    // Lấy tất cả bình luận trong ratings
    const newArr = listRatings.flatMap((item) => item.comments);

    const listByStar = newArr.filter((item) => item.rating == star);

    const totalRecords = listByStar.length;
    const totalPages = Math.ceil(totalRecords / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRatings = listByStar.slice(startIndex, endIndex);

    return res.status(200).json({
      status: true,
      comments: paginatedRatings,
      totalPages,
    });
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

    const [rating, totalPages] = await Promise.all([
      Comments.findOne({ $and: [{ variant_id: id }, { page }] }).populate({
        path: "comments",
        populate: {
          path: "user_id",
          select: "firstName lastName email avatar",
        },
      }),
      Comments.countDocuments({ variant_id: id }),
    ]);

    return res.status(200).json({
      status: true,
      comments: rating,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getAverageRating = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Variant id is required" });
    }

    const listRatings = await Comments.find({ variant_id: id });

    // Lấy tất cả bình luận trong ratings
    const newArr = listRatings.flatMap((item) => item.comments);

    // Tính tổng và trung bình đánh giá
    const totalRating = newArr.reduce((acc, item) => acc + item.rating, 0);

    const averageRatings = totalRating
      ? (totalRating / newArr.length).toFixed(1)
      : 0;

    // Tính số lượng và phần trăm cho từng loại sao
    const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    newArr.forEach((item) => {
      if (ratingCount[item.rating] !== undefined) {
        ratingCount[item.rating]++;
      }
    });

    const totalReviews = newArr.length;

    const percentageRatings = Object.keys(ratingCount).map((star) => {
      const percentage =
        totalReviews > 0 ? (ratingCount[star] / totalReviews) * 100 : 0;
      return { star, percentage: percentage.toFixed() + "%" };
    });

    return res.status(200).json({
      status: true,
      totalReviews,
      averageRatings,
      percentageRatings,
    });
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
const updateQuantityAfterOrder = async (req, res) => {
  try {
    const carts = req.body
   
    if (!carts) {
      return res
        .status(400)
        .json({ status: false, message: "Cart is required" });
    }

    await Promise.all(carts.map(async (cart) => {
      const variant = await Variants.findById(cart.variant_id._id)

      variant.quantity -= cart.quantity

      await variant.save()
    }))

    return res.status(200).json({ status: true, message: "Quantity updated successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const getVariantById = async (id, filters) => {
  try {
    const variants = await Variants.find({ product_id: id })
      .populate({ path: "product_id", populate: { path: "category brand" } })
      .populate("color size")
      .lean(); // Sử dụng lean để tăng tốc độ

    // Lọc theo tiêu chí
    const filteredVariants = variants.filter((variant) => {
      const matchesColor =
        !filters.color || filters.color.includes(variant.color._id.toString());

      const matchesSize =
        !filters.size || filters.size.includes(variant.size._id.toString());

      const matchesCategorySlug =
        !filters.categorySlug ||
        variant.product_id.category.some((category) =>
          filters.categorySlug.includes(category.slug)
        );


      const matchesOnSale = !filters.onSale || variant.sale > 0;

      const matchesName =
        !filters.name ||
        new RegExp(filters.name, "i").test(variant.product_id.name);

      const matchesPrice =
        !filters.minPrice ||
        !filters.maxPrice ||
        (filters.minPrice <= variant.price &&
          variant.price <= filters.maxPrice);

      return (
        matchesColor &&
        matchesCategorySlug &&
        matchesSize &&
        matchesOnSale &&
        matchesName &&
        matchesPrice
      );
    });

    // Sắp xếp theo sale và quantity
    filteredVariants.sort((a, b) => {
      if (b.sale !== a.sale) {
        return b.sale - a.sale; // Sắp xếp theo sale giảm dần
      }
      return b.quantity - a.quantity; // Nếu sale bằng nhau, sắp xếp theo quantity giảm dần
    });

    // Trả về variant đầu tiên trong danh sách đã sắp xếp hoặc null nếu không có
    return filteredVariants[0] || null;
  } catch (error) {
    throw new Error(error.message); // Ném lỗi lên cho hàm gọi
  }
};
const getAllProductVariant = async (req, res) => {
  try {
    const {
      category,
      onSale,
      size,
      color,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 10,
      search,
    } = req.query;

    const filters = {};

    if (color) {
      filters.color = color.split(","); // Chuyển đổi từ chuỗi thành mảng ObjectId
    }
    if (size) {
      filters.size = size.split(","); // Chuyển đổi từ chuỗi thành mảng ObjectId
    }

    if (category) {
      filters.categorySlug = category.split(",");
    }

    if (onSale) {
      filters.onSale = sale; // Lọc variant có sale lớn hơn 0
    }

    if (search) {
      filters.name = search; // Tìm kiếm không phân biệt chữ hoa chữ thường
    }

    if (minPrice && maxPrice) {
      filters.minPrice = minPrice;
      filters.maxPrice = maxPrice;
    }

    const dataProduct = await Products.find({});

    const listPro = await Promise.all(
      dataProduct.map(async (product) => {
        return await getVariantById(product._id, filters);
      })
    );

    // Lọc null ra khỏi danh sách
    const filteredListPro = listPro.filter((vari) => vari !== null);

    // Sắp xếp theo tên hoặc ngày tạo nếu cần thiết
    if (sort === "nameAsc") {
      filteredListPro.sort((a, b) =>
        a.product_id.name.localeCompare(b.product_id.name)
      );
    } else if (sort === "nameDesc") {
      filteredListPro.sort((a, b) =>
        b.product_id.name.localeCompare(a.product_id.name)
      );
    } else if (sort === "priceAsc") {
      filteredListPro.sort((a, b) => a.price - b.price);
    } else if (sort === "priceDesc") {
      filteredListPro.sort((a, b) => b.price - a.price);
    } else if (sort === "latest") {
      filteredListPro.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sort === "oldest") {
      filteredListPro.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    // Phân trang
    const totalRecords = filteredListPro.length;
    const totalPages = Math.ceil(totalRecords / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVariants = filteredListPro.slice(startIndex, endIndex);

    return res.status(200).json({
      status: true,
      totalRecords,
      totalPages,
      currentPage: page,
      listProducts: paginatedVariants,
    });
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
  getAllProductVariant,
  getRatingByStar,
  getAverageRating,
  updateQuantityAfterOrder
};
