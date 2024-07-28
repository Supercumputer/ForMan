const express = require("express");
const router = express.Router();

const colorController = require("../controllers/colorController");

router.get("/:id/detail", colorController.detail);
router.post("/create", colorController.createColor);
router.put("/:id/update", colorController.updateColor);
router.get("/getall", colorController.getAllColors);

module.exports = router;
