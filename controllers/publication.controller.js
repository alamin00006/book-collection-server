const Publication = require("../models/Publication");

exports.createPublication = async (req, res) => {
  try {
    const publication = new Publication(req.body);
    const result = await publication.save();

    res.status(200).json({
      status: "success",
      message: "Publication Added Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Publication not Added",
      error: error.message,
    });
  }
};

exports.getPublication = async (req, res) => {
  try {
    const PublicationTotalCount = await Publication.countDocuments({});
    const page = parseInt(req.query?.page);
    const size = parseInt(req.query?.size);

    if (page || size) {
      const publications = await Publication.find({})
        .skip(page * size)
        .limit(size);

      res.status(200).json({
        status: "success",
        message: "data get Success",
        data: {
          publications,
          PublicationTotalCount: PublicationTotalCount,
        },
      });
    } else {
      const publications = await Publication.find({});
      res.status(200).json({
        status: "success",
        message: "data get Success",
        data: publications,
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

exports.getPublicationDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const publicationProduct = await Publication.findById(id).populate(
      "products"
    );

    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: publicationProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not found",
      error: error.message,
    });
  }
};

exports.updatePublication = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Publication.updateOne(
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
