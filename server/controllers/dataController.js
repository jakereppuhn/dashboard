const asyncHandler = require('express-async-handler');
const { Order, OrderMapping } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

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

		try {
			const chartData = await Order.findAll({
				attributes: [
					[Sequelize.fn('date', Sequelize.col('orderDate')), 'date'],
					[
						Sequelize.fn('sum', Sequelize.col('orderQuantity')),
						'totalQuantity',
					],
					[
						Sequelize.fn(
							'sum',
							Sequelize.literal('orderQuantity * pricePerUnit')
						),
						'revenue',
					],
					[
						Sequelize.literal(`(
								SELECT SUM(quantityFromPurchase * purchaseCostPerUnit) 
								FROM OrderMappings
								WHERE OrderMappings.saleOrderId = Order.orderId
						)`),
						'cogs',
					],
					[
						Sequelize.literal(`(
								SELECT SUM((pricePerUnit * orderQuantity) - (quantityFromPurchase * purchaseCostPerUnit))
								FROM OrderMappings
								WHERE OrderMappings.saleOrderId = Order.orderId
						)`),
						'profit',
					],
					[Sequelize.fn('count', Sequelize.col('orderId')), 'orderCount'],
				],
				where: whereClause,
				group: [Sequelize.fn('date', Sequelize.col('orderDate'))],
				order: [[Sequelize.fn('date', Sequelize.col('orderDate')), 'ASC']],
				raw: true,
			});

			chartData.forEach((data) => {
				data['profit'] = data['revenue'] - data['cogs'];
				data['margin'] = data['profit'] / data['revenue'];
				data['avgOrderValue'] = data['revenue'] / data['orderCount'];
			});

			return res.status(200).json(chartData);
		} catch (error) {
			console.error(error);
			return res
				.status(500)
				.json({ message: 'An error occurred while retrieving order data' });
		}
	}
});

module.exports = { getOrderData };
