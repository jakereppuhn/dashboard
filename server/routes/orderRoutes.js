const express = require('express');
const {
	createOrder,
	deleteOrder,
	getOrders,
	getOrdersByProduct,
	getOrder,
	getOrderData,
} = require('../controllers/orderController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', protect, getOrders);

router.get('/data', protect, getOrderData);

router.get('/:productId', protect, getOrdersByProduct);

router.post('/:productId', protect, createOrder);

router.delete('/:orderId', protect, deleteOrder);

router.get('/:orderId', protect, getOrder);

module.exports = router;
