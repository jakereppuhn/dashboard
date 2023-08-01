module.exports = (sequelize, DataTypes) => {
	const Sale = sequelize.define('Sale', {
		saleId: {
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
		platformId: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		saleDate: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
		pricePerUnit: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
			allowNull: false,
		},
		totalRevenue: {
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
		platformFees: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
			allowNull: false,
		},
		otherFees: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
			allowNull: false,
		},
		totalSaleRevenue: {
			type: DataTypes.DECIMAL(10, 2),
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
