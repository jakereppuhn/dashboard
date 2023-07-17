module.exports = (sequelize, DataTypes) => {
	const Purchase = sequelize.define('Purchase', {
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
		purchaseDate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		inventoryBatchId: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
	});

	Purchase.associate = (models) => {
		Purchase.belongsTo(models.Product, {
			foreignKey: 'productId',
			as: 'product',
		});
		Purchase.belongsTo(models.User, {
			foreignKey: 'userId',
			as: 'user',
		});
	};

	return Purchase;
};
