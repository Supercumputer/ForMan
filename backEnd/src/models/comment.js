const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, default: "" },
    rating: { type: Number, max: 5, default: 0 },
    reply: { type: String, default: "" },
  },
  { timestamps: true }
);

const comment = new Schema(
  {
    variant_id: { type: Schema.Types.ObjectId, ref: "Variant" },
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
