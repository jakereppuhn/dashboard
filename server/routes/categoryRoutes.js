const express = require('express');
const {
	createCategory,
	getCategories,
	getCategoriesByUserId,
	getCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/categoryController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

// Get all categories
router.get('/', protect, getCategories);

// Get category by ID
router.get('/:id', protect, getCategory);

// Create new category
router.post('/', protect, createCategory);

// Update category by ID
router.put('/:id', protect, updateCategory);

// Delete category by ID
router.delete('/:id', protect, deleteCategory);

module.exports = router;
