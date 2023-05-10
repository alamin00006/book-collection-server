const mongoose = require("mongoose");
// const {ObjectId} = mongoose.Schema.Types;

const banner = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", banner);
module.exports = Banner;
