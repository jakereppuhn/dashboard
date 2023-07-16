module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define('Category', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hex: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	Category.associate = (models) => {
		Category.belongsTo(models.User, {
			foreignKey: 'userId',
			as: 'user',
		});

		Category.hasMany(models.Product, {
			foreignKey: 'categoryId',
			as: 'products',
		});
	};

	return Category;
};
