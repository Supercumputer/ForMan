const express = require("express");
const router = express.Router();

const uploadCloud = require("../config/cloudinary");
const productController = require("../controllers/productController");

router.post(
  "/create",
  uploadCloud.array("images", 10),
  productController.createProduct
);
router.get("/getall", productController.getAllProducts);
router.get("/getalltrash", productController.getAllProductsTrash);
router.get("/:id/detail", productController.getProduct);
router.put(
  "/:id/update",
  uploadCloud.array("images", 10),
  productController.updateProduct
);

router.delete("/:id/softdelete", productController.softDeleteProduct);
router.post("/softdeletes", productController.softDeleteProducts);
router.get("/count", productController.countProduct);
router.get(
  "/getProductBySlug/:slug/detail",
  productController.getProductBySlug
);

router.put("/:id/restore", productController.restoreProduct);
router.delete("/:id/destroy", productController.destroyProduct);
router.post("/destroys", productController.destroyProducts);

module.exports = router;
