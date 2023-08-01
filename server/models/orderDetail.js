module.exports = (sequelize, DataTypes) => {
	const OrderDetail = sequelize.define('OrderDetail', {
		orderDetailId: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		purchaseId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		saleId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		pricePerUnit: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		totalCost: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
	});

	OrderDetail.associate = (models) => {
		OrderDetail.belongsTo(models.Sale, {
			foreignKey: 'saleId',
			as: 'sale',
		});
		OrderDetail.belongsTo(models.Purchase, {
			foreignKey: 'purchaseId',
			as: 'purchase',
		});
	};

	return OrderDetail;
};
