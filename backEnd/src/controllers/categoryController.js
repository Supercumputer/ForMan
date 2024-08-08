const Categories = require("../models/category");

const getAllCategory = async (req, res) => {
  try {
    const categories = await Categories.find({}).populate("parentId");

    res.status(200).json({ status: true, categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getCategorys = async (req, res) => {
  try {
    // Tìm tất cả các danh mục và populate trường parentId
    const categories = await Categories.find({ status: "Presently" }).exec();

    // Tạo một đối tượng để dễ dàng truy cập các danh mục con
    const categoryMap = {};

    categories.forEach((category) => {
      categoryMap[category._id] = category.toObject(); // Chuyển đổi sang đối tượng thuần
      categoryMap[category._id].children = []; // Khởi tạo mảng danh mục con
    });

    // Xây dựng cấu trúc cây
    const tree = [];

    categories.forEach((category) => {
      if (category.parentId) {
        // Nếu có parentId, thêm vào danh mục con của parentId nếu tồn tại
        if (categoryMap[category.parentId._id]) {
          categoryMap[category.parentId._id].children.push(
            categoryMap[category._id]
          );
        }
      } else {
        // Nếu không có parentId, thêm vào danh sách root
        tree.push(categoryMap[category._id]);
      }
    });

    return res.status(200).json({ status: true, categories: tree });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Category id is required" });
    }

    const category = await Categories.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ status: false, message: "Category not found" });
    }

    res.status(200).json({ status: true, category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    const image = req.file?.path || "";

    if (!categoryName) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    let parentId = req.body.parentId || null;

    const existingCategory = await Categories.findOne({ categoryName });

    if (existingCategory) {
      return res
        .status(400)
        .json({ status: false, message: "Category already exists" });
    }

    const category = new Categories({ ...req.body, parentId, image });

    await category.save();

    res
      .status(201)
      .json({ status: true, message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Category id is required" });
    }

    const { categoryName } = req.body;

    if (!categoryName) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const checkCategoryName = await Categories.findOne({ categoryName });

    if (checkCategoryName && checkCategoryName._id.toString() !== id) {
      return res
        .status(400)
        .json({ status: false, message: "Category already exists" });
    }

    const existingCategory = await Categories.findOne({ _id: id });

    if (!existingCategory) {
      return res
        .status(404)
        .json({ status: false, message: "Category not found" });
    }

    let parentId = req.body.parentId || null;

    const updatedCategory = await Categories.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
        parentId,
        image: req.file?.path || existingCategory.image,
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ status: false, message: "Category not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Category updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Category id is required" });
    }

    const deletedCategory = await Categories.findByIdAndDelete(id);
    console.log(deletedCategory);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ status: false, message: "Category not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCategorys = async (req, res) => {
  try {
    const ids = req.body;

    if (ids.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Category ids is required" });
    }

    const deletedCategorys = await Categories.deleteMany({ _id: { $in: ids } });

    if (deletedCategorys) {
      return res
        .status(200)
        .json({ status: true, message: "Category deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to delete Category" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategorys,
  getCategorys,
};
