module.exports = (sequelize, DataTypes) => {
	const Purchase = sequelize.define('Purchase', {
		purchaseId: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		productId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		quantityRemaining: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		purchaseDate: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
		pricePerUnit: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
			allowNull: false,
		},
		totalCost: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		shippingCost: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
			allowNull: false,
		},
		taxAmount: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
			allowNull: false,
		},
		otherFees: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
			allowNull: false,
		},
		totalPurchaseCost: {
			type: DataTypes.DECIMAL(10, 2),
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
