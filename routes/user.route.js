const express = require("express");
const router = express.Router()
const userController = require('../controllers/user.controller');
const verifyToken = require("../middleware/verifyToken");
router.route('/signup')
.post(userController.createUser)

 router.route('/login')
.post(userController.createLogin)

 router.route('/me')
.get(verifyToken,userController.getMe)
// .get(writerController.getWriters)

// router.route('/:id').patch(productController.updateProduct)

module.exports = router;