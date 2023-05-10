const BookFair = require("../models/BookFair");

exports.createBookFair = async (req, res) => {
  try {
    const bookFair = new BookFair(req.body);
    const result = await bookFair.save();

    res.status(200).json({
      status: "success",
      message: "Book Fair Year Added Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Book Fair year not Added",
      error: error.message,
    });
  }
};

exports.getBookFair = async (req, res) => {
  try {
    const bookFairs = await BookFair.find({});
    res.status(200).json({
      status: "success",
      message: "Book Fair get Success",
      data: bookFairs,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Book Fair not found",
      error: error.message,
    });
  }
};
exports.updateBookFair = async (req, res) => {
  try {
    const { id } = req.params;
 
    const result = await BookFair.updateOne(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "Data updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Book Fair not Year Not Update",
      error: error.message,
    });
  }
};
