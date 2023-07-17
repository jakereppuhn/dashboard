const express = require('express');
const {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
} = require('../controllers/productController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

// Get all products
router.get('/', protect, getProducts);

// Get product by ID
router.get('/:id', protect, getProduct);

// Create new product
router.post('/', protect, createProduct);

// Update product by ID
router.put('/:id', protect, updateProduct);

// Delete product by ID
router.delete('/:id');

module.exports = router;
