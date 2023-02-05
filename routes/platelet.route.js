const express = require("express");
const router = express.Router()
const plateletController = require('../controllers/platelet.controller')

router.route('/')
// .get(productController.getProducts)
.post(plateletController.createPlatelet)

// router.route('/:id').put( productController.updateProduct)
// router.route('/:id').get(productController.getProductsDetails)
// .delete(productController.deleteProduct)

module.exports = router;