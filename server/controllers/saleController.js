const asyncHandler = require('express-async-handler');
const { Sale, Product, Inventory, OrderDetail } = require('../models');
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

	console.log(req.body);

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
			pricePerUnit * quantity +
			shippingCost +
			taxAmount +
			platformFees +
			otherFees,
	});

	const inventoryItem = await Inventory.findOne({
		where: { productId: productId },
	});

	if (!inventoryItem) {
		return res.status(404).json({ message: 'Inventory item not found' });
	}

	if (inventoryItem.quantity < quantity) {
		return res.status(400).json({ message: 'Not enough inventory' });
	}

	inventoryItem.quantity -= quantity;

	await inventoryItem.save();

	const orderDetail = await OrderDetail.findOne({
		where: { productId: productId },
	});

	if (!orderDetail) {
		return res.status(404).json({ message: 'Order detail not found' });
	}

	orderDetail.quantity -= quantity;

	await orderDetail.save();

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
