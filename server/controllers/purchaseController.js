const asyncHandler = require('express-async-handler');
const { Purchase, Product, Inventory, OrderDetail } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
var SnowflakeId = require('snowflake-id').default;

// Get All Purchases for a User
const getPurchases = asyncHandler(async (req, res) => {
	const { on, from, to, limit = 50, page = 1 } = req.query;
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
		const offset = (page - 1) * limit;

		const purchases = await Purchase.findAll({
			where: whereClause,
			include: [{ model: Product, as: 'product', attributes: ['name'] }],
			limit: parseInt(limit, 10),
			offset: offset,
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
	const { productId } = req.params;
	const {
		quantity,
		purchaseDate,
		pricePerUnit,
		shippingCost,
		taxAmount,
		otherFees,
	} = req.body;

	var snowflake = new SnowflakeId({
		mid: 42,
		offset: (2019 - 1970) * 31536000 * 1000,
	});

	if (!req.user) {
		res.status(401);
		throw new Error('Not authorized, no user found');
	}

	try {
		const purchase = await Purchase.create({
			purchaseId: snowflake.generate(),
			userId: req.user.userId,
			productId: productId,
			quantity: quantity,
			quantityRemaining: quantity,
			purchaseDate: purchaseDate,
			pricePerUnit: pricePerUnit,
			totalCost: pricePerUnit * quantity,
			shippingCost: shippingCost,
			taxAmount: taxAmount,
			otherFees: otherFees,
			totalPurchaseCost:
				pricePerUnit * quantity + shippingCost + taxAmount + otherFees,
		});

		const inventoryItem = await Inventory.findOne({ where: { productId } });

		if (inventoryItem) {
			inventoryItem.quantity += quantity;
			await inventoryItem.save();
		} else {
			await Inventory.create({
				inventoryId: snowflake.generate(),
				productId,
				quantity: quantity,
			});
		}

		return res.status(201).json(purchase);
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
