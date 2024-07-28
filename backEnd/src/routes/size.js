const express = require("express");
const router = express.Router();

const sizeController = require("../controllers/sizeController");

router.get("/:id/detail", sizeController.detail);
router.post("/create", sizeController.createsize);
router.put("/:id/update", sizeController.updatesize);
router.get("/getall", sizeController.getAllSizes);

module.exports = router