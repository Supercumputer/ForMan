const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.post("/create", orderController.createOrder);
router.post("/create_payment_url", orderController.createPaymentUrlVnPay);
router.get("/payment-result", orderController.resultPayment);
router.get("/getallorders", orderController.getAllOrders);
router.put("/:id/updateOrder", orderController.updateOrder);
router.post("/sendemail", orderController.sendEmailToUser);
router.get("/:id/verificationorder", orderController.verificationOrder);
router.get("/:id/getorderbyId", orderController.getOrderById);
router.get("/:id/getorderbyuserid", orderController.getOrderByUserId);
router.get("/:id/getorderdetailbyId", orderController.getOrderDetialById);
router.delete("/:id/deletesoftorder", orderController.deleteSoftOrder);
router.post("/deletesoftorders", orderController.deleteSoftOrders);

module.exports = router