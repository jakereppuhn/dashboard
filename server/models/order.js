module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define('Order', {
		orderId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
		},
		productId: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		userId: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		orderQuantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		pricePerUnit: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		orderDate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		orderType: {
			type: DataTypes.ENUM,
			values: ['purchase', 'sale'],
			allowNull: false,
		},
	});

	Order.associate = (models) => {
		Order.belongsTo(models.Product, {
			foreignKey: 'productId',
			as: 'product',
		});
		Order.belongsTo(models.User, {
			foreignKey: 'userId',
			as: 'user',
		});
	};

	return Order;
};
