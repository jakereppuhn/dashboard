const asyncHandler = require('express-async-handler');
const { Product, Order, Inventory, OrderMapping } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
var SnowflakeId = require('snowflake-id').default;

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'mysql',
	logging: console.log,
});

// Get All Orders for a User
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.findAll({
		where: { userId: req.user.userId },
		include: [{ model: Product, as: 'product', attributes: ['productName'] }],
	});
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

// Create Purchase Order
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
		quantityRemaining: orderQuantity,
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

// Create Sale Order
const createSaleOrder = asyncHandler(async (req, res) => {
	let { orderQuantity, pricePerUnit, orderDate } = req.body;
	const productId = req.params.productId;
	const userId = req.user.userId;

	const snowflake = new SnowflakeId({
		mid: 42,
		offset: (2019 - 1970) * 31536000 * 1000,
	});

	const purchaseOrders = await Order.findAll({
		where: {
			productId,
			orderType: 'purchase',
			quantityRemaining: { [Op.gt]: 0 },
		},
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

	const salesOrder = await Order.create({
		orderId: snowflake.generate(),
		userId: userId,
		productId: productId,
		orderQuantity,
		pricePerUnit,
		orderDate: new Date(orderDate),
		orderType: 'sale',
	});

	for (const purchaseOrder of purchaseOrders) {
		let quantityToAssociate;

		if (purchaseOrder.quantityRemaining >= orderQuantity) {
			quantityToAssociate = orderQuantity;
			purchaseOrder.quantityRemaining -= orderQuantity;
			orderQuantity = 0;
		} else {
			quantityToAssociate = purchaseOrder.quantityRemaining;
			orderQuantity -= purchaseOrder.quantityRemaining;
			purchaseOrder.quantityRemaining = 0;
		}

		if (quantityToAssociate > 0) {
			const mappingData = {
				orderMappingId: snowflake.generate(),
				saleOrderId: salesOrder.orderId,
				purchaseOrderId: purchaseOrder.orderId,
				quantityFromPurchase: quantityToAssociate,
				purchaseCostPerUnit: purchaseOrder.pricePerUnit,
			};
			await OrderMapping.create(mappingData);
		}

		await purchaseOrder.save();

		if (orderQuantity === 0) break;
	}

	if (orderQuantity > 0) {
		res.status(400);
		throw new Error('Not enough stock to fulfill the order');
	}

	res.json(salesOrder);
});

// Create Order
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

const getOrderData = asyncHandler(async (req, res) => {
	const { type, startDate, endDate } = req.query;

	if (!type || !startDate || !endDate) {
		return res.status(400).json({
			message: 'Missing required query parameters: type, startDate, endDate',
		});
	} else {
		const whereClause = {
			orderType: type,
			orderDate: {
				[Op.between]: [new Date(startDate), new Date(endDate)],
			},
		};

		const chartData = await Order.findAll({
			// include: [{ model: Product, as: 'product', attributes: ['productName'] }],
			attributes: [
				[Sequelize.fn('date', Sequelize.col('orderDate')), 'date'],
				[Sequelize.fn('sum', Sequelize.col('orderQuantity')), 'totalQuantity'],
			],
			where: whereClause,
			group: [Sequelize.fn('date', Sequelize.col('orderDate'))],
			order: [[Sequelize.fn('date', Sequelize.col('orderDate')), 'ASC']],
			raw: true,
		});

		res.status(200).json(chartData);
	}
});

module.exports = {
	getOrders,
	getOrder,
	getOrdersByProduct,
	getOrderData,
	createOrder,
	deleteOrder,
};
