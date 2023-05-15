const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Schema Design
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "This email already exist!"],
      validate: [validator.isEmail, "provide a valid email"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User", "SuperAdmin"],
      default: "User",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// middleware
userSchema.pre("save", function (next) {
  const password = this.password;
  const hasPassword = bcrypt.hashSync(password);
  this.password = hasPassword;
  next();
});

userSchema.methods.comparePassword = function (password, has) {
  const isValidPassword = bcrypt.compareSync(password, has);
  return isValidPassword;
};
// Model
const User = mongoose.model("User", userSchema);

module.exports = User;
