const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brand = new Schema(
  {
    brandName: { type: String, required: true },
    description: { type: String, default: "" },
    logo: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    country: { type: String, default: "Việt Nam" }, // Quốc gia của thương hiệu
    website: { type: String, default: "" }, // Địa chỉ website của thương hiệu
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

module.exports = mongoose.model("Brand", brand);
