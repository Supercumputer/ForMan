const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    categoryName: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
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

// Middleware để tự động tạo slug từ categoryName
categorySchema.pre("validate", function (next) {
  if (this.isModified("categoryName")) {
    this.slug = slugify(this.categoryName, { lower: true, strict: true });
  }
  next();
});

categorySchema.pre("findOneAndUpdate", function (next) {
  if (this.getUpdate().categoryName) {
    this.getUpdate().slug = slugify(this.getUpdate().categoryName, {
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
