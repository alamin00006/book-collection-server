const Writer = require("../models/Writer");

exports.createWriter = async (req, res) => {
  try {
    const writer = new Writer(req.body);
    const result = await writer.save();

    res.status(200).json({
      status: "success",
      message: "Writer Added Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Writer not Added",
      error: error.message,
    });
  }
};

exports.getWriters = async (req, res) => {
  try {
    const WriterTotalCount = await Writer.countDocuments({});
    const page = parseInt(req.query?.page);
    const size = parseInt(req.query?.size);

    if (page || size) {
      const writers = await Writer.find({})
        .skip(page * size)
        .limit(size);

      res.status(200).json({
        status: "success",
        message: "data get Success",
        data: {
          writers,
          WriterTotalCount: WriterTotalCount,
        },
      });
    } else {
      const writers = await Writer.find({});
      res.status(200).json({
        status: "success",
        message: "data get Success",
        data: writers,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "দুঃখিত কোন ডাটা খুঁজে পাওয়া যায়নি",
      error: error.message,
    });
  }
};

exports.getWriterDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const writerProduct = await Writer.findById(id).populate("products");

    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: writerProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not found",
      error: error.message,
    });
  }
};

exports.updateWriter = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Writer.updateOne(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "ধন্যবাদ, আপডেট হয়ে গেছে",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "দুঃখিত ! আপনি কোথাও মনে হয় ভুল করেছেন",
      error: error.message,
    });
  }
};
