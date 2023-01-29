const express = require("express");
const router = express.Router()
const writerController = require('../controllers/writer.controller')
router.route('/')
.post(writerController.createWriter)
.get(writerController.getWriters)

// router.route('/:id').patch(productController.updateProduct)

module.exports = router;