const express = require("express");
const router = express.Router()
const couponController = require('../controllers/coupon.controller')
router.route('/')
.post(couponController.createCoupon)
.get(couponController.getCoupon)

// router.route('/:id').patch(productController.updateProduct)

module.exports = router;