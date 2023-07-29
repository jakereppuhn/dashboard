const asyncHandler = require('express-async-handler');
const { Order, Inventory, OrderMapping } = require('../models');
var SnowflakeId = require('snowflake-id').default;

// Get All Orders for a User
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.findAll({ where: { userId: req.user.userId } });
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
		where: { orderId: req.params.orderId },
	});

	if (!order) {
		res.status(404);
		throw new Error('Order not found');
	}

	if (order.userId !== req.user.userId.toString()) {
		res.status(401);
		throw new Error('User not authorized');
	}

	res.status(200).json(order);
});

const createPurchaseOrder = asyncHandler(async (req, res) => {
	const { orderQuantity, pricePerUnit, orderDate } = req.body;
	const productId = req.params.productId;
	const userId = req.user.userId;

	var snowflake = new SnowflakeId({
		mid: 42,
		offset: (2019 - 1970) * 31536000 * 1000,
	});

	const purchaseOrder = await Order.create({
		orderId: snowflake.generate(),
		userId: userId,
		productId: productId,
		orderQuantity,
		pricePerUnit,
		orderDate: new Date(orderDate),
		orderType: 'purchase',
	});

	const inventoryItem = await Inventory.findOne({ where: { productId } });

	if (inventoryItem) {
		inventoryItem.quantityInStock += orderQuantity;
		await inventoryItem.save();
	} else {
		await Inventory.create({
			inventoryId: snowflake.generate(),
			productId,
			quantityInStock: orderQuantity,
		});
	}

	res.json(purchaseOrder);
});

const createSaleOrder = asyncHandler(async (req, res) => {
	const { orderQuantity, pricePerUnit, orderDate } = req.body;
	const productId = req.params.productId;
	const userId = req.user.userId;

	const snowflake = new SnowflakeId({
		mid: 42,
		offset: (2019 - 1970) * 31536000 * 1000,
	});

	const purchaseOrders = await Order.findAll({
		where: { productId, orderType: 'purchase' },
		order: ['orderDate'],
	});

	const inventoryItem = await Inventory.findOne({ where: { productId } });

	if (!inventoryItem || inventoryItem.quantityInStock < orderQuantity) {
		res.status(400);
		throw new Error('Not enough stock');
	} else {
		inventoryItem.quantityInStock -= orderQuantity;
		await inventoryItem.save();
	}

	const saleOrder = await Order.create({
		orderId: snowflake.generate(),
		userId: userId,
		productId: productId,
		orderQuantity,
		pricePerUnit,
		orderDate: new Date(orderDate),
		orderType: 'sale',
	});

	let quantityLeft = orderQuantity;

	for (let purchaseOrder of purchaseOrders) {
		if (purchaseOrder.orderQuantity >= quantityLeft) {
			await OrderMapping.create({
				orderMappingId: snowflake.generate(),
				saleOrderId: saleOrder.orderId,
				purchaseOrderId: purchaseOrder.orderId,
				quantityFromPurchase: quantityLeft,
				purchaseCostPerUnit: purchaseOrder.pricePerUnit,
			});
			purchaseOrder.orderQuantity -= quantityLeft;
			await purchaseOrder.save();
			break;
		} else {
			await OrderMapping.create({
				orderMappingId: snowflake.generate(),
				saleOrderId: saleOrder.orderId,
				purchaseOrderId: purchaseOrder.orderId,
				quantityFromPurchase: purchaseOrder.orderQuantity,
				purchaseCostPerUnit: purchaseOrder.pricePerUnit,
			});
			quantityLeft -= purchaseOrder.orderQuantity;
			purchaseOrder.orderQuantity = 0;
			await purchaseOrder.save();
		}
	}

	res.json(saleOrder);
});

const createOrder = asyncHandler(async (req, res) => {
	const { orderType } = req.body;

	switch (orderType) {
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
