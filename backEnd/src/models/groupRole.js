const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupRole = new Schema(
  {
    nameRole: { type: String, required: true, unique: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: "Role" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GroupRole", groupRole);