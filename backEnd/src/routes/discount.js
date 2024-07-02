const express = require("express");
const router = express.Router();

const discountController = require("../controllers/discountController");

router.post("/create", discountController.create);
router.get("/getall", discountController.getAll);
router.delete("/:id/delete", discountController.deleteDiscount);
router.get("/:id/detail", discountController.getDiscount);
router.put("/:id/update", discountController.updateDiscount);
router.post("/deletes", discountController.deleteDiscounts);

module.exports = router;
