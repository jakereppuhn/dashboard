const asyncHandler = require('express-async-handler');
const {
	Sale,
	Purchase,
	Product,
	Inventory,
	OrderDetail,
} = require('../models');
const { Op, Sequelize } = require('sequelize');
var SnowflakeId = require('snowflake-id').default;

const getSale = asyncHandler(async (req, res) => {
	const { saleId } = req.params;

	const sale = await Sale.findOne({
		where: { saleId: saleId },
		include: [{ model: Product, as: 'product', attributes: ['name'] }],
	});

	if (!sale) {
		return res.status(404).json({ message: 'Sale not found' });
	}

	return res.status(200).json(sale);
});

const getSales = asyncHandler(async (req, res) => {
	const { on, from, to, limit = 50, page = 1 } = req.query;
	const whereClause = {};

	if (on && (from || to)) {
		return res.status(400).json({
			message: 'Cannot use "on" with "from" or "to"',
		});
	}

	if (from && to) {
		whereClause.saleDate = {
			[Op.between]: [new Date(from), new Date(to)],
		};
	}

	if (on) {
		whereClause.saleDate = {
			[Op.eq]: new Date(on),
		};
	}

	const offset = (page - 1) * limit;

	const sales = await Sale.findAll({
		where: whereClause,
		include: [{ model: Product, as: 'product', attributes: ['name'] }],
		limit: parseInt(limit, 10),
		offset: offset,
	});

	return res.status(200).json(sales);
});

const getSalesByProduct = asyncHandler(async (req, res) => {
	const { productId } = req.params;

	const sales = await Sale.findAll({
		where: { productId: productId },
	});

	if (sales.length === 0) {
		return res.status(404).json({ message: 'No sales found for this product' });
	}

	return res.status(200).json(sales);
});

const createSale = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const {
		quantity,
		saleDate,
		pricePerUnit,
		shippingCost,
		taxAmount,
		platformFees,
		otherFees,
	} = req.body;

	var snowflake = new SnowflakeId({
		mid: 42,
		offset: (2019 - 1970) * 31536000 * 1000,
	});

	if (quantity <= 0) {
		return res.status(400).json({ message: 'Invalid quantity' });
	}

	const inventoryItem = await Inventory.findOne({
		where: { productId: productId },
	});

	if (!inventoryItem) {
		return res.status(404).json({ message: 'No inventory records' });
	}

	if (inventoryItem.quantity < quantity) {
		return res.status(400).json({ message: 'Not enough inventory' });
	}

	inventoryItem.quantity -= quantity;

	await inventoryItem.save();

	const sale = await Sale.create({
		saleId: snowflake.generate(),
		userId: req.user.userId,
		productId,
		quantity,
		saleDate,
		pricePerUnit,
		totalRevenue: pricePerUnit * quantity,
		shippingCost,
		taxAmount,
		platformFees,
		otherFees,
		totalSaleRevenue:
			pricePerUnit * quantity -
			shippingCost -
			taxAmount -
			platformFees -
			otherFees,
	});

	const purchases = await Purchase.findAll({
		where: { productId: productId },
		quantity: { [Op.gt]: 0 },
		order: [['purchaseDate', 'ASC']],
	});

	let remainingQuantity = quantity;

	for (const purchase of purchases) {
		if (remainingQuantity <= 0) break;

		let quantityTracker = 0;

		if (purchase.quantityRemaining >= remainingQuantity) {
			quantityTracker = remainingQuantity;
			purchase.quantityRemaining -= remainingQuantity;
			remainingQuantity = 0;
		} else {
			quantityTracker = purchase.quantityRemaining;
			remainingQuantity -= purchase.quantityRemaining;
			purchase.quantityRemaining = 0;
		}

		if (quantityTracker > 0) {
			const detailData = {
				orderDetailId: snowflake.generate(),
				purchaseId: purchase.purchaseId,
				saleId: sale.saleId,
				quantity: quantityTracker,
				pricePerUnit: purchase.totalPurchaseCost / purchase.quantity,
				totalCost:
					(purchase.totalPurchaseCost / purchase.quantity) * quantityTracker,
			};

			await OrderDetail.create(detailData);
		}

		await purchase.save();
	}

	if (remainingQuantity > 0) {
		return res
			.status(400)
			.json({ message: 'Not enough inventory in purchases' });
	}

	return res.status(201).json(sale);
});

const updateSale = asyncHandler(async (req, res) => {});

const deleteSale = asyncHandler(async (req, res) => {});

module.exports = {
	getSale,
	getSales,
	getSalesByProduct,
	createSale,
	updateSale,
	deleteSale,
};
