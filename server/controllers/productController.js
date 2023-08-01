const asyncHandler = require('express-async-handler');
const { Product } = require('../models');
var SnowflakeId = require('snowflake-id').default;

// Get Product
const getProductById = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	if (!req.user) {
		res.status(401);
		throw new Error('Not authorized, no user found');
	}

	const product = await Product.findOne({
		where: { productId: productId },
	});

	if (product) {
		res.status(200).json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// Get Products w/ query params
const getProducts = asyncHandler(async (req, res) => {
	const { archived } = req.query;

	let products;

	if (!req.user) {
		res.status(401);
		throw new Error('Not authorized, no user found');
	}

	if (archived) {
		products = await Product.findAll({
			where: { userId: req.user.userId } && { isArchived: archived },
		});
	} else {
		products = await Product.findAll({
			where: { userId: req.user.userId },
		});
	}

	res.status(200).json(products);
});

// Create Product
const createProduct = asyncHandler(async (req, res) => {
	const { name, description, type, attributes } = req.body;

	if (!req.user) {
		res.status(401);
		throw new Error('Not authorized, no user found');
	}
	const userId = req.user.userId;

	if (!name) {
		res.status(400);
		throw new Error('Product name is required');
	}

	if (!type) {
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
		name,
		description,
		type: type || 'general',
		attributes: attributes || {},
		isArchived: isArchived || false,
	});

	if (product) {
		res.json({
			productId: product.productId,
			userId: product.userId,
			name: product.name,
			description: product.description,
			type: product.type,
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
	const { productName, productType, productAttributes, isArchived } = req.body;

	if (!req.user) {
		res.status(401);
		throw new Error('Not authorized, no user found');
	}

	const product = await Product.findOne({ where: { productId: productId } });

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	const updatedProduct = await product.update({
		productName: productName !== undefined ? productName : product.productName,
		productType: productType !== undefined ? productType : product.productType,
		productAttributes:
			productAttributes !== undefined
				? productAttributes
				: product.productAttributes,
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
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
};
