const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");

router
  .route("/")
  .get(reviewController.getReviews)
  .post(reviewController.createReview);
router.route("/:id").patch(reviewController.reviewStastusUpdate);
router.route("/:id").delete(reviewController.deleteReview);

module.exports = router;
