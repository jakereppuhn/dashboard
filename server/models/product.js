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
	});

	Product.associate = (models) => {
		Product.belongsTo(models.User, {
			foreignKey: 'userId',
			as: 'user',
		});
	};

	return Product;
};
