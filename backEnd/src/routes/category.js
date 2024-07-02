const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const uploadCloud = require("../config/cloudinary");

router.get("/getall", categoryController.getAllCategory);
router.get("/:id/detail", categoryController.getCategory);
router.post("/create", uploadCloud.single("image"), categoryController.createCategory);
router.put("/:id/update", uploadCloud.single("image"), categoryController.updateCategory);
router.delete("/:id/delete", categoryController.deleteCategory);
router.post("/deletes", categoryController.deleteCategorys);

module.exports = router