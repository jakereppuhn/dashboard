const express = require('express');
const { protect } = require('../middleware/authMiddleware.js');
const {
	getSale,
	getSales,
	getSalesByProduct,
	createSale,
	updateSale,
	deleteSale,
} = require('../controllers/saleController.js');

const router = express.Router();

router.get('/sale/:saleId', protect, getSale);

router.delete('/sale/:saleId', protect, deleteSale);

router.get('/', protect, getSales);

router.put('/sale/:saleId', protect, updateSale);

router.post('/product/:productId', protect, createSale);

router.get('/product/:productId', protect, getSalesByProduct);

module.exports = router;
