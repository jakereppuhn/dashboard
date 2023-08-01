const express = require('express');
const {
	getProduct,
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/productController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', protect, getProducts);

router.get('/:productId', protect, getProduct);

router.post('/', protect, createProduct);

router.put('/:productId', protect, updateProduct);

router.delete('/:productId', protect, deleteProduct);

module.exports = router;
