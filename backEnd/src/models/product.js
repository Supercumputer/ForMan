const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    variants: [
      {
        color: String,
        storage: String,
        price: Number,
        stock: Number,
        quantity: Number,
        sale: Number,
        images: { type: Array, default: [] }, // URLs to product images
      },
    ],
    views: { type: Number, default: 0 },
    specifications: {
      screenSize: String,
      battery: String,
      camera: String,
      processor: String,
      ram: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", product);
