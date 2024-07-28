const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const slugify = require("slugify");

const product = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Middleware để tự động tạo slug từ name
product.pre("validate", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// update slug
product.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().name) {
    this.getUpdate().slug = slugify(this.getUpdate().name, {
      lower: true,
      strict: true,
    });
  }
  next();
});


product.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Product", product);
