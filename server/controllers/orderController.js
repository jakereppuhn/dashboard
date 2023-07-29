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

// Create Order
const createOrder = asyncHandler(async (req, res) => {
	try {
		const productId = req.params.productId;
		const { quantity, unitPrice, date, fees, type } = req.body;

		const userId = req.user.id;

		const parsedDate = new Date(date);

		var snowflake = new SnowflakeId({
			mid: 42,
			offset: (2019 - 1970) * 31536000 * 1000,
		});

		const order = await Order.create({
			id: snowflake.generate(),
			userId: userId,
			productId: productId,
			quantity,
			purchasePrice: unitPrice,
			orderDate: parsedDate,
			type,
		});

		if (order) {
			const product = await Product.findOne({ where: { id: productId } });
			if (product) {
				const newStock = product.stock - parseInt(quantity);
				const newSold = product.sold + parseInt(quantity);

				await product.update({
					stock: newStock,
					sold: newSold,
				});
			} else {
				res.status(404);
				throw new Error('Product not found');
			}
			res.json({
				id: order.id,
				userId: order.userId,
				productId: order.productId,
				quantity: order.quantity,
				purchasePrice: order.purchasePrice,
				orderDate: order.orderDate,
				type: order.type,
			});
		} else {
			res.status(400);
			throw new Error('Invalid order data');
		}
	} catch (error) {
		console.error(error);
		res.status(500);
		throw new Error('Internal server error');
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
