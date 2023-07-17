const asyncHandler = require('express-async-handler');
const { Sale } = require('../models');
const { Product } = require('../models');
var SnowflakeId = require('snowflake-id').default;

// Get All Sales
const getSales = asyncHandler(async (req, res) => {
	const sales = await Sale.findAll({ where: { user: req.user.id } });
	res.status(200).json(sales);
});

// Get Sales by Product
const getSalesByProduct = asyncHandler(async (req, res) => {
	const sales = await Sale.findAll({
		where: { productId: req.params.productId },
	});
	res.status(200).json(sales);
});

//Get Single Sale
const getSale = asyncHandler(async (req, res) => {
	const sale = await Sale.findAll({
		where: { id: req.params.id },
		plain: true,
	});

	if (!sale) {
		res.status(404);
		throw new Error('sale not found');
	}

	if (sale.user !== req.user.id.toString()) {
		res.status(401);
		throw new Error('User not authorized');
	}

	res.status(200).json(purchase);
});

// Create Sale
const createSale = asyncHandler(async (req, res) => {
	try {
		const productId = req.params.productId;
		const { quantity, unitPrice, date, fees } = req.body;

		const userId = req.user.id;

		const parsedDate = new Date(date);

		var snowflake = new SnowflakeId({
			mid: 42,
			offset: (2019 - 1970) * 31536000 * 1000,
		});

		const sale = await Sale.create({
			id: snowflake.generate(),
			userId: userId,
			productId: productId,
			quantity,
			unitPrice,
      fees,
			date: parsedDate,
		});

		if (sale) {
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
				id: sale.id,
				userId: sale.userId,
				productId: sale.productId,
				quantity: sale.quantity,
				unitPrice: sale.unitPrice,
				fees: sale.fees,
				date: sale.date,
			});
		} else {
			res.status(400);
			throw new Error('Invalid sale data');
		}
	} catch (error) {
		console.error(error);
		res.status(500);
		throw new Error('Internal server error');
	}
});

// Delete Purchase
const deleteSale = asyncHandler(async (req, res) => {
	const sale = await Sale.findAll({
		where: { id: req.params.id },
		plain: true,
	});

	if (!sale) {
		res.status(400);
		throw new Error('Sale not found');
	}

	if (sale.user !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await sale.destroy();
	res.status(200).json({ message: 'Sale deleted' });
});

module.exports = {
	getSales,
	getSale,
	getSalesByProduct,
	createSale,
	deleteSale,
};
