const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner.controller");
const bannerfile = require("../middleware/bannerUploader");

router
  .route("/")
  .post(bannerfile, bannerController.createBanner)
  .get(bannerController.getBanner);

router.route("/:id").delete(bannerController.deleteBanner);

module.exports = router;
