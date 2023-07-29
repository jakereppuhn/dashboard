const asyncHandler = require('express-async-handler');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
var SnowflakeId = require('snowflake-id').default;

const createUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) {
		res.status(400);
		throw new Error('Please enter all required fields');
	}
	if (password.length < 8) {
		res.status(400);
		throw new Error('Password must be at least 8 characters');
	}

	const emailExists = await User.findOne({ where: { email: email } });

	if (emailExists) {
		res.status(400);
		throw new Error('Email already in use');
	}

	var snowflake = new SnowflakeId({
		mid: 42,
		offset: (2019 - 1970) * 31536000 * 1000,
	});

	const userPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		userId: snowflake.generate(),
		firstName,
		lastName,
		email,
		password: userPassword,
	});

	if (user) {
		const accessToken = sign(
			{
				userId: user.userId,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
			'ImportantSecret'
		);
		res.json({
			token: accessToken,
			userId: user.userId,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			accountType: user.accountType,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error('Missing email or password');
	}

	const user = await User.findOne({ where: { email: email } });
	if (!user) {
		res.json({ error: 'There is no account associated with that email' });
	}

	bcrypt.compare(password, user.password).then((match) => {
		if (!match) {
			res.status(401);
			throw new Error('Incorrect email and password combination');
		}
		const accessToken = sign(
			{
				userId: user.userId,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
			'ImportantSecret'
		);
		res.json({
			token: accessToken,
			userId: user.userId,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			accountType: user.accountType,
		});
	});
});

const updateUser = asyncHandler(async (req, res) => {});

module.exports = { createUser, authUser, updateUser };
