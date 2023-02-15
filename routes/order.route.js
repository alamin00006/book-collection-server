const express = require("express");
const router = express.Router()
const orderController = require('../controllers/order.controller')
router.route('/')
.post(orderController.createOrder)
.get(orderController.getAllOrders)
.get(orderController.getOrders)
// .get(writerController.getWriters)


router.route('/orderDetails/:id').get(orderController.getOrderDetails)
router.route('/:user').get(orderController.getOrders)
router.route('/:id').delete(orderController.deleteOrder)
router.route('/:id').patch( orderController.orderStastusUpdate)

module.exports = router;