module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define('Order', {
		id: {
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
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		purchasePrice: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		orderDate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		inventoryBatchId: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		type: {
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
