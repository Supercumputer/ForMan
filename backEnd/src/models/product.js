const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const product = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
product.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Product", product);

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const mongooseDelete = require("mongoose-delete");

// const product = new Schema(
//   {
//     code: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     description: { type: String, default: "" },
//     category: { type: Schema.Types.ObjectId, ref: "Category" },
//     brand: { type: Schema.Types.ObjectId, ref: "Brand" },
//     variants: [
//       {
//         mbt: { type: String, unique: true },
//         color: String,
//         size: String,
//         price: Number,
//         quantity: Number,
//         sale: { type: Number, default: 0 },
//         images: { type: Array, default: [] }, // URLs to product images
//       },
//     ],
//     views: { type: Number, default: 0 },
//   },
//   {
//     timestamps: true,
//   }
// );
// product.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

// module.exports = mongoose.model("Product", product);

