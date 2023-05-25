const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const result = await category.save();

    res.status(200).json({
      status: "success",
      message: "ওয়াও ! আপনার ক্যাটেগরি টি আমাদের ডাটাবেজে এড হয়ে গেছে",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "দুঃখিত আপনি কোথাও মনে হয় ভুল করেছেন",
      error: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const CategoryTotalCount = await Category.countDocuments({});
    const page = parseInt(req.query?.page);
    const size = parseInt(req.query?.size);

    if (page || size) {
      const categories = await Category.find({})
        .skip(page * size)
        .limit(size);

      res.status(200).json({
        status: "success",
        message: "data get Success",
        data: {
          categories,
          CategoryTotalCount: CategoryTotalCount,
        },
      });
    } else {
      const categories = await Category.find({});
      res.status(200).json({
        status: "success",
        message: "data get Success",
        data: categories,
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

exports.getCategoryDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const categoryProduct = await Category.findById(id).populate("products");

    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: categoryProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "দুঃখিত কোন ডাটা খুঁজে পাওয়া যায়নি",
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Category.updateOne(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "ধন্যবাদ, আপনার ক্যাটেগরি আপডেট হয়ে গেছে",
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
