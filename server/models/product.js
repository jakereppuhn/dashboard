module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define('Product', {
		productId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		productName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		productType: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'general',
		},
		productAttributes: {
			type: DataTypes.JSON,
			allowNull: false,
			defaultValue: {},
		},
		isArchived: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
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
