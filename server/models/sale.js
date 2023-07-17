module.exports = (sequelize, DataTypes) => {
	const Sale = sequelize.define('Sale', {
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
		salePrice: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		saleDate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		inventoryBatchId: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
	});

	Sale.associate = (models) => {
		Sale.belongsTo(models.Product, {
			foreignKey: 'productId',
			as: 'product',
		});
		Sale.belongsTo(models.User, {
			foreignKey: 'userId',
			as: 'user',
		});
	};

	return Sale;
};
