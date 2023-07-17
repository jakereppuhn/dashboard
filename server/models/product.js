module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define('Product', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		sku: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '',
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '',
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'general',
		},
		attributes: {
			type: DataTypes.JSON,
			allowNull: false,
			defaultValue: {},
		},
		isArchived: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		initialStock: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		currentStock: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		totalCost: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			defaultValue: 0,
		},
		totalRevenue: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			defaultValue: 0,
		},
		totalProfit: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			defaultValue: 0,
		},
	});

	Product.associate = (models) => {
		Product.belongsTo(models.User, {
			foreignKey: 'userId',
			as: 'user',
		});
	};

	return Product;
};
