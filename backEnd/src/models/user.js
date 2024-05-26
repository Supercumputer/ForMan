const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    userName: { type: String, default: "" },
    fullName: { type: String, required: true },
    avatar: { type: String, default: "" },
    birthday: { type: Date, default: null },
    address: { type: Array, required: [] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "GroupRole" },
    sex: { type: String, default: "" },
    status: { type: String, default: "ACTIVE" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);