module.exports = (sequelize, DataTypes) => {
	const InventoryBatch = sequelize.define('InventoryBatch', {
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
		},
		productId: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		purchasePrice: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		remainingQuantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		purchaseDate: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	});

	InventoryBatch.associate = (models) => {
		InventoryBatch.belongsTo(models.Product, {
			foreignKey: 'productId',
			as: 'product',
		});
	};

	return InventoryBatch;
};
