module.exports = (sequelize, DataTypes) => {
	const OrderBatch = sequelize.define('OrderBatch', {
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		orderId: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		inventoryBatchId: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	OrderBatch.associate = (models) => {
		OrderBatch.belongsTo(models.Order, {
			foreignKey: 'orderId',
			as: 'order',
		});
		OrderBatch.belongsTo(models.InventoryBatch, {
			foreignKey: 'inventoryBatchId',
			as: 'inventoryBatch',
		});
	};

	return OrderBatch;
};
