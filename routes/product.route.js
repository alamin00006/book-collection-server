const express = require("express");
const router = express.Router()
const productController = require('../controllers/product.controller')
// const uploader = require('../middleware/uploader');
const productFile = require('../middleware/uploader');
// const pdfUploader = require('../middleware/pdfUploader');
const verifyToken = require("../middleware/verifyToken");
// router.post('/file-upload', uploader.single('image'), productController.fileUpload)

router.route('/')
.get(productController.getProducts)
.post(productFile, productController.createProduct)

router.route('/:id').patch( productController.updateProduct)
router.route('/:id').get(productController.getProductsDetails)
// router.route('/').get(productController.getAllProductsManage)
.delete(productController.deleteProduct)

module.exports = router;