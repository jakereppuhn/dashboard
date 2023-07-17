const asyncHandler = require('express-async-handler');
const { Product } = require('../models');
var SnowflakeId = require('snowflake-id').default;

// Get Product
const getProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const product = await Product.findOne({ where: { id: id } });

	if (product) {
		res.status(200).json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// Get All Products
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.findAll({ where: { userId: req.user.id } });
	res.status(200).json(products);
});

// Create Product
const createProduct = asyncHandler(async (req, res) => {
	const {
		name,
		sku,
		description,
		categoryId,
		type,
		attributes,
		initialStock,
		averageCost,
		totalCost,
		totalRevenue,
		totalProfit,
	} = req.body;

	const userId = req.user.id;

	if (!name) {
		res.status(400);
		throw new Error('Please enter product name');
	}

	if (sku) {
		const skuExists = await Product.findOne({ where: { sku: sku } });
		if (skuExists) {
			res.status(400);
			throw new Error('SKU already exists');
		}
	}

	var snowflake = new SnowflakeId({
		mid: 42,
		offset: (2019 - 1970) * 31536000 * 1000,
	});

	const product = await Product.create({
		id: snowflake.generate(),
		name,
		sku,
		description,
		type: type || 'general',
		attributes: attributes || {},
		categoryId: categoryId || null,
		userId,
		initialStock: initialStock || 0,
		currentStock: initialStock || 0,
		averageCost: averageCost || 0,
		totalCost: totalCost || 0,
		totalRevenue: totalRevenue || 0,
		totalProfit: totalProfit || 0,
	});

	if (product) {
		res.json({
			id: product.id,
			userId: product.userId,
			name: product.name,
			sku: product.sku,
			description: product.description,
			type: product.type,
			attributes: product.attributes,
			categoryId: product.categoryId,
			initialStock: product.initialStock,
			currentStock: product.currentStock,
			averageCost: product.averageCost,
			totalCost: product.totalCost,
			totalRevenue: product.totalRevenue,
			totalProfit: product.totalProfit,
		});
	} else {
		res.status(400);
		throw new Error('Invalid product data');
	}
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const {
		name,
		sku,
		description,
		categoryId,
		type,
		attributes,
		initialStock,
		averageCost,
		totalCost,
		totalRevenue,
		totalProfit,
	} = req.body;

	const product = await Product.findOne({ where: { id: id } });

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	if (sku && sku !== product.sku) {
		const skuExists = await Product.findOne({ where: { sku: sku } });
		if (skuExists) {
			res.status(400);
			throw new Error('SKU already exists');
		}
	}

	const updatedProduct = await product.update({
		name: name || product.name,
		sku: sku || product.sku,
		description: description || product.description,
		type: type || product.type,
		attributes: attributes || product.attributes,
		categoryId: categoryId || product.categoryId,
		initialStock: initialStock || product.initialStock,
		currentStock: initialStock || product.currentStock,
		averageCost: averageCost || product.averageCost,
		totalCost: totalCost || product.totalCost,
		totalRevenue: totalRevenue || product.totalRevenue,
		totalProfit: totalProfit || product.totalProfit,
	});

	res.status(200).json(updatedProduct);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const product = await Product.findOne({ where: { id: id } });

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	await product.destroy();
	res.status(200).json({ message: 'Product deleted successfully' });
});

module.exports = {
	getProduct,
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
};
