const asyncHandler = require('express-async-handler');
const { Category } = require('../models');
var SnowflakeId = require('snowflake-id').default;

// Get Category
const getCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const category = await Category.findOne({ where: { id: id } });

	if (category) {
		res.status(200).json(category);
	} else {
		res.status(404);
		throw new Error('Category not found');
	}
});

// Get All Categories
const getCategories = asyncHandler(async (req, res) => {
	const categories = await Category.findAll({ where: { userId: req.user.id } });
	res.status(200).json(categories);
});

// Get All Categories by User ID
const getCategoriesByUserId = asyncHandler(async (req, res) => {
	const userId = req.user.id;
	const categories = await Category.findAll({ where: { userId } });
	res.status(200).json(categories);
});

// Create Category
const createCategory = asyncHandler(async (req, res) => {
	const { name, hex } = req.body;

	const userId = req.user.id;

	if (!name) {
		res.status(400);
		throw new Error('Please enter category name');
	}

	var snowflake = new SnowflakeId({
		mid: 42,
		offset: (2019 - 1970) * 31536000 * 1000,
	});

	const category = await Category.create({
		id: snowflake.generate(),
		name,
		hex,
		userId,
	});

	if (category) {
		res.json({
			id: category.id,
			userId: category.userId,
			name: category.name,
			hex: category.hex,
		});
	} else {
		res.status(400);
		throw new Error('Invalid category data');
	}
});

// Update Category
const updateCategory = asyncHandler(async (req, res) => {});

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {});

module.exports = {
	getCategory,
	getCategories,
	getCategoriesByUserId,
	createCategory,
	updateCategory,
	deleteCategory,
};
