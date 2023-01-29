const express = require("express");
const router = express.Router()
const bookFairController = require('../controllers/bookFair.controller')
router.route('/')
.post(bookFairController.createBookFair)
.get(bookFairController.getBookFair)

// router.route('/:id').patch(productController.updateProduct)

module.exports = router;