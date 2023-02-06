const express = require("express");
const router = express.Router()
const reviewController = require('../controllers/review.controller')

router.route('/')
.get(reviewController.getReviews)
.post(reviewController.createReview)

// router.route('/:id').put( productController.updateProduct)
// router.route('/:id').get(productController.getProductsDetails)
// .delete(productController.deleteProduct)

module.exports = router;