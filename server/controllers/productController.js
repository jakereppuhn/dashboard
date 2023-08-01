const asyncHandler = require('express-async-handler');
const { Product, Inventory } = require('../models');
var SnowflakeId = require('snowflake-id').default;

const getProductById = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	const product = await Product.findOne({
		where: { productId: productId },
		include: [{ model: Inventory, as: 'inventory', attributes: ['quantity'] }],
	});

	if (product) {
		res.status(200).json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

const getProducts = asyncHandler(async (req, res) => {
	const { archived, limit = 50, page = 1 } = req.query;
	const whereClause = {};

	if (archived) {
		whereClause.isArchived = archived === 'true';
	}

	const offset = (page - 1) * limit;
	const products = await Product.findAll({
		where: whereClause,
		include: [{ model: Inventory, as: 'inventory', attributes: ['quantity'] }],
		limit: parseInt(limit, 10),
		offset: offset,
	});

	return res.status(200).json(products);
});

const createProduct = asyncHandler(async (req, res) => {
	const { name, description, type, attributes } = req.body;

	if (!name) {
		return res.status(400).json({ message: 'Product name is required' });
	}

	if (!type) {
		return res.status(400).json({ message: 'Product type is required' });
	}

	var snowflake = new SnowflakeId({
		mid: 42,
		offset: (2019 - 1970) * 31536000 * 1000,
	});

	const product = await Product.create({
		productId: snowflake.generate(),
		userId: req.user.userId,
		name,
		description,
		type: type,
		attributes: attributes || {},
		isArchived: false,
	});

	return res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const { name, description, type, attributes, isArchived } = req.body;

	const product = await Product.findOne({ where: { productId: productId } });

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	const updatedProduct = await product.update({
		name: name !== undefined ? name : product.name,
		description: description !== undefined ? description : product.description,
		type: type !== undefined ? type : product.type,
		attributes: attributes !== undefined ? attributes : product.attributes,
		isArchived: isArchived !== undefined ? isArchived : product.isArchived,
	});

	res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const product = await Product.findOne({ where: { productId: productId } });

	if (!product) {
		res.status(404).json({ message: 'Product not found' });
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
