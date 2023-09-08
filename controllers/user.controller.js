require("dotenv").config();
const User = require("../models/User");
const { generateToken } = require("../utilis/token");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { generateUserCode } = require("../utilis/userCode");
const bcrypt = require("bcryptjs");
exports.createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        status: "fail",
        message:
          "দুঃখিত এই ইমেইল দিয়ে অলরেডি আমাদের ডাটাবেজে একটি অ্যাকাউন্ট আছে আপনি দয়া করে অন্য ইমেইল দিয়ে একাউন্ট করুন !",
      });
    }
    const result = await User.create(req.body);

    res.status(200).json({
      status: "success",
      message: "ধন্যবাদ একাউন্ট করার জন্য",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "user not Added",
      error: error.message,
    });
  }
};
exports.createLogin = async (req, res) => {
  //    console.log(req.body)
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: "please provide email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message:
          "দুঃখিত আমরা এই ইমেইল দিয়ে কোন অ্যাকাউন্ট আমাদের ডাটাবেজে খুঁজে পাইনি দয়া করে আপনি একাউন্ট করুন !",
      });
    }

    const isValidPassword = user.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(403).json({
        status: "fail",
        message: "দুঃখিত আপনি ইমেইল অথবা পাসওয়ার্ড ভুল দিয়েছেন",
      });
    }
    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "ধন্যবাদ লগইন হওয়ার জন্য",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "দুঃখিত আমরা আপনার অ্যাকাউন্টটি খুঁজে পাইনি",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const email = req?.user?.email;
    const user = await User.findOne({ email });
    const { password: pwd, ...others } = user?.toObject();
    res.status(200).json({
      status: "success",
      data: others,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Please Log in",
      error: error.message,
    });
  }
};

exports.allUser = async (req, res) => {
  try {
    // const email =  req?.user?.email
    const user = await User.find({});
    //  const {password:pwd2, ...others} = user?.toObject();
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "no user found",
      error: error.message,
    });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message:
          "দুঃখিত আমরা এই ইমেইল দিয়ে কোন অ্যাকাউন্ট আমাদের ডাটাবেজে খুঁজে পাইনি দয়া করে আপনি একাউন্ট করুন !",
      });
    } else {
      const userCode = generateUserCode(user);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "alaminbamna08@gmail.com",
          pass: "qesfajhmrfhkfnbo",
        },
      });

      const mailOptions = {
        from: "alaminbamna08@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `https://book-collection-nine.vercel.app/reset-password/${user._id}/${userCode}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(401).json({
            status: "fail",
            message: " Sorry Something is wrong !",
          });
        } else {
          res.status(200).json({
            status: "Success",
            message: "Please Check Your email!",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "no user found",
      error: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const email = req?.user?.email;

    const hasPassword = bcrypt.hashSync(password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message:
          "দুঃখিত আপনার টোকনের মেয়াদ শেষ! নতুন করে ফরগেট পাসওয়ার্ড এর রিকুয়েস্ট দিন",
      });
    }

    const result = await User.updateOne(
      { email: email },
      {
        $set: {
          password: hasPassword,
        },
      },
      { runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "Wow! Your Password Updated",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "no user found",
      error: error.message,
    });
  }
};
