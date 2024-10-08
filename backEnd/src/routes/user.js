const express = require("express");
const router = express.Router();

const uploadCloud = require("../config/cloudinary");
const userController = require("../controllers/userController");

router.get("/getall", userController.paginate);
router.get("/:id/detail", userController.findById);
router.get("/findByEmail", userController.findByEmail);
router.post("/create", uploadCloud.single("avatar"), userController.create);
router.put("/:id/update", uploadCloud.single("avatar"), userController.update);
router.put("/:id/resetpassword", userController.resetPassword);
router.delete("/:id/softdelete", userController.softDeleteUser);
router.post("/softdeletes", userController.softDeleteUsers);
router.post("/sendfeedback", userController.sendFeedback);
router.get("/count", userController.countUser);

module.exports = router;
