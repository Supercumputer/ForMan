const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, default: "" },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const comment = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    count: { type: Number, max: 10, default: 0 },
    page: Number,
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", comment);
