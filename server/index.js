const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');

const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

sequelize
	.sync()
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`Server running in development mode on port ${PORT}..`.yellow.bold
			);
		});
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});
