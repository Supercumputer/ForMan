const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const user = new Schema(
  {
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String, default: "" },
    birthDay: { type: Date, default: null },
    phone: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    type: { type: String, default: "local" },
    role: { type: Schema.Types.ObjectId, ref: "GroupRole" },
    refreshToken: { type: String, default: null },
    sex: { type: String, enum: ["Male", "Female", "Other"] },
    status: {
      type: String,
      enum: ["InActive", "Active", "Banned"],
      default: "InActive",
    },
  },
  {
    timestamps: true,
  }
);

user.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("User", user);
