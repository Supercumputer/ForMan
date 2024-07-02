const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItem = new Schema(
  {
    order_Id: { type: Schema.Types.ObjectId, ref: "Order" },
    variant_Id: { type: Schema.Types.ObjectId, ref: "Variant" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sale: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OrderItem", orderItem);
