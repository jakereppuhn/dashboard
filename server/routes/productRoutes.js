const express = require('express');
const {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
} = require('../controllers/productController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', protect, getProducts);
router.get('/:productId', protect, getProduct);
router.post('/', protect, createProduct);
router.put('/:productId', protect, updateProduct);
router.delete('/:productId');

module.exports = router;
