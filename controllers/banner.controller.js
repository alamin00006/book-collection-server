const Banner = require("../models/Banner");

const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "../public/uploads");

exports.createBanner = async (req, res) => {
  try {
    const banner = new Banner({
      image: req.body?.image,
    });
    const result = await banner.save();

    res.status(200).json({
      status: "success",
      message: "Banner inserted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "banner not inserted",
      error: error.message,
    });
  }
};

exports.getBanner = async (req, res) => {
  try {
    const categories = await Banner.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      message: "Category get Success",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "category not found",
      error: error.message,
    });
  }
};

exports.deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    // const imageData = req.body.image[0].split("\\")[2];

    // fs.readdir(dirPath, (err, files) => {
    //   const fileData = files.find((item) => item === imageData);

    //   fs.stat(`./public/uploads/${fileData}`, function (err, stats) {
    //     if (err) {
    //       return;
    //     }

    //     fs.unlink(`./public/uploads/${fileData}`, function (err) {
    //       if (err) return;
    //     });
    //   });
    // });

    const result = await Banner.findByIdAndDelete({ _id: id });

    res.status(200).json({
      status: "success",
      message: "delete Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not Delete",
      error: error.message,
    });
  }
};
