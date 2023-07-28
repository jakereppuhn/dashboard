const asyncHandler = require('express-async-handler');
const { Product } = require('../models');
var SnowflakeId = require('snowflake-id').default;

// Get Product
const getProductById = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	const product = await Product.findOne({
		where: { productId: productId } && { isArchived: false },
	});

	if (product) {
		res.status(200).json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// Get All Products
const getAllProducts = asyncHandler(async (req, res) => {
	const products = await Product.findAll({
		where: { userId: req.user.id } && { isArchived: false },
	});

	res.status(200).json(products);
});

// Create Product
const createProduct = asyncHandler(async (req, res) => {
	const { productName, productType, attributes, isArchived } = req.body;

	const userId = req.user.id;

	if (!productName) {
		res.status(400);
		throw new Error('Product name is required');
	}

	if (!productType) {
		res.status(400);
		throw new Error('Product type is required');
	}

	var snowflake = new SnowflakeId({
		mid: 42,
		offset: (2019 - 1970) * 31536000 * 1000,
	});

	const product = await Product.create({
		productId: snowflake.generate(),
		userId,
		productName,
		productType: productType || 'general',
		attributes: attributes || {},
		isArchived: isArchived || false,
	});

	if (product) {
		res.json({
			productId: product.productId,
			userId: product.userId,
			productName: product.productName,
			productType: product.productType,
			attributes: product.attributes,
			isArchived: product.isArchived,
		});
	} else {
		res.status(400);
		throw new Error('Invalid product data');
	}
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const { productName, productType, attributes, isArchived } = req.body;

	const product = await Product.findOne({ where: { productId: productId } });

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	const updatedProduct = await product.update({
		productName: productName !== undefined ? productName : product.productName,
		productType: productType !== undefined ? productType : product.productType,
		attributes: attributes !== undefined ? attributes : product.attributes,
		isArchived: isArchived !== undefined ? isArchived : product.isArchived,
	});

	res.status(200).json(updatedProduct);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const product = await Product.findOne({ where: { productId: productId } });

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	await product.destroy();
	res.status(200).json({ message: 'Product deleted successfully' });
});

module.exports = {
	getProductById,
	getAllProducts,
	createProduct,
	updateProduct,
	deleteProduct,
};
