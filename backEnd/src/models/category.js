const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category = new Schema(
  {
    categoryName: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    status: {
      type: String,
      enum: ["Hidden", "Presently"],
      default: "Presently",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", category);
