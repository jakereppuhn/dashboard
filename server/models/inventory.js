module.exports = (sequelize, DataTypes) => {
	const Inventory = sequelize.define('Inventory', {
		inventoryId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
		},
		productId: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		quantityInStock: {
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
