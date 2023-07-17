const express = require('express');
const {
	createSale,
	deleteSale,
	getSales,
	getSalesByProduct,
	getSale,
} = require('../controllers/saleController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', protect, getSales);

router.get('/:productId', protect, getSalesByProduct);

router.get('/:id', protect, getSale);

router.post('/:productId', protect, createSale);

router.delete('/:id', protect, deleteSale);

module.exports = router;
