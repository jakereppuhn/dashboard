const jwt = require('jsonwebtoken');
const { User } = require('../models');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];

			//decodes token id
			const decoded = jwt.verify(token, 'ImportantSecret');
			// console.log('Decoded:', decoded);

			// Fetch the user from the database
			req.user = await User.findByPk(decoded.userId);
			// console.log('User:', req.user);

			next();
		} catch (error) {
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

module.exports = { protect };
