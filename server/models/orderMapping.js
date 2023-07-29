module.exports = (sequelize, DataTypes) => {
	const OrderMapping = sequelize.define('OrderMapping', {
		orderMappingId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
		},
		saleOrderId: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		purchaseOrderId: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		quantityFromPurchase: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		purchaseCostPerUnit: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
	});

	OrderMapping.associate = (models) => {
		OrderMapping.belongsTo(models.Order, {
			foreignKey: 'saleOrderId',
			as: 'saleOrder',
		});
		OrderMapping.belongsTo(models.Order, {
			foreignKey: 'purchaseOrderId',
			as: 'purchaseOrder',
		});
	};

	return OrderMapping;
};
