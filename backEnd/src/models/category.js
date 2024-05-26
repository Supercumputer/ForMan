const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category = new Schema(
  {
    categoryName: { type: String, required: true },
    description: { type: String, default: "" },
    images: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", category);
