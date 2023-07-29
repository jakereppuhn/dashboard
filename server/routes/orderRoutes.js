const express = require('express');
const {
	createOrder,
	deleteOrder,
	getOrders,
	getOrdersByProduct,
	getOrder,
} = require('../controllers/orderController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', protect, getOrders);

router.get('/:productId', protect, getOrdersByProduct);

router.get('/:orderId', protect, getOrder);

router.post('/:productId', protect, createOrder);

router.delete('/:orderId', protect, deleteOrder);

module.exports = router;
