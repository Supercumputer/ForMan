const express = require("express");
const router = express.Router();

const uploadCloud = require("../config/cloudinary");
const variantController = require("../controllers/variantController");

router.get("/:id/getall", variantController.getAllVariantById);
router.get("/:id/detail", variantController.getVariant);

router.post(
  "/:id/createvariant",
  uploadCloud.array("images", 10),
  variantController.createVariant
);

router.put(
  "/:id/updatevariant",
  uploadCloud.array("images", 10),
  variantController.updateVariant
);
router.delete("/:id/softdeletevariant", variantController.deleteVariant);
router.post("/softdeletes", variantController.softDeleteVariants);

router.get("/:id/getratings", variantController.getRatings);
router.get("/:id/getratingbystar", variantController.getRatingByStar);
router.get("/:id/getaveragerating", variantController.getAverageRating);
router.put("/:id/updateReply", variantController.updatereply);
router.get("/getAllProductVariant", variantController.getAllProductVariant);
router.put("/updatequantity", variantController.updateQuantityAfterOrder);


module.exports = router;
