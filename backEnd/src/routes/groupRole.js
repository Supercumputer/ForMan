const express = require("express");
const router = express.Router();

const groupRoleController = require("../controllers/groupRoleController");

router.post("/create", groupRoleController.createGroupRole);
router.get("/:id/detail", groupRoleController.detail);
router.put("/:id/update", groupRoleController.update);
router.get("/getgrouprole", groupRoleController.getGroupRoles);
router.delete("/:id/delete", groupRoleController.deleteGroupRole);


module.exports = router;
