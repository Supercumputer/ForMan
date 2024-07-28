const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.put("/upsertcart", cartController.upsertCart);
router.put("/deletecart", cartController.deleteCart);
router.put("/updatequantity", cartController.upDateQuantity);
router.put("/mergecart", cartController.mergeCart);
router.put("/checkinventory", cartController.checkInventory);
router.delete("/:id/deleteallbyuserid", cartController.deleteAllCartByUserId);
router.get("/", cartController.getCartByUserId);


module.exports = router;
