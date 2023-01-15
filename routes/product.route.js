const express = require("express");
const router = express.Router()
const productController = require('../controllers/product.controller')
const uploader = require('../middleware/uploader');

// router.post('/file-upload', uploader.single('image'), productController.fileUpload)

router.route('/')
.get(productController.getProducts)
.post(uploader.single('image'), productController.createProduct)

router.route('/:id').patch(productController.updateProduct)

module.exports = router;