const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const role = new Schema(
  {
    route: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", role);
