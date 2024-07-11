const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

mongoose.plugin(slug);

const category = new Schema(
  {
    categoryName: { type: String, required: true },
    slug: { type: String, slug: "categoryName" },
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
