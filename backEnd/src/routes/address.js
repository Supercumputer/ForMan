const express = require("express");
const router = express.Router();

const addressController = require("../controllers/addressController");

router.get("/:id/getall", addressController.getAddresses);
router.get("/:id/getdefault", addressController.getAddressDefault);
router.post("/create", addressController.createAddress);
router.put("/:id/update", addressController.updateAddress);
router.put("/:id/updateDefault", addressController.updateDefaultAddress);
router.delete("/:id/delete", addressController.deleteAddress);

module.exports = router;
