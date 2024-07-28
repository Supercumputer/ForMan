const express = require("express");
const router = express.Router();

const discountController = require("../controllers/discountController");

router.post("/create", discountController.create);
router.get("/getall", discountController.getAll);
router.get("/:code/getdiscountbycode", discountController.getDiscountByCode);
router.get("/:id/detail", discountController.getDiscount);
router.put("/:id/update", discountController.updateDiscount);
router.delete("/:id/delete", discountController.deleteDiscount);
router.post("/deletes", discountController.deleteDiscounts);
router.put("/:code/updatebycode", discountController.updateDiscountByCode);

module.exports = router;
