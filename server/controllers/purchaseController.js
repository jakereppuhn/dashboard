const asyncHandler = require('express-async-handler');
const { Purchase, Inventory, OrderDetail } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
var SnowflakeId = require('snowflake-id').default;

// Get All Purchases for a User
const getPurchases = asyncHandler(async (req, res) => {
	const { on, from, to, limit, offset } = req.query;
	const whereClause = {};

	if (on && (from || to)) {
		return res.status(400).json({
			message: 'Cannot use "on" with "from" or "to"',
		});
	}

	if (from && to) {
		whereClause.purchaseDate = {
			[Op.between]: [new Date(from), new Date(to)],
		};
	}

	if (on) {
		whereClause.purchaseDate = {
			[Op.eq]: new Date(on),
		};
	}
	try {
		const purchases = await Purchase.findAll({
			where: whereClause,
			include: [{ model: Product, as: 'product', attributes: ['name'] }],
			limit: parseInt(limit),
			offset: offset,
			order: [['createdAt', 'DESC']],
		});
		return res.status(200).json(purchases);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'An error occurred while retrieving purchase data' });
	}
});

// Get Purchases by Product
const getPurchasesByProduct = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	try {
		const purchases = await Purchase.findAll({
			where: { productId: productId },
		});
		res.status(200).json(purchases);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'An error occurred while retrieving purchase data' });
	}
});

//Get Single Purchase
const getPurchase = asyncHandler(async (req, res) => {
	const { purchaseId } = req.params;

	if (!req.user) {
		res.status(401);
		throw new Error('Not authorized, no user found');
	}

	try {
		const purchase = await Purchase.findOne({
			where: { purchaseId: purchaseId },
		});
		res.status(200).json(purchase);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'An error occurred while retrieving purchase data' });
	}
});

// Create Purchase
const createPurchase = asyncHandler(async (req, res) => {
	const {
		quantity,
		purchaseDate,
		pricePerUnit,
		shippingCost,
		taxAmount,
		otherFees,
	} = req.body;
	const productId = req.params.productId;

	if (!req.user) {
		res.status(401);
		throw new Error('Not authorized, no user found');
	}
	const userId = req.user.userId;

	try {
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'An error occurred while submitting purchase data' });
	}
});

// Update Purchase
const updatePurchase = asyncHandler(async (req, res) => {});

// Delete Purchase
const deletePurchase = asyncHandler(async (req, res) => {});

module.exports = {
	getPurchases,
	getPurchasesByProduct,
	getPurchase,
	createPurchase,
	updatePurchase,
	deletePurchase,
};
