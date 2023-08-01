const express = require('express');
const { protect } = require('../middleware/authMiddleware.js');
const {
	createPurchase,
	getPurchases,
} = require('../controllers/purchaseController.js');

const router = express.Router();

// router.get('/data', protect, getOrderData);

// router.get('/order/:orderId', protect, getOrder);

// router.delete('/order/:orderId', protect, deleteOrder);

router.get('/', protect, getPurchases);

router.post('/product/:productId', protect, createPurchase);

// router.get('/product/:productId', protect, getOrdersByProduct);

module.exports = router;
