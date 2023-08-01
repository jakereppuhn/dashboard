const asyncHandler = require('express-async-handler');
const { Order, OrderMapping } = require('../models');
const { Op, Sequelize } = require('sequelize');

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
					[Sequelize.fn('count', Sequelize.col('orderId')), 'orderCount'],
				],
				where: whereClause,
				group: [Sequelize.fn('date', Sequelize.col('orderDate'))],
				order: [[Sequelize.fn('date', Sequelize.col('orderDate')), 'ASC']],
				raw: true,
			});

			const cogsData = await Order.sequelize.query(
				`SELECT date(orderDate) AS date, SUM(quantityFromPurchase * purchaseCostPerUnit) AS cogs 
				FROM Orders 
				INNER JOIN OrderMappings ON Orders.orderId = OrderMappings.saleOrderId 
				WHERE Orders.orderType = :type AND Orders.orderDate BETWEEN :startDate AND :endDate 
				GROUP BY date(orderDate)`,
				{
					replacements: {
						type: type,
						startDate: new Date(startDate),
						endDate: new Date(endDate),
					},
					type: Order.sequelize.QueryTypes.SELECT,
				}
			);

			const dataWithCogs = chartData.map((item) => {
				const cogsItem = cogsData.find(
					(cogsItem) => cogsItem.date === item.date
				);
				item.cogs = cogsItem ? cogsItem.cogs : 0;
				item.profit = item.revenue - item.cogs;
				item.margin = item.profit / item.revenue;
				item.avgOrderValue = item.revenue / item.orderCount;
				return item;
			});

			return res.status(200).json(dataWithCogs);
		} catch (error) {
			console.error(error);
			return res
				.status(500)
				.json({ message: 'An error occurred while retrieving order data' });
		}
	}
});

module.exports = { getOrderData };
