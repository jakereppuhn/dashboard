module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		userId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		accountType: {
			type: DataTypes.ENUM,
			values: ['admin', 'trial', 'monthly', 'lifetime'],
			allowNull: false,
			defaultValue: 'trial',
		},
	});

	User.associate = function (models) {
		User.hasMany(models.Product, {
			foreignKey: 'userId',
			as: 'products',
		});
		User.hasMany(models.Order, {
			foreignKey: 'userId',
			as: 'orders',
		});
	};

	return User;
};
