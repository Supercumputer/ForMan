const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cart = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    variant_id: { type: Schema.Types.ObjectId, ref: "Variant" },
    quantity: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cart);
