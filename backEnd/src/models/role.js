const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const role = new Schema(
  {
    name: { type: String, required: true, unique: true, unique: true },
    url: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", role);
