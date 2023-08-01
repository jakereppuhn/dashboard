const asyncHandler = require('express-async-handler');
const { Purchase, Product, Inventory, OrderDetail } = require('../models');
const { Op, Sequelize } = require('sequelize');
var SnowflakeId = require('snowflake-id').default;

const getPurchase = asyncHandler(async (req, res) => {
	const { purchaseId } = req.params;

	if (!req.user) {
		throw new Error('Not authorized, no user found');
	}

	const purchase = await Purchase.findOne({
		where: { purchaseId: purchaseId },
		include: [{ model: Product, as: 'product', attributes: ['name'] }],
	});

	if (!purchase) {
		return res.status(404).json({ message: 'Purchase not found' });
	}

	return res.status(200).json(purchase);
});

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

	const offset = (page - 1) * limit;

	const purchases = await Purchase.findAll({
		where: whereClause,
		include: [{ model: Product, as: 'product', attributes: ['name'] }],
		limit: parseInt(limit, 10),
		offset: offset,
	});

	return res.status(200).json(purchases);
});

const getPurchasesByProduct = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	const purchases = await Purchase.findAll({
		where: { productId: productId },
	});

	if (purchases.length === 0) {
		return res
			.status(404)
			.json({ message: 'No purchases found for this product' });
	}

	return res.status(200).json(purchases);
});

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
		return res.status(401).json({ message: 'Not authorized, no user found' });
	}

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
});

const updatePurchase = asyncHandler(async (req, res) => {
	const { purchaseId } = req.params;

	if (!purchaseId) {
		res.status(400);
		throw new Error('Purchase ID is required');
	}

	const newPurchaseDetails = req.body;

	await Purchase.sequelize.transaction(async (transaction) => {
		const purchase = await Purchase.findOne({
			where: { purchaseId },
			transaction,
		});

		if (!purchase) {
			throw new Error('Purchase not found');
		}

		const inventoryItem = await Inventory.findOne({
			where: { productId: purchase.productId },
			transaction,
		});

		if (!inventoryItem) {
			throw new Error('Inventory item not found');
		}

		const quantityChange = newPurchaseDetails.quantity - purchase.quantity;

		if (inventoryItem.quantity - quantityChange < 0) {
			throw new Error('Not enough stock in inventory');
		}

		inventoryItem.quantity -= quantityChange;
		await inventoryItem.save({ transaction });

		for (const key in newPurchaseDetails) {
			purchase[key] = newPurchaseDetails[key];
		}
		purchase.totalCost =
			newPurchaseDetails.pricePerUnit * newPurchaseDetails.quantity;
		purchase.totalPurchaseCost =
			purchase.totalCost +
			newPurchaseDetails.shippingCost +
			newPurchaseDetails.taxAmount +
			newPurchaseDetails.otherFees;

		await purchase.save({ transaction });

		if (quantityChange !== 0) {
			const orderDetail = await OrderDetail.findOne(
				{ where: { purchaseId } },
				{ transaction }
			);
			if (orderDetail) {
				orderDetail.quantity = newPurchaseDetails.quantity;
				orderDetail.pricePerUnit = newPurchaseDetails.pricePerUnit;
				orderDetail.totalCost =
					newPurchaseDetails.quantity * newPurchaseDetails.pricePerUnit;
				await orderDetail.save({ transaction });
			}
		}
	});

	return res.status(200).json({ message: 'Purchase updated successfully' });
});

const deletePurchase = asyncHandler(async (req, res) => {
	const { purchaseId } = req.params;

	if (!purchaseId) {
		return res.status(400).json({ message: 'Purchase ID is required' });
	}

	const purchase = await Purchase.findOne({ where: { purchaseId } });

	if (!purchase) {
		return res.status(404).json({ message: 'Purchase not found' });
	}

	const orderDetail = await OrderDetail.findOne({ where: { purchaseId } });

	if (orderDetail) {
		return res
			.status(400)
			.json({ message: 'Purchase is associated with an order' });
	}

	await purchase.destroy();
	return res.status(200).json({ message: 'Purchase deleted' });
});

module.exports = {
	getPurchase,
	getPurchases,
	getPurchasesByProduct,
	createPurchase,
	updatePurchase,
	deletePurchase,
};
