const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const order = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },

    sender: {
      name: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
      email: { type: String, default: "" },
    },

    receiver: {
      name: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
      email: { type: String, default: "" },
    },

    delivery: { type: String, enum: ["COD", "VNPAY", "MOMO"], default: "COD" },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Preparing", "Shipping", "Delivered", "Cancelled", "Completed", "Failure"],
      default: "Pending",
    },

    status_payment: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },

    note: { type: String, default: "" },

    discount: { type: String, default: null },

    total_payment: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

order.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Order", order);
