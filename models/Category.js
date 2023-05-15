const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    name: {
      type: String,
      required: [true, "Please Provide Category Name"],
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
