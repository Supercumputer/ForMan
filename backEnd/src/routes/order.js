const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.post("/create", orderController.createOrder);
router.post("/create_payment_url", orderController.createPaymentUrlVnPay);
router.get("/payment-result", orderController.resultPayment);
router.get("/getallorders", orderController.getAllOrders);
router.get("/getallorderstrash", orderController.getAllOrdersTrash);
router.put("/:id/updateOrder", orderController.updateOrder);
router.post("/sendemail", orderController.sendEmailToUser);
router.get("/:id/verificationorder", orderController.verificationOrder);
router.get("/:id/getorderbyId", orderController.getOrderById);
router.get("/:id/getorderbyuserid", orderController.getOrderByUserId);
router.get("/:id/getorderdetailbyId", orderController.getOrderDetialById);
router.delete("/:id/deletesoftorder", orderController.deleteSoftOrder);
router.delete("/:id/destroy", orderController.destroyOrder);
router.put("/:id/restore", orderController.restoreOrder);
router.post("/deletesoftorders", orderController.deleteSoftOrders);
router.post("/checkratingorderstatus", orderController.checkRatingOrderStatus);
router.get("/getallordersstatistic", orderController.getAllOrdersStatistic);
router.get("/statisticsRevenuesOrdersByDay", orderController.statisticsRevenuesOrdersByDay);
router.get("/statisticsQuantityOrdersByDay", orderController.statisticsQuantityOrdersByDay);
router.get("/totalPaymentSuccessOrder", orderController.totalPaymentSuccessOrder);
router.get("/countOrder", orderController.countOrder);
router.get("/statisticsBestSeller", orderController.statisticsBestSeller);

module.exports = router