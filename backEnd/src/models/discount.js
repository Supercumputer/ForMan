const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discount = new Schema(
  {
    code: { type: String, required: true, unique: true },
    description: {
      type: String,
      default: "",
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validTo: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Expired", "Used"],
      default: "Active",
    },
    usedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User", // Tham chiếu tới model User
        },
      ],
      default: [], // Mặc định là một mảng rỗng
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Discount", discount);
