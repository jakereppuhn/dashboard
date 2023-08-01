const express = require('express');
const { protect } = require('../middleware/authMiddleware.js');
const {
	getPurchase,
	getPurchases,
	getPurchasesByProduct,
	createPurchase,
	updatePurchase,
	deletePurchase,
} = require('../controllers/purchaseController.js');

const router = express.Router();

router.get('/purchase/:purchaseId', protect, getPurchase);

router.delete('/purchase/:purchaseId', protect, deletePurchase);

router.get('/', protect, getPurchases);

router.put('/purchase/:purchaseId', protect, updatePurchase);

router.post('/product/:productId', protect, createPurchase);

router.get('/product/:productId', protect, getPurchasesByProduct);

module.exports = router;
