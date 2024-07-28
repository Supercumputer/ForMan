const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const size = new Schema(
  {
    sizeName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Size", size);
