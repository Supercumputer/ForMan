const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");

router.get("/:id/detail", roleController.detail);
router.post("/create", roleController.createRole);
router.put("/:id/update", roleController.updateRole);
router.get("/getall", roleController.getAllRoles);

module.exports = router