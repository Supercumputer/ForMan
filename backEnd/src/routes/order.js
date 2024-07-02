const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.post("/create", orderController.createOrder);
// router.get("/:id/detail", orderController.detail);
// router.put("/:id/update", orderController.updateOrder);
// router.get("/getall", orderController.getAllOrders);

module.exports = router