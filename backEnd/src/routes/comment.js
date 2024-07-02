const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

router.post("/:id/create", commentController.createComment);
// router.get("/:id/detail", commentController.detail);
// router.put("/:id/update", commentController.update);
router.get("/:id/getcomments", commentController.getComments);
router.delete("/:id/delete", commentController.deleteComment);


module.exports = router;
