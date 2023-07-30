const express = require('express');
const {
	createOrder,
	deleteOrder,
	getOrders,
	getOrdersByProduct,
	getOrder,
} = require('../controllers/orderController.js');
const { protect } = require('../middleware/authMiddleware.js');
const { getOrderData } = require('../controllers/dataController.js');

const router = express.Router();

router.get('/data', protect, getOrderData);

router.get('/order/:orderId', protect, getOrder);

router.delete('/order/:orderId', protect, deleteOrder);

router.get('/', protect, getOrders);

router.post('/product/:productId', protect, createOrder);

router.get('/product/:productId', protect, getOrdersByProduct);

module.exports = router;
