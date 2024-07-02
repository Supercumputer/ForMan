const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },

    sender: {
      sender_name: { type: String, default: "" },
      sender_phone: { type: String, default: "" },
      sender_address: { type: String, default: "" },
      sender_email: { type: String, default: "" },
    },

    receiver: {
      receiver_name: { type: String, default: "" },
      receiver_phone: { type: String, default: "" },
      receiver_address: { type: String, default: "" },
      receiver_email: { type: String, default: "" },
    },

    delivery: { type: String, enum: ["COD", "VNPAY", "MOMO"], default: "COD" },

    status: {
      type: String,
      enum: ["Pending", "Shipping", "Success", "Cancel"],
      default: "Pending",
    },

    status_payment: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },

    payment_details: {
      type: Object,
      default: null,
    },

    total: { type: Number, default: 0 },

    discount: { type: String, default: null },

    total_payment: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", order);
