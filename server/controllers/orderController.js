const asyncHandler = require('express-async-handler');
const { Order } = require('../models');
const { Product } = require('../models');
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

	const newOrder = await Order.create({
		id: orderId,
		userId: userId,
		productId: productId,
		quantity,
		unitPrice,
		date: new Date(date),
		type: 'purchase',
	});

	const inventoryBatch = await InventoryBatch.create({
		id: snowflake.generate(),
		orderId: orderId,
		remainingQuantity: quantity,
		costPerUnit: unitPrice,
	});

	// You can add further logic here like updating product stocks etc.

	res.json({
		order: newOrder,
		inventoryBatch: inventoryBatch,
	});
});

const createSaleOrder = asyncHandler(async (req, res) => {
	const { quantity, unitPrice, date } = req.body;
	const productId = req.params.productId;
	const userId = req.user.id;

	const orderId = snowflake.generate();

	const newOrder = await Order.create({
		id: orderId,
		userId: userId,
		productId: productId,
		quantity,
		unitPrice,
		date: new Date(date),
		type: 'sale',
	});

	const inventoryBatch = await InventoryBatch.findOne({
		where: { remainingQuantity: { [Op.gt]: 0 } },
		order: [['costPerUnit', 'ASC']],
	});

	if (inventoryBatch && inventoryBatch.remainingQuantity >= quantity) {
		await inventoryBatch.update({
			remainingQuantity: Sequelize.literal(`remainingQuantity - ${quantity}`),
		});
	} else {
		// Handle scenario where there's not enough quantity in any batch
	}

	// You can add further logic here like updating product stocks etc.

	res.json({
		order: newOrder,
		inventoryBatch: inventoryBatch,
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
