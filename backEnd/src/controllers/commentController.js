const Comments = require("../models/comment");

const createComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Variant id is required" });
    }

    const { user_id, content, rating } = req.body;

    if (!user_id || !content || !rating) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const latestCommentsDoc = await Comments.findOne({ variant_id: id })
      .sort({ page: -1 })
      .exec();

    if (latestCommentsDoc && latestCommentsDoc.count < 10) {
      latestCommentsDoc.comments.push(req.body);
      latestCommentsDoc.count += 1;
      await latestCommentsDoc.save();
    } else {
      let newPage = latestCommentsDoc ? latestCommentsDoc.page + 1 : 1;

      const newCommentsDoc = new Comments({
        variant_id: id,
        comments: [req.body],
        count: 1,
        page: newPage,
      });
      await newCommentsDoc.save();
    }

    return res
      .status(201)
      .json({ status: true, message: "Comment created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// const getComments = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res
//         .status(400)
//         .json({ status: false, message: "Role id is required" });
//     }

//     const role = await Comments.find({ variant_id: id });

//     return res.status(200).json({ status: true, role });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// const updateComment = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const { route, description } = req.body;

//     if (!id) {
//       return res
//         .status(400)
//         .json({ status: false, message: "Role id is required" });
//     }

//     if (!route || !description) {
//       return res
//         .status(400)
//         .json({ status: false, message: "Please fill in all fields" });
//     }

//     const updatedRole = await Comments.findByIdAndUpdate(
//       {
//         _id: id,
//       },
//       req.body,
//       { new: true }
//     );

//     if (!updatedRole) {
//       return res.status(404).json({ status: false, message: "Role not found" });
//     }

//     res.status(200).json({
//       status: true,
//       message: "Role updated successfully",
//       role: updatedRole,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Comment id is required" });
    }

    const { variant_id, page } = req.query;

    if (!variant_id || !page) {
      return res
        .status(400)
        .json({ status: false, message: "Variant_id and page is required" });
    }

    const comment = await Comments.findOne({ variant_id, page });

    if (!comment) {
      return res
        .status(404)
        .json({ status: false, message: "Comment not found" });
    }

    const newComments = comment.comments.filter(
      (comment) => comment._id.toString() !== id
    );

    comment.comments = newComments;
    comment.count -= 1;
    await comment.save();
    return res
      .status(200)
      .json({ status: true, message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Variant id is required" });
    }

    const comments = await Comments.find({ variant_id: id }).populate({
      path: "comments",
      populate: { path: "user_id", select: "firstName lastName email" },});

    return res.status(200).json({ status: true, comments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  deleteComment,
  getComments,
  // getCommentsByVariantId,
};
