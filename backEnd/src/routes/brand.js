const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brandController");
const uploadCloud = require("../config/cloudinary");

router.get("/getall", brandController.getAllBrand);
router.get("/:id/detail", brandController.getBrand);
router.post("/create", uploadCloud.single("logo"), brandController.createBrand);
router.put("/:id/update", uploadCloud.single("logo"), brandController.updateBrand);
router.delete("/:id/delete", brandController.deleteBrand);
router.post("/deletes", brandController.deleteBrands);

module.exports = router