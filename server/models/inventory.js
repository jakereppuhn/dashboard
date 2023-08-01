module.exports = (sequelize, DataTypes) => {
	const Inventory = sequelize.define('Inventory', {
		inventoryId: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		productId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	Inventory.associate = (models) => {
		Inventory.belongsTo(models.Product, {
			foreignKey: 'productId',
			as: 'product',
		});
	};

	return Inventory;
};
