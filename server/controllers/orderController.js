const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const { InventoryBatch, Order, OrderBatch } = require('../models');
const sequelize = InventoryBatch.sequelize;
var SnowflakeId = require('snowflake-id').default;

// Get All Orders for a User
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.findAll({ where: { userId: req.user.id } });
	res.status(200).json(orders);
});

// Get Orders by Product
const getOrdersByProduct = asyncHandler(async (req, res) => {
	const orders = await Order.findAll({
		where: { productId: req.params.productId },
	});
	res.status(200).json(orders);
});

//Get Single Order
const getOrder = asyncHandler(async (req, res) => {
	const order = await Order.findOne({
		where: { id: req.params.id },
	});

	if (!order) {
		res.status(404);
		throw new Error('Order not found');
	}

	if (order.userId !== req.user.id.toString()) {
		res.status(401);
		throw new Error('User not authorized');
	}

	res.status(200).json(order);
});

const createPurchaseOrder = asyncHandler(async (req, res) => {
	const { quantity, unitPrice, date } = req.body;
	const productId = req.params.productId;
	const userId = req.user.id;

	var snowflake = new SnowflakeId({
		mid: 42,
		offset: (2019 - 1970) * 31536000 * 1000,
	});

	const orderId = snowflake.generate();

	const inventoryBatch = await InventoryBatch.create({
		id: snowflake.generate(),
		productId: productId,
		purchasePrice: unitPrice,
		quantity,
		remainingQuantity: quantity,
		purchaseDate: new Date(date),
	});

	const newOrder = await Order.create({
		id: orderId,
		userId: userId,
		productId: productId,
		quantity,
		unitPrice,
		date: new Date(date),
		type: 'purchase',
	});

	await OrderBatch.create({
		orderId: orderId,
		inventoryBatchId: inventoryBatch.id,
		quantity,
	});

	res.json({
		order: newOrder,
		inventoryBatch: inventoryBatch,
	});
});

const createSaleOrder = asyncHandler(async (req, res) => {
	const { quantity, unitPrice, date } = req.body;
	const productId = req.params.productId;
	const userId = req.user.id;

	var snowflake = new SnowflakeId({
		mid: 42,
		offset: (2019 - 1970) * 31536000 * 1000,
	});

	const orderId = snowflake.generate();

	let totalQuantitySold = 0;

	const inventoryBatches = await InventoryBatch.findAll({
		where: { productId: productId, remainingQuantity: { [Op.gt]: 0 } },
		order: [['purchasePrice', 'ASC']],
	});

	for (let batch of inventoryBatches) {
		if (totalQuantitySold >= quantity) break;
		let quantityForThisBatch;

		if (batch.remainingQuantity + totalQuantitySold <= quantity) {
			quantityForThisBatch = batch.remainingQuantity;
		} else {
			quantityForThisBatch = quantity - totalQuantitySold;
		}

		const transaction = await sequelize.transaction();

		try {
			await batch.update(
				{
					remainingQuantity: Sequelize.literal(
						`remainingQuantity - ${quantityForThisBatch}`
					),
				},
				{ transaction }
			);
			console.log({
				orderId: orderId,
				inventoryBatchId: batch.id,
				quantity: quantityForThisBatch,
			});

			await OrderBatch.create(
				{
					orderId: orderId,
					inventoryBatchId: batch.id,
					quantity: quantityForThisBatch,
				},
				{ transaction }
			);

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}

		totalQuantitySold += quantityForThisBatch;
	}

	if (totalQuantitySold !== quantity) {
		return res.status(400).json({
			message: 'Insufficient quantity available across all batches.',
		});
	}

	const newOrder = await Order.create({
		id: orderId,
		userId: userId,
		productId: productId,
		quantity: quantity,
		unitPrice,
		date: new Date(date),
		type: 'sale',
	});

	res.json({
		order: newOrder,
	});
});

const createOrder = asyncHandler(async (req, res) => {
	const { type } = req.body;

	switch (type) {
		case 'purchase':
			return createPurchaseOrder(req, res);
		case 'sale':
			return createSaleOrder(req, res);
		default:
			res.status(400);
			throw new Error('Invalid order type');
	}
});

// Delete Order
const deleteOrder = asyncHandler(async (req, res) => {
	const order = await Order.findOne({
		where: { id: req.params.id },
	});

	if (!order) {
		res.status(400);
		throw new Error('Order not found');
	}

	if (order.userId !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await order.destroy();
	res.status(200).json({ message: 'Order deleted' });
});

module.exports = {
	getOrders,
	getOrder,
	getOrdersByProduct,
	createOrder,
	deleteOrder,
};
