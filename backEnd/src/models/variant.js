const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const variant = new Schema(
  {
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    mbt: { type: String, unique: true, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sale: { type: Number, default: 0 },
    images: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);
variant.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Variant", variant);
